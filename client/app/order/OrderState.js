import riot from 'riot';
import route from 'riot-route';
import { Connect, View, onUse } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';
import interruptors from '../interruptors';

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
		enterOrderState: (next, ctx) => dispatch(actions.enterOrderState(next, ctx))
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

	@onUse([interruptors.isNotSender, 'enterOrderState'])
	onCreate(opts) {}

}