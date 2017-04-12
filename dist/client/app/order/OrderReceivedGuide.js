import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Component} from '../../framework/ninjiajs/src/index';


@Component
@Connect(
  state => ({
    order: state.order,
    clientWidth: state.clientWidth,
  }),
  dispatch => ({
    detail: actions.giftDetail
  })
)
export default class OrderReceivedGuide extends riot.Tag {
  static originName = 'order-received-guide'

  get name() {
    return 'order-received-guide'
  }

  get tmpl() { return `<div if="{ opts.order.gift.scene === 'logistics' }" class="received_guide">
  <div class="guide_wrap">
    <div class="received_cont">
      <img class="right_top_corner" src="https://img.91pintuan.com/songli/i.png">
      <div class="head_portrait">
        <img riot-src="{ opts.order.sender.info.headimgurl }" />
      </div>
      <div class="head_nickname">
        <span>{ opts.order.sender.info.nickname }的礼物</span>
      </div>
      <div if="{ opts.order.capacity === 1 }">
        <div class="receive_status">
          <span class="gift_num">礼物已被领取</span> 
          <span class="receive_num">等待商家发货</span>
        </div>
        <div class="receiver_info">
          <div><span>收礼人：</span><span>{ opts.order.receivers[0].consignee }</span></div>
          <div><span>手机号：</span><span>{ opts.order.receivers[0].telephone }</span></div>
          <div><span>地&nbsp;&nbsp;&nbsp;&nbsp;址：</span><span>{ opts.order.receivers[0].address }</span></div>
        </div>
        <div class="btn_continue"> 
          <a href="/gift/{ opts.order.gift.id }">我也要送礼</a>
        </div>
      </div>
      <div if="{ opts.order.capacity > 1 }">
        <div class="receive_status">
          <span class="gift_num">你已领取礼物</span> 
          <span class="receive_num" if="{ opts.order.capacity - opts.order.receivers.length > 0 }">还有{ opts.order.capacity - opts.order.receivers.length }份</span>
          <span class="receive_num" if="{ opts.order.capacity - opts.order.receivers.length === 0 }">礼物已全部被领完</span>
        </div>
        <div class="btn_continue"> 
          <a href="/gift/{ opts.order.gift.id }">我也要送礼</a>
        </div>
        <div class="gift_cover">
          <div class="cover_cont">
            <div class="img_cover" style="height: {(opts.clientWidth - 50)/2}px">
              <img riot-src="{ opts.order.gift.info.cover ? 'http://' + config.phtUri + opts.order.gift.info.cover + app.config.phtStlList5 : app.config.images.GIFT_DEF_COVER }">
            </div>
            <div class="title">
              <span>{ opts.order.gift.info.name }</span>
              <a href="/order/{ opts.order.id }/detail"><img src="https://img.91pintuan.com/songli/client2/white_right.png"></a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <order-interact></order-interact>
  </div>
  <!--Bottom mark-->
  <icon-href theme="{ white }"></icon-href>
</div>

<div if="{ opts.order.gift.scene === 'poi' }" class="received_guide">
  <div class="guide_wrap">
    <div class="received_cont">
      <img class="right_top_corner" src="https://img.91pintuan.com/songli/i.png" />
      <div class="head_portrait">
        <img riot-src="{ opts.order.sender.info.headimgurl }" />
      </div>
      <div class="head_nickname">
        <span>{ opts.order.sender.info.nickname }的礼物</span>
      </div>
      <div class="receive_status">
        <span class="gift_num">你已领取礼物 </span>
      </div>
      <div class="gift_inform">
        <span>已领取礼物使用凭证，使用时请到所选门店，点击立即使用按钮将二维码凭证出示给商家即可。</span>
      </div>
      <div class="user_intr">
        <span><img src="https://img.91pintuan.com/songli/client/vcode-icon.png"></span>
        <span>到店使用时请向商家出示二维码</span>
      </div>
      <div class="btn_group">
        <a href="/order/{ opts.order.id }/received" class="btn_use">立即使用</a>
        <a href="/gift/{ opts.order.gift.id }" class="btn_send">我也要送礼</a>
      </div>
    </div>
    <order-interact></order-interact>
  </div>
  <!--Bottom mark-->
  <icon-href theme="{ white }"></icon-href>
</div>

<div if="{ opts.order.gift.scene === 'wb' }" class="received_guide">
  <div class="guide_wrap">
    <div class="received_cont">
      <img class="right_top_corner" src="https://img.91pintuan.com/songli/i.png" />
      <div class="head_portrait">
        <img riot-src="{ opts.order.sender.info.headimgurl }" />
      </div>
      <div class="head_nickname">
        <span>{ opts.order.sender.info.nickname }送给你一份礼物</span>
      </div>
      <div class="receive_status receive_wb">
        <span class="gift_num">你已领取礼物</span>
        <span class="receive_num" ><a href="/order/{ opts.order.id }/received" >点击查看客服微信</a></span>
      </div>
    </div>
    <div class="gift_cover">
      <div class="cover_cont">
        <div class="img_cover" style="height: {(opts.clientWidth - 50)/2}px">
          <img riot-src="{ opts.order.gift.info.cover ? 'http://' + config.phtUri + opts.order.gift.info.cover + app.config.phtStlList5 : app.config.images.GIFT_DEF_COVER }">
        </div>
        <div class="title">
          <span>{ opts.order.gift.info.name }</span>
          <a href="/order/{ opts.order.id }/detail"><img src="https://img.91pintuan.com/songli/client2/white_right.png"></a>
        </div>
      </div>
    </div>
    <order-interact></order-interact>
  </div>
  <!--Bottom mark-->
  <icon-href theme="{ white }"></icon-href>
</div>

 ` }
  
  onCreate(opts) {
  }
  
  
}