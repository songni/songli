import riot from 'riot';
import route from 'riot-route';
import { View, Connect } from '../../framework/ninjiajs/src/index';

@View
export default class Bigpack extends riot.Tag {
	static originName = 'bigpack'
	get name() {
		return 'bigpack'
	}
	get tmpl() {
		return `<router-outlet></router-outlet>`;
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse)
	}

	async onUse(next) {
		next();
	}
}