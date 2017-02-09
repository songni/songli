"use strict";
import riot from 'riot';
import route from 'riot-route';
import $ from './util';

/**
 * Riot router version 4.
 * updates v2:
 *  1. change route rule, delete underline when path is param.
 *  2. routes change data structure from map to array. 
 *  3. order of routes definition will become important.
 * update v3:
 *  1. add matches interface for server side rendering.
 * update v4:
 * 	1. define router in central
 *  2. remove all router-mixin expect use method
 */

/**
 * Riot router version 5.
 * updates v5:
 *  1. deal with route mildly. save the hints previously, and then
 *    compare with current hints. no modify with no change. leave
 *    the diff old one, and enter the new come in one.
 */
class Hub {
    constructor(emitter){
        this._root = null;
        this._view = null;
        this._busy = false;
        this._routes = [];
        this._defaultRoute = null;
        this._location = null;
        this._prev = null;
        this.state = {};
        this._title = null;
        this._emitter = emitter;
        this.refinedRoutes = [];
        this.prevHints = [];
        this.currHints = [];
        this.evtListeners = [];
    }

    startup(){
        this._parseRoute();
        route.base('/');
        route(this.doRoute.bind(this));
        Util.nextTick(() => {
            route.start();
            route.exec();
        });
        return this;
    }

    /**
     * @param routes {Array}
     * @param location {String}
     * @returns cb {Function}
     * query, params, components, history
     */
    matches({ routes, location }){
        let req = this.parse(location);
        return this.doRoute(req, routes);
    }

    /**
     * Route parser
     * @param path {String}
     * @return req | null {Object|null}
     */
    parse(path){
        let req = {};
        let [uri, queryString] = path.split('?');
        let prefix = null;
        if (this.location) {
            prefix = Util.compareUrl(this.location, uri);
        }
        let uriParts = (uri === '' || uri === '/') ? ['/'] : uri.split('/');
        req.query = {};
        if (queryString) {
            queryString.split('&').map(i => req.query[i.split('=')[0]] = i.split('=')[1]);
        }

        // if no change, only sync state query
        // if (this.location) {
        //     //check state changed or not
        //     if (this.location === '/' + uri) {
        //         //sync state
        //         this.trigger('sync-state-query', req.query)
        //         return null;
        //     }
        // }

        req.hints = [];
        if (uriParts.length) {
            for (var i=0, len=uriParts.length; i<len; i++) {
                let part = uriParts[i];
                if (i === 0) {
                    req.hints.push(Util.completePart(part));
                } else {
                    if (req.hints.indexOf(part) < 0) {
                        req.hints.push(Util.combineUriParts(uriParts, i, part));
                    }
                }
            }
        }
        return req;
    }

    _parseRoute(){
        route.parser(this.parse.bind(this));
        return this;     
    }

    /**
     * Route to the tag view with current context
     * @param route {Object}
     * @param ctx {Object}
     * @param redirect {Boolean}
     */
    routeTo(route, ctx, redirect = false, index, cb){
        this.busy = false;
        this.trigger('busy-resolve');

        if (redirect) {
            return route(route.path);
        }
        
        if ((!route.tag.opts['show'] && !route.tag.opts['$show']) 
            && Util.completePart(route.path) === this.location) {
            return;
        }

        let $state = route.path;
        let $location = route.location;

        this.trigger('state-change', {$state, $location, ctx});

        if (route.redirectTo) {
            route(route.redirectTo);
            return true;
        }

        let addons = {
            hints: ctx.req.hints,
            req: ctx.req,
            route,
            tag: route.tag,
            $state,
            $location,
            index
        }

        if (route.resolve) {
            return route.resolve.apply(route.tag, [(data) => {this.routeToDone(data, ctx, addons, cb)}, ctx]);
        }

        this.routeToDone(null, ctx, addons, cb);
    }

