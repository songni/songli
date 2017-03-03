import riot from 'riot';
import route from 'riot-route';
import { View, Connect } from '../../framework/ninjiajs/src/index';

const getSuborders = receivers => receivers && receivers.filter(r => r.telephone) || []

@View
@Connect(
	state => ({
		order: state.order,
		suborders: getSuborders(state.order.receivers),
		clientWidth: state.clientWidth
	})
)
export default class PersonalOrderInfoReceived extends riot.Tag {
	static originName = 'personal-order-info-received'
	get name() {
		return 'personal-order-info-received'
	}
	get tmpl() {
    return `
      <div class="order_received">
        <div class="received_list">
          <div class="received" each="{ suborder in opts.suborders }" >
            <div class="suborder_img">
              <img riot-src="{ suborder.headimgurl }" >
            </div>
            <div class="suborder_info" style="width: { parent.opts.clientWidth -120 }px">
              <div class="name">
                <span>{ suborder.consignee }</span>
                <span>已领取</span>
              </div>
              <div class="time">
                <span>{ $.util.filter.date(suborder.fillinDate) }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
	}

	onCreate(opts) {}
}