import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Component } from '../../framework/ninjiajs/src/index';

const isAvailable = order => {
  if (order.receivers && order.receivers.length) {
    return order.capacity - receivedCount(order) > 0
  }
  return true;
}
const receivedCount = order => {
  if (order.receivers && order.receivers.length) {
    return order.receivers.filter(r => r.telephone).length
  }
  return 0;
}

@Component
@Connect(
	state => ({
		order: state.order,
		clientWidth: state.clientWidth,
    type: state.order.capacity > 1 ? 'one2many' : 'one2one',
    availableCount: state.order.capacity - receivedCount(state.order),
    receivedCount: receivedCount(state.order),
    isInteract: true,
    isAvailable: isAvailable(state.order)
	}),
	dispatch => ({
    detail: actions.giftDetail
  })
)
export default class OrderPreReceive extends riot.Tag {
  static originName = 'order-pre-receive'

  get name() {
    return 'order-pre-receive'
  }

  get tmpl() { return `<div class="pre_receive">
  <div class="pre_wrap">
    <div class="pre_cont">
      <img class="right_top_corner" src="//img.91pintuan.com/songli/i.png" />
      <div class="head_portrait">
        <img riot-src="{ opts.order.sender.info.headimgurl }" />
      </div>
      <div class="head_nickname">
        <span>{ opts.order.sender.info.nickname }送给你一份礼物</span>
      </div>
      <div class="receive_status">
        <div if="{ opts.isAvailable }">
          <div if="{ opts.type === 'one2one' }">
            <span class="gift_num">请尽快领取</span>
            <span class="receive_num" if="{ opts.order.gift.scene === 'poi' }">领取后到店使用</span>
            <span class="receive_num" if="{ opts.order.gift.scene === 'logistics' }">点击领取礼物完善收货信息</span>
          </div>
          <div if="{ opts.type === 'one2many' }">
            <span class="gift_num">还有{ opts.availableCount }份 </span>
            <span class="receive_num">{ opts.receivedCount }人已领取</span>
          </div>
        </div>
        <div if="{ !opts.isAvailable }">
          <div if="{ opts.type === 'one2one' }">
            <span class="gift_num">礼物已被抢完</span>
            <span class="receive_num">{ opts.order.receivers[0].name }</span>
          </div>
          <div if="{ opts.type === 'one2many' }">
            <span class="gift_num">礼物已被抢完</span> <br />
            <span class="receive_num">{ opts.receivedCount }人已领取</span>
          </div>
        </div>
      </div>
      
      <div class="btn_group">
        <a if="{ opts.isAvailable }" href="javascript: void(0)" onclick="{ onSubmit }" class="btn_receive">领取礼物</a>
        <a if="{ !opts.isAvailable }" href="/gift/{ opts.order.gift.id }" class="btn_send">我也要送礼</a>
        <span if="{ opts.type === 'one2many' && opts.order.gift.scene === 'poi' }">领取后到店使用</span>
      </div>
      
      <div class="gift_cover">
        <div class="cover_cont">
          <div class="img_cover" style="height: {(opts.clientWidth -50 )/2}px">
            <img riot-src="{ opts.order.gift.info.cover ? app.config.phtUri + opts.order.gift.info.cover + app.config.phtStlList5 : app.config.images.GIFT_DEF_COVER }">
          </div>
          <div class="title">
            <span>{ opts.order.gift.info.name }</span>
            <a href="/order/{ opts.order.id }/detail"><img src="//img.91pintuan.com/songli/client2/white_right.png"></a>
          </div>
        </div>
      </div>
    </div>
    <order-interact
        if="{ opts.isInteract }"
        order="{ order }"
    ></order-interact>
  </div>
  <icon-href theme="white"></icon-href>
</div> ` }
	
  onCreate(opts) {}
  
  async onSubmit(){
    let { getState, dispatch } = app.store
    let order = getState().order
    if (order.gift && order.gift.scene === 'wb') {
      await dispatch(actions.orderReceiveSubmit())
      return 
    } else {
      route(`/order/${ order.id }/receive`)
    }
  }
}