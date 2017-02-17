import riot from 'riot';
import route from 'riot-route';
import actions from './gift.actions';
import { Connect, View } from '../../framework/ninjiajs/src/index';

@View
@Connect(state => ({
	gift: state.gift,
	clientWidth: state.clientWidth,
	suborders: state.suborders
}), dispatch => ({
	enterGiftShare: ctx => dispatch(actions.enterGiftShare(ctx))
}))
export default class GiftShare extends riot.Tag {
	static originName = 'gift-share'
	get name() {
		return 'gift-share'
	}
	get tmpl() {
		return require('./tmpl/gift.share.tag');
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(async (next, ctx) => {
			await this.opts.enterGiftShare(ctx);
			next();
		})
	}

	getSuborderInfo(gift, suborder) {
		if (gift && gift.info && gift.info.benedictory && gift.info.benedictory.content) {
			return gift.info.benedictory.content.replace('{RECEIVER}', (suborder.name).slice(0, 1) + '** ' || (suborder.consignee).slice(0, 1) + '** ')
		}
		return (( suborder.name && (suborder.name).slice(0, 1) || (suborder.consignee && (suborder.consignee).slice(0, 1) )) + '** 收到了礼物')
	}
}