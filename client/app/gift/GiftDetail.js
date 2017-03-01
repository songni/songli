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

	get tmpl() {
		return require('./tmpl/gift.detail.tag');
	}

	@onUse('enterGiftDetail')
	onCreate(opts) {}
}