    /**
     * Match route rule with current uri
     * @param rule {String}
     * @param uri {String}
     * @return lean req {Request|Boolean}
     */
    match(rule, uri){
        let parts = Util.distinct(rule.split('/').map(r => Util.completePart(r)));
        let fragments = Util.distinct(uri.split('/').map(r => Util.completePart(r)));
        
        if(
            !rule || 
            !uri || 
            !parts || 
            !parts.length || 
            !fragments || 
            !fragments.length ||
            fragments.length != parts.length
        ){
            return false;
        }

        let params = {};
        let res = parts.map((part, i) => {
            //param placeholder
            if(part.startsWith('/:')){
                return {key: part.slice(1), index: i}
            }
            if(part === fragments[i]){
                return true;
            }
            return null;
        }).filter(p => p);

        if (res.length != parts.length) {
            return null;
        }

        return res.filter(r => typeof r === 'object').reduce((acc, curr) => {
            acc[curr.key.slice(1)] = fragments[curr.index].slice(1);
            return acc;
        }, {});
    }

    /**
     * Recursive collect route hints
     * @param context {Object}
     * @param node {Object} riot tag
     * @param routes {Object}
     * @param components {Array}
     * @param index {Number}
     */
    recurMatch(ctx, node = {}, routes, components, index = 0){
        let { req } = ctx;
        let { hints } = req;
        let hint = hints[index];
        let target = null; 
        let targetRoutes = routes ? routes : this.routes;

        if (!hint) {
            return { components, ctx };
        }

        for (let i=0, len= targetRoutes.length; i<len; i++) {
            let route = targetRoutes[i];
            let matchRes = this.match(Util.completePart(route.path), Util.completePart(hint));
            if (matchRes) {
                if (!ctx.req.params) {
                    ctx.req.params = {};
                }
                Object.assign(ctx.req.params, matchRes);
                !ctx.req.body && (ctx.req.body = {});
                Object.assign(ctx.req.body, Util.omit(route, "resolve", "redirectTo", "tag", "path", "name") || {});
                route.location = Util.completePart(hint);
                components[index] = {
                    param: { ...matchRes },
                    ctx: Object.assign({}, ctx),
                    route
                };
            }
        }

        return this.recurMatch(ctx, node, routes, components, ++index)
    }

    doRoute(req, routes){
        let me = this;
        if (!req) {
            return;
        }
        let addons = {
            isFounded: false,
            isBreak: false
        }
        this.busy = true;
        this.trigger('busy-pending');
        let context = { req };
        let { ctx, components } = this.recurMatch(context, this.root || {}, this.refinedRoutes, []);
        let lastComponent = components[components.length - 1];
        
        // route to a abstract route, redirect to default route
        if (lastComponent && lastComponent.route.abstract) {
            console.warn(`cannot transition to a abstract state(${lastComponent.route.path})`);
            return this.routeToDefault();
        }

        // set currently state
        this.currHints = components;
        this.recurResolveRoutes(ctx, this.currHints, this.prevHints, [], [], this.loopRouteTo.bind(this));
        // set previously state
        this.prevHints = components;
    }

    routeToDefault(refresh) {
        let defaultUri = this.refinedRoutes.filter(r => r.defaultRoute)[0].path;
        if (refresh) {
            return location.href = location.origin + defaultUri;
        }
        return route(defaultUri)
    }

    leaveTags(leaves, to){
        for (let i=leaves.length-1, len=leaves.length; i>=0; i--) {
            let leave = leaves[i];
            let tag = leave.route.tag;
            if (!to) {
                let toRoute = this.refinedRoutes.filter(r => r.id === leave.route.parent)[0]
                if (toRoute) {
                    to = toRoute.tag;
                }
            }
            tag.trigger('leave', to);
            if (leave.route.cache) {
                if (tag.opts.show || tag.opts.$show) {
                    tag.opts.show = false;
                    tag.opts.hidden = true;
                    if(this.handler){
                        return this.handler('leave', tag);    
                    }
                    tag.update();
                }
            } else {
                tag.unmount(true);
                tag.parent.update();
                delete leave.route['tag'];
            }
        }
    }

