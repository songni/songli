import riot from 'riot';
import route from 'riot-route';
import actions from './gift.actions';
import { Connect, View, onUse } from '../../framework/ninjiajs/src/index';

@View
@Connect(
	state => ({
		gift: state.gift,
		clientWidth: state.clientWidth
	}),
	dispatch => ({
		enterGiftDetail: (next, ctx) => dispatch(actions.enterGiftDetail(next, ctx))
	})
)
export default class GiftDetail extends riot.Tag {
	static originName = 'gift-detail'

	get name() {
		return 'gift-detail'
	}

	get tmpl() { return `<router-outlet>
	<div class="gift_detail">
		<div class="detail_cont">
			<div class="gift_img">
				<img 
				  riot-src="{ parent.opts.gift.info.cover ? app.config.phtUri + parent.opts.gift.info.cover + app.config.phtStlList2 : app.config.images.GIFT_DEF_COVER }"
				  style=" width: { parent.opts.clientWidth - 28 }px; height: { parent.opts.clientWidth - 28 }px "
				>
			</div>
			<div class="gift_info">
				<p class="name">{ parent.opts.gift.info.name }</p>
				<p class="lead">{ parent.opts.gift.info.lead }</p>
				<div class="receivers">
					<div class="used" if="{ parent.opts.gift.num.pay > 0 }">
						<span><img riot-src="{ '//img.91pintuan.com/songli/icon-herf/gift-box.png'} "/></span>
						<span>{ ( parent.opts.gift.info && parent.opts.gift.info.benedictory && parent.opts.gift.info.benedictory.title) ? 
								parent.opts.gift.info.benedictory.title.replace('{NUM}', (parent.opts.gift.num.receivers || 0)) : '已有' + (parent.opts.gift.num.receivers || 0) + '人收到了礼物' }
						</span>
					</div>
					<div if="{ parent.opts.gift.num.pay <= 0 }"></div>
				</div>
				<div class="price">
					<span>{ $.util.filter.currency(parent.opts.gift.info.price) }</span>
				</div>
			</div>
			<div class="detail_info">
			  <span class="title">礼物详情</span>
				<raw content="{ parent.opts.gift.info.detail }"></raw>
			</div>
			<!--底表logo-->
			<bottom></bottom>
		</div>
		<!-- Start giving gifts to friends -->
		<div class="btn_give" if="{ !parent.opts.gift.num.stock || ((parent.opts.gift.num.stock - parent.opts.gift.num.subpay) > 0) }">
		  <button onclick="{ parent.buy }">购买并赠送</button>
		  <!--
			<a class="fl btn_one" href="{ '/gift/' + parent.opts.gift.id + '/order/record?type=one2one' }">送一人</a>
			<a class="fr btn_more" href="{ '/gift/' + parent.opts.gift.id + '/order/record?type=one2many' }">送多人</a>
			-->
		</div>
		<!-- The gift has been sold out  -->
		<div class="btn_online" if="{ !parent.opts.gift.status.online || ( parent.opts.gift.num.stock != 0 && ((parent.opts.gift.num.stock - parent.opts.gift.num.subpay) <= 0) ) }">
			<a href="javascript:;" disabled="true">抱歉，该商品已售罄</a>
		</div>
	</div>
</router-outlet> ` }

	@onUse('enterGiftDetail')
	onCreate(opts) {}
	
	buy() {
    widgets.Modal.open({
      tag: 'gift-buy-modal',
    })
  }
	
}