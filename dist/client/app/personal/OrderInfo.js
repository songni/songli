import riot from 'riot';
import route from 'riot-route';
import { View, Connect, onUse } from '../../framework/ninjiajs/src/index';
import moment from '../../framework/moment';
import actions from './personal.actions';
import interruptors from '../interruptors';
import suborderActions from '../suborder/suborder.actions';


@View
@Connect(
	state => ({
		order: state.order,
		suborder: state.suborderInteracts.suborders[0],
		receivedNum: state.suborderCount.receivedCount,
		shippedNum: state.suborderCount.shippedCount,
		listenedNum: state.suborderCount.readCount,
		receivedTime: state.suborderLatestTime.receivedTime,
		shippedTime: state.suborderLatestTime.shippedTime,
		readTime: state.suborderLatestTime.readTime,
		clientWidth: state.clientWidth
	}),
	dispatch => ({
		enterPersonalOrderInfo: (next, ctx) => dispatch(actions.enterPersonalOrderInfo(next, ctx))
	})
)
export default class PersonalOrderInfo extends riot.Tag {
	static originName = 'personal-order-info'

	get name() {
		return 'personal-order-info'
	}

	get tmpl() { return `<router-outlet>
  <div class="order_detail">
    <div class="order_wrap">
      <div class="order_cont">
        <div class="order_head">
          <span>
            <img riot-src="{ parent.opts.order.gift.info.cover ? app.config.phtUri + parent.opts.order.gift.info.cover : app.config.images.GIFTSHRAE_DEF_COVER }" >
          </span>
          <span style="width: { parent.opts.clientWidth - 95 }px">{ parent.opts.order.gift.info.name }</span>
        </div>
        <div class="order_main">
          <ul>
            <li>
              <span>单价：</span>
              <span>{ $.util.filter.currency(parent.opts.order.gift.info.price) }</span>
            </li>
            <li>
              <span>数量：</span>
              <span>{ parent.opts.order.capacity }份</span>
            </li>
            <li>
              <span>总价：</span>
              <span>{ $.util.filter.currency(parent.opts.order.gift.info.price * parent.opts.order.capacity) }</span>
            </li>
            <li>
              <span>下单时间：</span>
              <span>{ $.util.filter.date(parent.opts.order.time.add) }</span>
            </li>
            <li if="{ parent.opts.order.receivers[0].express.no }">
              <span>快递单号：</span>
              <span>{ parent.opts.order.receivers[0].express.no }</span>
            </li>
          </ul>
        </div>
        <!--送一人礼物领取状态-->
        <div class="order_state" if="{ parent.opts.order.capacity == 1 }" >
          <div class="title" if="{ parent.opts.suborder && ( parent.opts.suborder.status.read || parent.opts.suborder.status.shipping || parent.opts.suborder.telephone || parent.opts.order.time.pay) }">
            <span>礼物状态 </span>
          </div>
          <ul>
            <li if="{ parent.opts.suborder.status.read }" >
              <span>{ $.util.filter.date(parent.opts.suborder.status.read_date) }</span>
              <span>已收货</span>
            </li>
            <li if="{ parent.opts.suborder.status.shipping }">
              <span>{ $.util.filter.date(parent.opts.suborder.status.shipping_date) }</span>
              <span>已发货</span>
            </li>
            <li if="{ parent.opts.suborder && parent.opts.suborder.telephone }" >
              <span>{ $.util.filter.date(parent.opts.suborder.fillinDate) }</span>
              <span>已领取</span>
            </li>
            <li>
              <span>{ parent.opts.suborder && parent.opts.order.time.pay ? $.util.filter.date(parent.opts.order.time.pay) + '下单' : '' }</span>
              <a if="{ parent.opts.suborder && parent.opts.suborder.telephone }" ui-sref="order.detail.one2one-address({id: order.id})">
                <em>礼物已被领取</em>
                <em><img src="//img.91pintuan.com/songli/client/poi-right.png"/></em>
              </a>
              <a if="{ !parent.opts.suborder || !parent.opts.suborder.telephone }" ui-sref="order.detail.one2one-address({id: order.id})">
                <em>1份礼物未被领取</em>
                <em><img src="//img.91pintuan.com/songli/client/poi-right.png"/></em>
              </a>
            </li>
          </ul>
        </div>
        <!--送多人礼物领取状态-->
        <div class="order_state" if="{ parent.opts.order.capacity > 1 }" >
          <div class="title" if="{ parent.opts.listenedNum || parent.opts.shippedNum || parent.opts.receivedNum || parent.opts.order.time.pay }">
            <span>礼物状态 </span>
          </div>
          <ul>
            <li class="receiver" if="{ parent.opts.listenedNum != 0 }">
              <span>{ $.util.filter.date(parent.opts.readTime) }</span>
              <span onclick="{ parent.listened.bind(parent) }">
                <em>已收货 { parent.opts.listenedNum }</em>
                <em><img src="//img.91pintuan.com/songli/client/poi-right.png"/></em>
              </span>
            </li>
            <li if="{ parent.opts.shippedNum != 0 }">
              <span>{ $.util.filter.date(parent.opts.shippedTime) }</span>
              <span onclick="{ parent.shipped.bind(parent) }">
                <em>已发货 { parent.opts.shippedNum }</em>
                <em><img src="//img.91pintuan.com/songli/client/poi-right.png"/></span></em>
              </span>
            </li>
            <li if="{ parent.opts.receivedNum != 0 }">
              <span>{ $.util.filter.date(parent.opts.receivedTime) }</span>
              <span onclick="{ parent.received.bind(parent) }">
                <em>已领取 { parent.opts.receivedNum }</em>
                <em><img src="//img.91pintuan.com/songli/client/poi-right.png"/></em>
              </span>
            </li>
            <li>
              <span>{ $.util.filter.date(parent.opts.order.time.pay) }</span>
              <span onclick="{ parent.jumpToAddressCard.bind(parent) }">
                <em>{ parent.opts.order.capacity - parent.opts.receivedNum === 0 ? '礼物已被领完' : parent.opts.order.capacity - parent.opts.receivedNum + '份礼物未领取' }</em>
                <em><img src="//img.91pintuan.com/songli/client/poi-right.png"/></em>
              </span>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  </div>
</router-outlet>
 ` }

	@onUse([interruptors.isSender, 'enterPersonalOrderInfo'])
	onCreate(opts) {}

	received() {
		if (this.opts.receivedNum) {
			route(`/personal/order/${this.opts.order.id}/info/received`);
		}
	};

	listened() {
		if (this.opts.listenedNum > 0) {
			route(`/personal/order/${this.opts.order.id}/info/listened`);
		}
	};
    
  shipped() {
		if (this.opts.shippedNum > 0){
			route(`/personal/order/${this.opts.order.id}/info/shipped`);
		}
	};

  jumpToAddressCard() {
		route(`/order/${this.opts.order.id}/ready`);
	}
}