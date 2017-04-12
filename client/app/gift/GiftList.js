import riot from 'riot';
import route from 'riot-route';
import actions from './gift.actions';
import { Connect, View, onUse } from '../../framework/ninjiajs/src/index';

@View
@Connect(state => ({
	gifts: state.gifts,
	clientWidth: state.clientWidth
}), dispatch => ({
	nextPage: () => dispatch(actions.nextPage()),
	enterGiftList: (next, ctx) => dispatch(actions.enterGiftList(next, ctx))
}))
export default class GiftList extends riot.Tag {
	static originName = 'gift-list'
	get name() {
		return 'gift-list'
	}
	get tmpl() {
		return require('./tmpl/gift-list.tag');
	}

	@onUse('enterGiftList')
	onCreate(opts) {
	}
}