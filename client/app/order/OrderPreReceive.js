import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Component } from '../../framework/ninjiajs/src/index';

const isAvailable = order => {
  if (order.receivers && order.receivers.length) {
    return order.capacity - receivedCount(order) > 0
  }
  return true;
}
const receivedCount = order => {
  if (order.receivers && order.receivers.length) {
    return order.receivers.filter(r => r.telephone).length
  }
  return 0;
}

@Component
@Connect(
	state => ({
		order: state.order,
		clientWidth: state.clientWidth,
    type: state.order.capacity > 1 ? 'one2many' : 'one2one',
    availableCount: state.order.capacity - receivedCount(state.order),
    receivedCount: receivedCount(state.order),
    isInteract: true,
    isAvailable: isAvailable(state.order)
	}),
	dispatch => ({
    detail: actions.giftDetail
  })
)
export default class OrderPreReceive extends riot.Tag {
  static originName = 'order-pre-receive'

  get name() {
    return 'order-pre-receive'
  }

  get tmpl() {
		return require(`./tmpl/order-pre-receive.tag`);
  }
	
  onCreate(opts) {}
  
  async onSubmit(){
    let { getState, dispatch } = app.store
    let order = getState().order
    if (order.gift && order.gift.scene === 'wb') {
      await dispatch(actions.orderReceiveSubmit())
      return 
    } else {
      route(`/order/${ order.id }/receive`)
    }
  }
}