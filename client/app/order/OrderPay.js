import riot from 'riot';
import route from 'riot-route';
import { Connect, View, onUse } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';

@View
@Connect(
	state => ({
		order: state.order,
		gift: state.gift
	}),
	dispatch => ({
		enterOrderPay: (next, ctx) => dispatch(actions.enterOrderPay(next, ctx)),
		wxPay: function(e){ return dispatch(actions.wxPay.apply(this))}
	})
)
export default class OrderPay extends riot.Tag {
	static originName = 'order-pay'

	get name() {
		return 'order-pay'
	}

	get tmpl() {
		//<!-- build:tmpl:begin -->
		return require(`./tmpl/order-pay.tag`);
		//<!-- endbuild -->
	}

	@onUse('enterOrderPay')
	onCreate(opts) {
		this.on('mount', () => {
			setTimeout(() => {
				
			}, 3000)
		})
	}
}