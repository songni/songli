import riot from 'riot';
import route from 'riot-route';
import { Connect, View, Component, onUse } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';

@View
export default class OrderMock extends riot.Tag {
  static originName = 'order-mock'
  
  get name() {
    return 'order-mock'
  }

  get tmpl() {
		return ``;
  }

	@onUse([function(next, ctx){
		return route(`/order/${ctx.req.params.id}/state`)
	}])
  onCreate(opts) {
	}
}