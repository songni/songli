import riot from 'riot';
import route from 'riot-route';
import { View } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';

@View
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
  
  onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse.bind(this))
  }

	async onUse(next, ctx) {
		await app.store.dispatch(actions.getOrderById(ctx.req.params.id));
		next();
	}
}