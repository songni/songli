import riot from 'riot';
import route from 'riot-route';
import { View, Connect } from '../../framework/ninjiajs/src/index';

const getSuborders = receivers => receivers && receivers.filter(r => r.status && r.status.shipping) || []

@View
@Connect(
	state => ({
		order: state.order,
		suborders: getSuborders(state.order.receivers)
	})
)
export default class PersonalOrderInfoShipped extends riot.Tag {
	static originName = 'personal-order-info-shipped'
	get name() {
		return 'personal-order-info-shipped'
	}
	get tmpl() {
		return require('./tmpl/order.info.shipped.tag');
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse)
	}

	async onUse(next) {
		next();
	}
}