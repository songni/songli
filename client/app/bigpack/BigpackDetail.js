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
		return require('./tmpl/bigpack.detail.tag');
	}
	@onUse('enterBigpackDetail')
	onCreate(opts) {}
}