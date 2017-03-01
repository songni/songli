import riot from 'riot';
import route from 'riot-route';
import { Connect, View, Component, onUse } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';

@Component
@View
@Connect(
  state => ({
    orders: state.orders,
    clientWidth: state.clientWidth
  }),
  dispatch => ({
    enterOrderList: (next, ctx) => dispatch(actions.enterOrderList(next, ctx)),
    nextPageCreator: my => () => dispatch(actions.nextPage(my))
  })
)
export default class OrderList extends riot.Tag {
  static originName = 'order-list'
  
  get name() {
    return 'order-list'
  }

  get tmpl() {
    return require('./tmpl/order.list.tag');
  }

  @onUse('enterOrderList')
  onCreate(opts) {}
}