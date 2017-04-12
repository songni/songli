import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import interruptors from '../interruptors';
import { Connect, View, Component, onUse } from '../../framework/ninjiajs/src/index';

const getScene = (gift, receive) => {
	switch (gift.scene) {
		case 'poi':
			return 'poi';
		case 'logistics':
			return 'logistics';
		case 'wb':
			return 'wb';
		case 'multi':
			if (receive.scene === 'poi') {
				return 'poi';
			}
			if (receive.scene === 'logistics') {
				return 'logistics';
			}
		default:
		 	false;
	}
}

@Component
@View
@Connect(
	state => ({
		order: state.order,
		scene: getScene(state.order.gift, state.receive)
	}),
	dispatch => ({
	  share: actions.shareOrder,
		enterOrderReceive: (next, ctx) => dispatch(actions.enterOrderReceive(next, ctx))
	})
)
export default class OrderReceive extends riot.Tag {
  static originName = 'order-receive'

  get name() {
    return 'order-receive'
  }

  get tmpl() {
    return `
			<order-receive-poi if="{ opts.scene === 'poi' }"></order-receive-poi>
			<order-receive-logistics if="{ opts.scene === 'logistics' }"></order-receive-logistics>
			<order-receive-wb if="{ opts.scene === 'wb' }"></order-receive-wb>
		`;
  }
	
	@onUse([interruptors.isNotSender, 'enterOrderReceive'])
  onCreate(opts) {}

}