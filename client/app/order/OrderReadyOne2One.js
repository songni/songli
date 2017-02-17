import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Component } from '../../framework/ninjiajs/src/index';

const isReceived = order => {
  return order.receivers && order.receivers[0] && order.receivers[0].telephone || false
}

@Component
@Connect(state => ({
	order: state.order,
	isReceived: isReceived(state.order)
}),
	dispatch => ({
		enterOrderReadyOne2One: dispatch(actions.enterOrderReadyOne2One),
    share: actions.shareOrder
	})
)
export default class OrderReadyOne2One extends riot.Tag {
  static originName = 'order-ready-one2one'
  get name() {
    return 'order-ready-one2one'
  }
  get tmpl() {
    return `
			<div if="{ opts.isReceived }" class="ready_single">
        <div class="single_wrap">
          <div class="single_cont">
            <img class="right_top_corner" src="https://img.91pintuan.com/songli/i.png">
            <div class="head_portrait">
              <img riot-src="{ opts.order.sender.info.headimgurl }" />
            </div>
            <div class="head_nickname">
              <span>{ opts.order.sender.info.nickname }的礼物</span>
            </div>
            <div class="receive_status">
              <span class="gift_num">礼物已被领取</span>
              <span class="receive_num">等待商家发货</span>
            </div>
            <div class="receiver_info">
              <div><span>收礼人：</span><span>{ opts.order.receivers[0].consignee }</span></div>
              <div><span>手机号：</span><span>{ opts.order.receivers[0].telephone }</span></div>
              <div if="{ opts.order.receivers[0].address }">
                <span class="addr">地 址：</span>
                <span>{ opts.order.receivers[0].address }</span>
              </div>
              <div if="{ opts.order.receivers[0].poi }">
                <span>门店地址：</span>
                <span>{ opts.order.receivers[0].poi.base_info.business_name +  order.receivers[0].poi.base_info.address }</span>
              </div>
            </div>
            <div class="btn_continue"> 
              <a href="/gift/{ opts.order.gift.id }">继续送礼</a>
            </div>
          </div>
        </div>
        <icon-href theme="{ white }"></icon-href'>
      </div>

      <div if="{ !opts.isReceived }">
        <div  if="{ opts.order.gift.scene === 'poi' }"  class="ready_single">
          <div class="single_wrap">
            <div class="single_cont">
              <img class="right_top_corner" src="https://img.91pintuan.com/songli/i.png">
              <div class="head_portrait">
                <img riot-src="{ opts.order.sender.info.headimgurl }" />
              </div>
              <div class="head_nickname">
                <span>{ opts.order.sender.info.nickname }的礼物</span><br />
              </div>
              <div class="receive_status">
                <span class="gift_num">已购买成功</span>
                <span class="receive_num">开始送礼吧</span>
              </div>
              <div class="gift_inform">
                <span>您已经成功购买1份{ opts.order.gift.info.name }；自己领取或转发送给朋友。</span>
              </div>
              <div class="btn_receive">
                <a href="javascript:void(0)" onclick="{ opts.share }">送给朋友</a>
              </div>
            </div>
          </div>
          <icon-href theme="{ white }"></icon-href'>
        </div>
        <div if="{opts.order.gift.scene === 'logistics'}">
          <order-receive force="true"></order-receive>
        </div>
      </div>
		`;
  }
  
  async onCreate(opts) {
    await app.store.dispatch(actions.enterOrderReadyOne2One());
  }
}