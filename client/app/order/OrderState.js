import riot from 'riot';
import route from 'riot-route';
import { Connect, View } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';

const isReceived = (order, user) => {
	if (
		order.receivers && 
		order.receivers.length &&
		order.receivers.filter(r => r.userOpenId === user.openid)[0]
	) {
		return true;
	}
	return false;
}

@View
@Connect(
	state => ({
		isReceived: isReceived(state.order, state.user)
	}),
	dispatch => ({
		enterOrderState: ctx => dispatch(actions.enterOrderState(ctx))
	})
)
export default class OrderState extends riot.Tag {
	static originName = 'order-state'
	get name() {
		return 'order-state'
	}
	get tmpl() {
		return `
			<order-received-guide if="{ opts.isReceived }"></order-received-guide>
			<order-pre-receive if="{ !opts.isReceived }"></order-pre-receive>
		`;
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(async (next, ctx) => {
			await this.opts.enterOrderState(ctx);
			next();
		})
	}

}