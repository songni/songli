import riot from 'riot';
import route from 'riot-route';
import actions from './gift.actions';
import { connect, view } from '../../framework/ninjiajs/src/index';

@view
@connect(state => ({
	gifts: state.gifts,
	clientWidth: state.clientWidth
}), dispatch => ({
	nextPage: () => dispatch(actions.nextPage()),
	enterGiftList: () => dispatch(actions.enterGiftList())
}))
export default class GiftList extends riot.Tag {
	static originName = 'gift-list'
	get name() {
		return 'gift-list'
	}
	get tmpl() {
		return require('./gift.list.tag');
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse)
	}

	async onUse(next) {
		await this.opts.enterGiftList();
		next();
	}

	async onLink(e) {
		route('/gift/' + e.item.gift.id);
	}
}