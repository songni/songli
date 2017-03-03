import riot from 'riot';
import route from 'riot-route';
import actions from './gift.actions';
import { Connect, View, onUse } from '../../framework/ninjiajs/src/index';

@View
@Connect(state => ({
	gift: state.gift,
	clientWidth: state.clientWidth,
	suborders: state.suborders,
	receivedCount: state.suborders.length
}), dispatch => ({
	enterGiftShare: (next, ctx) => dispatch(actions.enterGiftShare(next, ctx))
}))
export default class GiftShare extends riot.Tag {
	static originName = 'gift-share'
	get name() {
		return 'gift-share'
	}
	get tmpl() {
		//<!-- build:tmpl:begin -->
		return `<div class="gift_share">
  <div class="img_bg" style="width: { opts.clientWidth - 20 }px;">
    <img src="https://img.91pintuan.com/songli/icon-herf/img-share-bg.png" />
  </div>
  <div class="share_box">
    <div class="share_head">
      <div class="gift_img">
        <img riot-src="{ opts.gift.info.cover ? app.config.phtUri + opts.gift.info.cover : app.config.images.GIFTSHRAE_DEF_COVER }">
      </div>
    </div>
    <div class="share_gift_name">
      <span>{ opts.gift.info.name }</span>
    </div>
    <div class="share_main">
      <div class="main_top">
        <span><img src="https://img.91pintuan.com/songli/icon-herf/gift-box.png" /></span>
        <span>{ (opts.gift.info && opts.gift.info.benedictory && opts.gift.info.benedictory.title) ? 
          opts.gift.info.benedictory.title.replace('{NUM}', opts.receivedCount) : '已有' + opts.receivedCount + '人收到了礼物' }
        </span>
      </div>
      
      <div class="main_bottom">
        <imarquee direction="down" height="200" gap="40" speed="3000" items="{ opts.suborders }">
          <ul class="scroll_box" id="marquee_content">
            <li each="{ suborder in items }">
              <img src="{ suborder.headimgurl }" />
              <span>{ parent.parent.getSuborderInfo(opts.gift, suborder) }</span>
            </li>
          </ul>
        </imarquee>
      </div>
    </div>
    <div class="share_foot">
      <a href="/gift/{ opts.gift.id }">我也要送礼</a>
    </div>    
  </div>
  
  <icon-href theme="white"></icon-href>
</div>
 `
		//<!-- endbuild -->
	}

	@onUse('enterGiftShare')
	onCreate(opts) {}

	getSuborderInfo(gift, suborder) {
		if (gift && gift.info && gift.info.benedictory && gift.info.benedictory.content) {
			return gift.info.benedictory.content.replace('{RECEIVER}', (suborder.name).slice(0, 1) + '** ' || (suborder.consignee).slice(0, 1) + '** ')
		}
		return (( suborder.name && (suborder.name).slice(0, 1) || (suborder.consignee && (suborder.consignee).slice(0, 1) )) + '** 收到了礼物')
	}
}