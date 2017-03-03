import riot from 'riot';
import route from 'riot-route';
import { Connect, Component } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';

@Component
@Connect(
  state => ({
	  order: state.order
  }),
  dispatch => ({
    share: actions.shareOrder
  })
)
export default class OrderReadyOne2Many extends riot.Tag {
  static originName = 'order-ready-one2many'
  get name() {
    return 'order-ready-one2many'
  }
  get tmpl() {
    return `
      <div class="ready_multi">
        <div class="multi_wrap">
          <div class="multi_cont">
            <img class="right_top_corner" src="https://img.91pintuan.com/songli/i.png" />
            <div class="head_portrait">
              <img riot-src="{ opts.order.sender.info.headimgurl }"/>
            </div>
            <div class="head_nickname">
              <span>{ opts.order.sender.info.nickname }的礼物</span>
            </div>
            <div class="receive_status">
              <div if="{ !opts.order.receivers || !opts.order.receivers.length }">
                <span class="gift_num">{ opts.order.capacity }份礼物已备好</span>
                <span class="receive_num">开始送礼吧</span>
              </div>
              <div if="{ opts.order.receivers && opts.order.receivers.length && opts.order.receivers.length != opts.order.capacity }">
                <span class="gift_num">还有{ opts.order.capacity - opts.order.receivers.length }份</span><br/>
                <span class="receive_num">{ opts.order.receivers.length }人已领取</span>
              </div>
              <div if="{ opts.order.receivers && opts.order.receivers.length && opts.order.receivers.length === opts.order.capacity }">
                <span class="gift_num">礼物已被抢完</span><br />
                <span class="receive_num">{ opts.order.receivers.length }人已领取</span>
              </div>
            </div>
            <div class="gift_inform">
              <span>您已成功购买{ opts.order.capacity }份{ opts.order.gift.info.name },发至到微信好友/微信群或朋友圈,开始送礼吧！</span>
            </div>
            <div class="btn_receive">
              <!--礼物领取中-->
              <a href="javascript:void(0)" 
                if="{ !opts.order.receivers || !opts.order.receivers.length || (opts.order.receivers.length && opts.order.receivers.length !== opts.order.capacity) }"
                onclick="{ opts.share }" 
                class="{ btn_null : opts.order.receivers.length === opts.order.capacity }"
                class="btn-fill">
                  { opts.order.receivers && opts.order.receivers.length ? '继续送礼' : '开始送礼' }
              </a>
              <!--礼物被抢完时-->
              <a href="/gift/list" class="btn_continue"
                if="{ opts.order.receivers && opts.order.receivers.length && opts.order.receivers.length === opts.order.capacity }">继续送礼
              </a>
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

  onCreate(opts) {
  }
}