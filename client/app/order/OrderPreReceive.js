import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Component } from '../../framework/ninjiajs/src/index';
import { createSelector } from 'reselect';

const orderSelector = state => state.order;
const isAvailable = createSelector(
  orderSelector,
  order => {
    return (order.capacity - order.receivedCount) > 0 ;
  }
)

const receivedCount = createSelector(
  orderSelector,
  order => {
    return order.receivedCount ;
  }
)


@Component
@Connect(
	state => ({
		order: state.order,
		suborders: state.suborderInteracts.suborders,
		clientWidth: state.clientWidth,
    type: state.order.capacity > 1 ? 'one2many' : 'one2one',
    availableCount: state.order.capacity - receivedCount(state),
    receivedCount: receivedCount(state),
    isInteract: true,
    isAvailable: isAvailable(state)
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