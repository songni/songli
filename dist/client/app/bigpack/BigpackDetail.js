import riot from 'riot';
import route from 'riot-route';
import { View, Connect, onUse } from '../../framework/ninjiajs/src/index';
import actions from './bigpack.actions';

@View
@Connect(
	state => ({
		merchant: state.merchant,
		order: state.bigpack,
		clientWidth: state.clientWidth,
		isUnavailable: state.bigpack && state.bigpack.sender && state.bigpack.sender.id
	}),
	dispatch => ({
		enterBigpackDetail: (next, ctx) => dispatch(actions.enterBigpackDetail(next, ctx))
	})
)
export default class BigpackDetail extends riot.Tag {
	static originName = 'bigpack-detail'
	get name() {
		return 'bigpack-detail'
	}
	get tmpl() {
		//<!-- build:tmpl:begin -->
		return `<router-outlet>
  <div class="bigpack">
    <div class="bigpack_wrap">
      <div class="bigpack_cont" >
        <!--title-->
        <div class="pack_title" style="width: { parent.opts.clientWidth - 24 }px;">
          <span><img riot-src="{ parent.opts.merchant.pubno.head_img }"/></span>
          <span style="width: { parent.opts.clientWidth - 76 }px;">商家{ parent.opts.merchant.pubno.nick_name }发给你一个大礼包 </span>
        </div>
        <!--bigpack order detail-->
        <div class="detail">
          <div class="order_id">
            <span>订单号</span>
            <span>{ parent.opts.order.id }</span>
          </div>
          <div class="order_img" style="width: { parent.opts.clientWidth / 2 + 70 }px; height: { parent.opts.clientWidth / 2 + 70 }px;">
            <img riot-src="{ parent.opts.order.gift && parent.opts.order.gift.info && parent.opts.order.gift.info.cover ? app.config.phtUri + parent.opts.order.gift.info.cover : app.config.images.GIFTSHRAE_DEF_COVER }"/>
            <div class="title_price" style="width: { parent.opts.clientWidth / 2 + 70 }px;">
              <span>{ parent.opts.order.gift.info.name }</span>
              <span>{ $.util.filter.currency(parent.opts.order.gift.info.price) }</span>
            </div>
          </div>
          <div class="order_num">{ parent.opts.order.capacity }份礼物</div>
          <div class="order_btn">
            <button class="btn_end" if="{ parent.opts.isUnavailable }">该大礼包已送出</button>
            <a class="btn_start" if="{ !parent.opts.isUnavailable }" href="{ '/bigpack/' + parent.opts.order.id + '/record' }">开始送礼</a>
          </div>
          <div class="des_info">
            <span>点击开始送礼并完善语音信息</span>
          </div>
        </div>
      </div>
    </div>
    <icon-href theme="white"></icon-href>
    </div>
</router-outlet>
 `
		//<!-- endbuild -->
	}
	@onUse('enterBigpackDetail')
	onCreate(opts) {}
}