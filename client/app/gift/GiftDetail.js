import riot from 'riot';
import route from 'riot-route';
import actions from './gift.actions';
import { connect, view } from '../../framework/ninjiajs/src/index';

@view
@connect(state => ({
	gift: state.gift,
	clientWidth: state.clientWidth
}))
export default class GiftDetail extends riot.Tag {
	static originName = 'gift-detail'
	get name() {
		return 'gift-detail'
	}
	get tmpl() {
		return require('./gift.detail.tag');
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse)
	}

	async onUse(next, ctx) {
		await app.store.dispatch(actions.getGiftById(ctx.req.params.id));
		next();
	}
}