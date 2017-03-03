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
    type: state.order.capacity > 1 ? 'one2many' : 'one2one',
    availableCount: state.order.capacity - receivedCount(state.order),
    receivedCount: receivedCount(state.order),
    isInteract: true,
    isAvailable: isAvailable(state.order)
	})
)
export default class OrderPreReceive extends riot.Tag {
  static originName = 'order-pre-receive'

  get name() {
    return 'order-pre-receive'
  }

  get tmpl() {
    //<!-- build:tmpl:begin -->
		return require(`./tmpl/order-pre-receive.tag`);
		//<!-- endbuild -->
  }
	
  onCreate(opts) {}
  
}