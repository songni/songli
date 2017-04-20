import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, View, onUse } from '../../framework/ninjiajs/src/index';
import { createSelector } from 'reselect';
import interruptors from '../interruptors';

/*
const isUnReceived = order => {
  if ( order.gift.scene === 'wb' && 
      (!order.receivers ||
       !order.receivers.length)) {
    return true
  }
  if ( order.gift.scene != 'wb' && 
      (!order.receivers ||
       !order.receivers.length || 
       order.receivers.filter(r => r.telephone).length <= 0)) {
    return true
  }
  return false
  
}

const isUnAllReceived = order => {
  if(order.gift.scene === 'wb' &&
     order.receivers &&
     order.receivers.length &&
     order.receivers.length > 0){
    return true
  }
  if (order.gift.scene != 'wb' &&
      order.receivers &&
      order.receivers.length && 
      order.receivers.filter(r => r.telephone).length > 0 && 
      order.receivers.filter(r => r.telephone).length != order.capacity) {
    return true
  }
  return false
}

const isAllReceived = order => {
  if(order.gift.scene === 'wb' &&
       order.receivers &&
       order.receivers.length &&
       order.receivers.length === order.capacity){
      return true
  }
  if (order.gift.scene != 'wb' &&
        order.receivers &&
        order.receivers.length && 
        order.receivers.filter(r => r.telephone).length === order.capacity) {
      return true
  }
  return false
}

const isReceivers = order => {
  if (order && 
      order.receivers && 
      order.receivers.filter(r => r.telephone)){ 
    return true 
  }
  return false
}
*/

const orderSelector = state => state.order;
const isUnReceived = createSelector(
  orderSelector,
  order => {
    return order.receivedCount === 0;
  }
)

const isUnAllReceived = createSelector(
  orderSelector,
  order => {
    let receivedCount = order.receivedCount;
    return receivedCount > 0 && receivedCount < order.capacity
  }
)

const isAllReceived = createSelector(
  orderSelector,
  order => {
    return order.capacity === order.receivedCount;
  }
)

const isReceivers = createSelector(
  orderSelector,
  order => {
    return order.receivedCount > 0;
  }
)

@View
@Connect(
  state => ({ 
	  order: state.order,
	  clientWidth: state.clientWidth,
	  receivers: isReceivers(state),
	  isUnReceived: isUnReceived(state),
	  isUnAllReceived: isUnAllReceived(state),
	  isAllReceived: isAllReceived(state),
  }),
  dispatch => ({
    enterOrderReady: (next, ctx) => dispatch(actions.enterOrderReady(next, ctx)),
    share: actions.shareOrder
  })
)
export default class Ready extends riot.Tag {
  static originName = 'order-ready'

  get name() {
    return 'order-ready'
  }

  get tmpl() {
    return `
      <div class="ready_multi">
        <div class="multi_wrap">
          <div class="multi_cont">
            <img class="right_top_corner" src="//img.91pintuan.com/songli/i.png" />
            <div class="head_portrait">
              <img riot-src="{ opts.order.sender.info.headimgurl }"/>
            </div>
            <div class="head_nickname">
              <span>我的礼包</span> 
            </div>
            <div class="receive_status">
              <div if="{ opts.isUnReceived }">
                <span class="gift_num">{ opts.order.capacity }份礼物已备好</span>
                <span class="receive_num">开始送礼吧</span>
              </div>
              <div if="{ opts.isUnAllReceived }">
                <span class="gift_num">还有{ opts.order.capacity - opts.order.receivedCount }份</span>
                <span class="receive_num">{ opts.order.receivedCount }人已领取</span>
              </div>
              <div if="{ opts.isAllReceived }"> 
                <span class="gift_num">礼物已全部被领完</span>
                <span class="receive_num">{ opts.order.receivedCount }人已领取</span>
              </div>
            </div>
            <div class="btn_receive"> 
              <!--gift receive-->
              <a href="javascript:void(0)" if="{ opts.isUnReceived }" onclick="{ opts.share }" class="btn-fill">开始送礼</a>
              <!--gift received-->
              <a href="/gift/list" if="{ opts.isAllReceived || opts.isUnAllReceived }" class="btn_continue">继续送礼</a>
            </div>
            <div class="gift_cover">
              <div class="cover_cont">
                <div class="img_cover" style="height: {(opts.clientWidth - 50)/2}px">
                  <img riot-src="{ opts.order.gift.info.cover ? app.config.phtUri + opts.order.gift.info.cover + app.config.phtStlList5 : app.config.images.GIFT_DEF_COVER }">
                </div>
                <div class="title">
                  <span>{ opts.order.gift.info.name }</span>
                  <a href="/order/{ opts.order.id }/detail">
                    <img src="//img.91pintuan.com/songli/client2/white_right.png">
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!--receive gifts interact information-->
          <order-interact></order-interact>
        </div>
        <!--Bottom mark-->
        <icon-href theme="{ white }"></icon-href'>
      </div>
    `;
  }
  
  @onUse([interruptors.isSender, 'enterOrderReady'])
  onCreate(opts) {}
}