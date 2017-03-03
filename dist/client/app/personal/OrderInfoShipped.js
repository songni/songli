import riot from 'riot';
import route from 'riot-route';
import { View, Connect } from '../../framework/ninjiajs/src/index';

const getSuborders = receivers => receivers && receivers.filter(r => r.status && r.status.shipping) || []

@View
@Connect(
	state => ({
		order: state.order,
		suborders: getSuborders(state.order.receivers),
		clientWidth: state.clientWidth
	})
)
export default class PersonalOrderInfoShipped extends riot.Tag {
	static originName = 'personal-order-info-shipped'
	get name() {
		return 'personal-order-info-shipped'
	}
	get tmpl() {
    return `
      <div class="order_info" each="{ suborder in opts.suborders }">
        <div class="suborder_img">
          <img riot-src="{ suborder.headimgurl }" >
        </div>
        <div class="suborder_info" style="width: { parent.opts.clientWidth -90 }px" >
          <div class="name">
            <span>{ suborder.consignee }</span>
            <span>已发货</span>
          </div>
          <div class="time">
            <span>{ $.util.filter.date(suborder.status.shipping_date) }</span>
          </div>
        </div>
        <div class="express">
          <span>快递单号</span>
          <span>{ suborder.express.company.name } { suborder.express.no }</span>
        </div>
      </div>
    `;
	}

	onCreate(opts) {}
}