    recurEnterTags(enters, index){
        if (!enters || !enters.length) {
            return;
        }
        let enter = enters[0];
        let { route, ctx } = enter;
        let { tag, path, component } = route;
        
        if (!enter) {
            console.info('404');
            recurEnter(enters.slice(1));
        } else {
            this.state.hint = path; 
            let outletPoint = this.refinedRoutes.filter(r => r.id === route.parent)[0];
            let outlet = (outletPoint && outletPoint.tag || this.root).tags['router-outlet'];
            if (!outlet.$isMounted) {
                outlet.one('$mounted', done.bind(this));
            } else {
                done.apply(this)
            }

            function done(){
                if (!tag || !tag.isMounted) {
                    let outletEl = outlet.parent.root.querySelector(`div[data-tag-name="${component.displayName}"]`);
                    if (route.branch) {
                        let Constr = route.component(ctx)
                        console.warn('constructor ...........');
                        console.warn(Constr);
                        tag = new Constr(outletEl, {parent: outlet.parent});
                        if (!Component) {
                            console.warn(`component provider expected a component.`);
                            return this.routeToDefault(true);
                        }
                    } else {
                        tag = new route.component(outletEl, {parent: outlet.parent});
                    }
                    
                    if (tag) {
                        tag.$routePath = path;
                        route.tag = tag;
                        outlet.trigger('childrenChanged')
                    }
                }

                if (tag) {
                    return this.routeTo(route, ctx, false, index, () => {
                        this.recurEnterTags.apply(this, [enters.slice(1), ++index])
                    });
                }
            }
        }
    }

    loopRouteTo(enters, leaves){
        let lastEnter = enters[enters.length - 1];
        let to = null;
        if (lastEnter) {
            to = lastEnter.route.tag;
        }

        if (leaves && leaves.length) {
            this.leaveTags(leaves, to);
        }

        if (!enters || !enters.length) {
            //TODO route to default
            return;
        }

        this.recurEnterTags.apply(this, [enters, 0]);
    }

    /**
     * Compare previously hints and currently ones.
     * @param ctx {Object}
     * @param remainCurrHints {Array}
     * @param remainPrevHints {Array}
     * @param enters {Array}
     * @param leaves {Array}
     * @param callback {Function}
     * @param index {Number}
     */
    recurResolveRoutes(ctx, remainCurrHints, remainPrevHints, enters, leaves, callback, index = 0){
        let currHint = remainCurrHints[0];
        let prevHint = remainPrevHints[0];
        // end of the curr hints ?
        if (!remainCurrHints.length) {
            if (remainPrevHints.length) {
                leaves = leaves.concat(remainPrevHints);
            }
            return callback(enters, leaves);
        }
        if (!remainPrevHints.length) {
            // enters only
            enters = enters.concat(remainCurrHints);
            return this.recurResolveRoutes(ctx, [], [], enters, leaves, callback, ++index)
        } else {
            // compare
            // diff ?
            if (
                currHint.route.path != prevHint.route.path ||
                !Util.isEqual(currHint.param, prevHint.param)
            ) {
                enters.push(currHint);
                leaves = leaves.concat(remainPrevHints);
                return this.recurResolveRoutes(ctx, remainCurrHints.slice(1), [], enters, leaves, callback, ++index)
            }
            return this.recurResolveRoutes(ctx, remainCurrHints.slice(1), remainPrevHints.slice(1), enters, leaves, callback, ++index)
        }
    }

