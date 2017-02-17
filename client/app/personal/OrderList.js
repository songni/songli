import riot from 'riot';
import route from 'riot-route';
import { View } from '../../framework/ninjiajs/src/index';

@View
export default class PersonalOrderList extends riot.Tag {
	static originName = 'personal-order-list'
	get name() {
		return 'personal-order-list'
	}
	get tmpl() {
		return `
			<order-list force="true" personal="true"></order-list>
		`;
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse)
	}

	async onUse(next) {
		next();
	}
}