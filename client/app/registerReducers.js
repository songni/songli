import riotRouterReduxReducer from 'ninjiajs/dist/riot-router-redux/riot.router.reducers';
const isClient = (typeof module !== 'undefined' && module.exports) ? false : true ;
let reducers = {};
let clientPath = '../../client';
let appPath = `${clientPath}/app`;

if(process.env.CLIENT_SIDE){
    let reqContext = require.context('../../client', true, /.*reducers.js/);
    reducers = requireAll(reqContext).concat([{default: riotRouterReduxReducer}]).reduce((o, m) => {
        for(var p in m['default']){
            o[p] = m['default'][p];
        }
        return o;
    }, {});
}else{
    registerModule('app', true);
}

export default reducers;

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

function registerModule(md, root = false){
    let requiredModule;
    if(root){
        requiredModule = require(`${appPath}/${md}.reducers`);    
    }else{
        requiredModule = require(`${appPath}/${md}/${md}.reducers`);
    }
    if(requiredModule){
        for(var p in requiredModule['default']){
            reducers[p] = requiredModule['default'][p];
        }
    }
}