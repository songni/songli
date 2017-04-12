import riot from 'riot';
import route from 'riot-route';
import actions from '../order/order.actions'
import { View, Connect, onUse } from '../../framework/ninjiajs/src/index';

@View
@Connect(
	state => ({
		merchant: state.merchant,
		order: state.bigpack,
		clientWidth: state.clientWidth,
	})
)
export default class BigpackSubscribe extends riot.Tag {
	static originName = 'bigpack-subscribe'

	get name() {
		return 'bigpack-subscribe'
	}

	get tmpl() { return `<div class="bigpack_subscribe">
  <div class="subscribe_wrap">
    <div class="subscribe_cont">
      <div class="pack_title" style="width: { opts.clientWidth - 24 }px;">
        <span><img riot-src="{ opts.merchant.pubno.head_img }"/></span>
        <span style="width: { opts.clientWidth - 76 }px;">商家{ opts.merchant.pubno.nick_name }发给你一个大礼包 </span>
      </div>
      <div class="mer_code">
        <div class="explain">
          <span>请长按二维码关注商家公号</span>
          <span>获取该大礼包</span>
        </div>
        <div class="merchant_name">
          <span>{ opts.merchant.pubno.nick_name }</span>
        </div>
        <div class="merchant_code" style="width: { opts.clientWidth/2 + 50 }px; height: { opts.clientWidth / 2 + 50 }px;">
          <img riot-src="{ opts.order.qrcode.bigpack_sub_src }" alt="" />
          <div class="radius">
            <img src="https://img.91pintuan.com/songli/client/icon/top.png"/>
            <img src="https://img.91pintuan.com/songli/client/icon/right.png"/>
            <img src="https://img.91pintuan.com/songli/client/icon/bottom.png"/>
            <img src="https://img.91pintuan.com/songli/client/icon/left.png"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <icon-href theme="white"></icon-href>
</div> ` }

	onCreate(opts) {
	}
}