    /**
     * Route done callback trigger a history-pending event
     * @param data {Any}
     * @param ctx {Object}
     * @param addons {Object}
     * @param cb {Function}
     */
    routeToDone(data, ctx, {hints, req, route, tag, $state, $location, index}, cb){
        let me = this;
        if (ctx && data) {
            !ctx.body && (ctx.body = {});
            Object.assign(ctx.body, data);
        }

        let callbackInvokeCount = 0;
        let callback = () => {
            callbackInvokeCount++;
            let listeners = 
                this.evtListeners
                    .filter(({evt, fn}) => {
                        if (evt === 'history-pending') {
                            return fn.toString()
                                .match(/\(.*?\)/)[0]
                                .replace('(', '').replace(')', '')
                                .split(',')
                                .filter(p => p === 'next').length === 1;
                        }
                    })
            let concernsCount = listeners.length;
            if (concernsCount === callbackInvokeCount) {
                done();
            }
        }

        let done = () => {
            me.executeMiddlewares(
                tag, 
                tag.$mws,
                ctx, 
                () => {
                    me.routeSuccess(data, ctx, {hints, req, route, tag, $state, $location, index}, cb);
                }
            )()
        }

        me.trigger('history-pending', me.prev, $state, $location, ctx, callback);
    }

    /**
     * Trigger history-resolve evt to enter the tag
     * @param data {Null}
     * @param ctx {Object}
     * @param addons {Object}
     * @param callback {Function}
     */
    routeSuccess(data, ctx, {hints, req, route, tag, $state, $location, index}, cb){
        let me = this;
        let callbackInvokeCount = 0;
        let callback = () => {
            callbackInvokeCount++;
            let listeners = 
                this.evtListeners
                    .filter(({evt, fn}) => {
                        if (evt === 'history-resolve') {
                            return fn.toString()
                                .match(/\(.*?\)/)[0]
                                .replace('(', '').replace(')', '')
                                .split(',')
                                .filter(p => p === 'next').length === 1;
                        }
                    })
            let concernsCount = listeners.length;
            if (concernsCount === callbackInvokeCount) {
                done();
            }
        }

        let done = () => {
            tag.enter(me.prev, route, ctx);
            if (me.handler) {
                me.handler('enter', tag);    
            }
            tag.update();
            me.trigger('history-success',
                me.prev, 
                route
            );
            me.location = $location;
            me.prev = route;
            cb();
        }

        me.trigger('history-resolve', me.prev, route, ctx, hints, index, callback);
    }

    setHandler(callback) {
        this.handler = callback;
    }

    /**
     * Exchange control flow to hub from riot router
     * @param url (String)
     * @return this
     */
    go(url, title = null, replace){
        if (!title && this.title) {
            title = this.title();
        }
        route(url, title, replace);
        return this; 
    }

    setTitle(fn){
        this.title = fn;
    }

    /**
     * Recursive execute middlewares defined in tag
     * @param component (Object) tag
     * @param mws (Array)
     * @param ctx (Object)
     * @param done (Function)
     */
    executeMiddlewares(component, mws, ctx, done){
        let me = this;
        return function nextFn(){
            if(!mws || !mws.length){
                return done();
            }
            mws[0].call(component, () => me.executeMiddlewares(component, mws.slice(1), ctx, done)(), ctx);
        }
    }

    search(param, value){
        this.trigger('state-search', {param, value})
        return this;
    }

    /**
     * getters and setters
     */
    get view(){
        return this._view;
    }

    set view(val){
        this._view = val;
    }

    get root(){
        return this._root;
    }

    set root(v){
        this._root = v;
    }

    get prev(){
        return this._prev;
    }

    set prev(v){
        this._prev = v;
    }

    get busy(){
        return this._busy;
    }

    set busy(val){
        this._busy = val;
    }

    get title(){
        return this._title;
    }

    set title(val){
        this._title = val;
    }

    get routes(){
        return this._routes;
    }

    set routes(val){
        this._routes = val;
        Util.flatAndComposePrefix(this.routes, this.refinedRoutes);
    }

    get defaultRoute(){
        return this._defaultRoute;
    }

    set defaultRoute(val){
        this._defaultRoute = val;
    }

    get location(){
        return this._location;
    }

