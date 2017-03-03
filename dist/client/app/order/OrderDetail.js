import riot from 'riot';
import route from 'riot-route';
import { Connect, onUse, View } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';

@View
@Connect(null, 
  dispatch => ({
    enterOrderDetail: (next, ctx) => dispatch(actions.enterOrderDetail(next, ctx))
  })
)
export default class OrderDetail extends riot.Tag {
  static originName = 'order-detail'
  get name() {
    return 'order-detail'
  }
  get tmpl() {
    return `
			<router-outlet></router-outlet>
		`;
  }
  
  @onUse('enterOrderDetail')
  onCreate(opts) {}
}