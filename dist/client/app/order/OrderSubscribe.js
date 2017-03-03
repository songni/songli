import riot from 'riot';
import route from 'riot-route';
import { Connect, View, onUse } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';

@View
@Connect(
	state => ({
		clientWidth: state.clientWidth,
		order: state.order,
		qrcode: state.qrForSubscribe
	}),
	dispatch => ({
		enterOrderSubscribe: (next, ctx) => dispatch(actions.enterOrderSubscribe(next, ctx))
	})
)
export default class OrderSubscribe extends riot.Tag {
	static originName = 'order-subscribe'
	
	get name() {
		return 'order-subscribe'
	}

	get tmpl() {
		//<!-- build:tmpl:begin -->
		return `<div class="subscribe">
  <div class="subscribe_wrap">
    <div class="subscribe_cont">
      <div class="gift_info">
        <div class="info">
          <div class="title"> 
            <span><img riot-src="{ app.config.phtUri + opts.order.gift.info.cover }"></span>
            <span>礼品</span>
            <span >{ opts.order.gift.info.name }</span>
          </div>
        </div>
        <div class="step">
          <img src="https://img.91pintuan.com/songli/client/receive-step-2.png" alt="" />
        </div>
      </div>
      <div class="guidance">
        <span>长按二维码关注公号</span>
        <span>公号将会发送礼物消费凭证</span>
      </div>
      <div class="merchant_code" style="width: { opts.clientWidth / 2 + 40 }px; height: { opts.clientWidth / 2 + 40 }px;">
        <!--商家二维码-->
        <div class="code" style="width: { opts.clientWidth / 2 + 40 }px;">
          <img if="{ opts.qrcode }" riot-src="{ 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + opts.qrcode }"/>
        </div>
        <div class="radius">
          <img src="https://img.91pintuan.com/songli/client/top.png"/>
          <img src="https://img.91pintuan.com/songli/client/right.png"/>
          <img src="https://img.91pintuan.com/songli/client/bottom.png"/>
          <img src="https://img.91pintuan.com/songli/client/left.png"/>
        </div>
      </div>
      <div class="past">
        <span>如已关注，公号已经发送</span>
      </div>
    </div>
  </div>
  <icon-href theme="white"></icon-href>
</div> `
		//<!-- endbuild -->
	}

	@onUse('enterOrderSubscribe')
	onCreate(opts) {
	}

}