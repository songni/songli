import riot from 'riot';
import route from 'riot-route';
import { View, Connect } from '../../framework/ninjiajs/src/index';
import actions from './bigpack.actions';

@View
@Connect(
	state => ({
		merchant: state.merchant,
		order: state.bigpack,
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
		return require('./tmpl/bigpack.detail.tag');
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use((next, ctx) => this.opts.enterBigpackDetail(next, ctx))
	}
}