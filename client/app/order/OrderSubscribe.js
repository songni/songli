import riot from 'riot';
import route from 'riot-route';
import { Connect, View } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';

@View
@Connect(
	state => ({
		clientWidth: state.clientWidth,
		order: state.order,
		qrcode: state.qrForSubscribe
	}),
	dispatch => ({
		enterOrderSubscribe: (next, ctx) => dispatch(actions.enterOrderSubscribe(next, ctx))
	})
)
export default class OrderSubscribe extends riot.Tag {
	static originName = 'order-subscribe'
	get name() {
		return 'order-subscribe'
	}
	get tmpl() {
		return require('./tmpl/order.subscribe.tag');
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use((next, ctx) => this.opts.enterOrderSubscribe(next, ctx))
	}

}