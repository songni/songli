import riot from 'riot';
import route from 'riot-route';
import { Component } from '../../framework/ninjiajs/src/index';

@Component
export default class RouterOutlet extends riot.Tag {
	static originName = 'router-outlet'

	get name() {
		return 'router-outlet'
	}

	get tmpl() {
		return `
			<div if="{hasNoChildren}" data-yield>
				<yield/>
			</div>
			<div data-tag-name="{ route.component.displayName }" each="{ route in distinct(routes) }"></div>
		`;
	}
	onCreate(opts) {
    this.$isMounted = false;
		this.hasNoChildren = true;
		this.skipSync = false;

		this.on('update', this.componentOnUpdate.bind(this))

		this.on('unmount', this.componentUnMounted.bind(this))
		
		this.on('mount', this.componentDidMount.bind(this))
	}

	componentOnUpdate() {
		this.hasNoChildren = this.routes.filter(r => r.tag && r.tag.isMounted).length <= 0
		if (!this.skipSync) {
			this.skipSync = true;
			this.update();
		}
		this.skipSync = false;
	}

	componentUnMounted() {
		this.$isMounted = false;
		this.routes.forEach(r => {
			r.tag && r.tag.unmount();
		})
	}

	componentDidMount() {
		this.$isMounted = false;
		this.routes = [];
		if (!app.hub.state.hint) {
			this.routes = app.hub.routes.children;
		} else {
			let outletId = app.hub.refinedRoutes.filter(r => r.path === app.hub.state.hint)[0];
			this.routes = app.hub.refinedRoutes.filter(r => r.id === outletId.id)[0].children;
		}
		this.update();
		this.trigger('$mounted');
		this.$isMounted = true;
	}

	distinct(routes) {
		let res = [];
		if (routes) {
			for (var i=0, len=routes.length; i<len; i++) {
				var route = routes[i];
				if (route.components) {
					Object.keys(route.components).forEach(k => {
						let c = route.components[k];
						if (res.filter(r => r.component.displayName === c.displayName).length <= 0) {
							route.component = c;
							res.push(route);
						}	
					})
				} else {
					if (res.filter(r => r.component.displayName === route.component.displayName).length <= 0) {
						res.push(route);
					}
				}
			}
		}
		return res;
	}
}