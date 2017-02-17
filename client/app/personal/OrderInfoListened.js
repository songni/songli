import riot from 'riot';
import route from 'riot-route';
import { View, Connect } from '../../framework/ninjiajs/src/index';
 
const getSuborders = receivers => receivers && receivers.filter(r => r.status && r.status.shipping && r.status.read) || []

@View
@Connect(
	state => ({
		order: state.order,
		suborders: getSuborders(state.order.receivers)
	})
)
export default class PersonalOrderInfoListened extends riot.Tag {
	static originName = 'personal-order-info-listened'
	get name() {
		return 'personal-order-info-listened'
	}
	get tmpl() {
		return require('./tmpl/order.info.listened.tag');
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse)
	}

	async onUse(next) {
		next();
	}
}