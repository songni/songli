import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, View } from '../../framework/ninjiajs/src/index';

@View
@Connect(
  state => ({
	  order: state.order
  }),
  dispatch => ({
    enterOrderReady: () => dispatch(actions.enterOrderReady())
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
  onCreate(opts) {
    this.mixin('router');
    this.$use(this.onUse)
  }

  async onUse(next) {
    await this.opts.enterOrderReady();
    next();
  }
}