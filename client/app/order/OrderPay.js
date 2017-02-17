import riot from 'riot';
import route from 'riot-route';
import { Connect, View } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';

@View
@Connect(
	state => ({
		order: state.order,
		gift: state.gift
	}),
	dispatch => ({
		enterOrderPay: (next, ctx, tag) => dispatch(actions.enterOrderPay(next, ctx, tag)),
		wxPay: function(e){ return dispatch(actions.wxPay.apply(this))}
	})
)
export default class OrderPay extends riot.Tag {
	static originName = 'order-pay'
	get name() {
		return 'order-pay'
	}
	get tmpl() {
		return require(`./tmpl/order.pay.tag`);
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use((next, ctx) => this.opts.enterOrderPay(next, ctx, this))
	}
}