import riot from 'riot';
import route from 'riot-route';
import { connect, view } from '../../framework/ninjiajs/src/index';

@view
export default class Order extends riot.Tag {
	static originName = 'order'
	get name() {
		return 'order'
	}
	get tmpl() {
		return `<router-outlet></router-outlet>`;
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse)
	}

	async onUse(next) {
		// await this.opts.enterGiftList();
		next();
	}
}