import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, View, onUse } from '../../framework/ninjiajs/src/index';
import interruptors from '../interruptors';

@View
@Connect(
  state => ({
	  order: state.order
  }),
  dispatch => ({
    enterOrderReady: (next, ctx) => dispatch(actions.enterOrderReady(next, ctx))
  })
)
export default class Ready extends riot.Tag {
  static originName = 'order-ready'

  get name() {
    return 'order-ready'
  }

  get tmpl() {
    return `
			<order-ready-one2one if="{ opts.order.capacity === 1 }"></order-ready-one2one>
			<order-ready-one2many if="{ opts.order.capacity > 1 }"></order-ready-one2many>
		`;
  }
  
  @onUse([interruptors.isSender, 'enterOrderReady'])
  onCreate(opts) {}
}