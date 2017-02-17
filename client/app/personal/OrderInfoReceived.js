import riot from 'riot';
import route from 'riot-route';
import { View, Connect } from '../../framework/ninjiajs/src/index';

const getSuborders = receivers => receivers && receivers.filter(r => r.telephone) || []

@View
@Connect(
	state => ({
		order: state.order,
		suborders: getSuborders(state.order.receivers)
	})
)
export default class PersonalOrderInfoReceived extends riot.Tag {
	static originName = 'personal-order-info-received'
	get name() {
		return 'personal-order-info-received'
	}
	get tmpl() {
		return require('./tmpl/order.info.received.tag');
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse)
	}

	async onUse(next) {
		next();
	}
}