    set location(val){
        this._location = val
    }

    subscribe(evt, fn){
        let me = this;
        this.evtListeners.push({evt, fn});
        this.on(evt, fn);
        return function unSubscribe() {
            for (let i=0, len=me.evtListeners.length; i<len; i++) {
                let evtListener = me.evtListeners[i];
                if (fn === evtListener.fn) {
                    me.off(evt, fn);
                    return true;
                }
            }
            return false;
        }
    }

    trigger(...args){
        return this._emitter.trigger.apply(this._emitter, args);
    }

    on(...args){
        return this._emitter.on.apply(this._emitter, args);
    }

    off(...args){
        return this._emitter.off.apply(this._emitter, args);
    }

    one(...args){
        return this._emitter.one.apply(this._emitter, args);
    }
}

class Util {
    static distinct(arr){
        let res = [];
        for(let i=0, len=arr.length; i<len; i++){
            let o = arr[i];
            if(res.indexOf(o) < 0){
                res.push(o);
            }
        }
        return res;
    }

    static flatAndComposePrefix = (node, res) => {
        var arr = node.children;
        if(!arr){
            return;
        }
        for (var i=0, len=arr.length; i<len; i++) {
            let route = arr[i];
            route.path = (node.path || '') + route.path;
            route.parent = node.id || '';
            route.id = Util.genId(8);
            res.push(route);
            Util.flatAndComposePrefix(route, res)
        }
    }

    static genId(n){
        let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let res = "";
        for(let i = 0; i < n ; i ++) {
                let id = Math.ceil(Math.random()*35);
                res += chars[id];
        }
        return res;
    }

    static completePart(uri){
        return uri.startsWith('/') ? uri : ('/' + uri);
    }

    static assert(val, msg){
        if(!val){
            throw new Error(msg);
        }
    }
    
    static omit(o, ...params){
        var res = {};
        for(var p in o){
            if(params.indexOf(p) < 0){
                res[p] = o[p]
            }
        }
        return res;
    }

    static compareUrl(u1, u2){
        var r = [];
        var arr1 = u1.split('/');
        var arr2 = u2.split('/');
        for(var i = 0, len = arr1.length; i<len; i++){
            if(arr1[i] === arr2[i]){
                r.push(arr1[i]);
            }else{
                break;
            }
        }
        return r.join('/')
    }

    static isEqual(o1, o2){
        let len = Object.keys(o1).length;
        let res = 0;
        if (len != Object.keys(o2).length) {
            return false;
        }
        for (let prop in o1) {
            if (o1[prop] === o2[prop]) {
                res++;
            }
        }
        return res === len;
    }

    static combineUriParts(parts, i, combined){
        if(!parts.length || i<=0){
            return combined;
        }
        let uri = parts[i-1] + '/' + combined;
        return Util.combineUriParts(parts, --i, uri);
    }

    static composeObject(ks, vs){
        var o = {};
        if(!Array.isArray(ks) || !Array.isArray(vs) || ks.length != vs.length){
            return o;
        }
        ks.forEach((k, index) => {
            o[k] = vs[index]
        });
        return o;
    }

    static getParams(fn){
        if(typeof fn != 'function') throw new Error('Failed to get Param on ' + typeof fn);
        var argO = fn.toString().match(/\(.*\)/).toString();
        if(argO.length<=2) return null;
        var argArr = argO.substr(1, argO.length-2).split(',');
        return argArr.map(function(a){
            return a.trim();
        });
    };

    static extractParams(path){ 
        return path.match(/_[a-zA-Z0-9:]+/g)
    }

    static toPattern(route){
        return route.replace(/_[a-zA-Z0-9:]+/g, "*");   
    }

    static nextTick(fn){
        return setTimeout(fn, 0);
    }

}

var hub = new Hub(riot.observable());

export default { 
	hub: hub,
	$use: function(fn){
        !this.$mws && (this.$mws = []);
        this.$mws.push(fn);
	}
};