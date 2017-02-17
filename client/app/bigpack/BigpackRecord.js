import riot from 'riot';
import route from 'riot-route';
import { View, Connect, Form } from '../../framework/ninjiajs/src/index';
import Wechat from '../../framework/wechat/index';
import actions from './bigpack.actions';

@View
@Form({
	name: {
		maxlength: 20,
		required: true
	}
})
@Connect(
	state => ({
		merchant: state.merchant,
		order: state.order
	}),
	dispatch => ({
		enterBigpackRecord: (next, ctx) => dispatch(actions.enterBigpackRecord(next, ctx))
	})
)
export default class BigpackRecord extends riot.Tag {
	static originName = 'bigpack-record'

	get name() {
		return 'bigpack-record'
	}

	get tmpl() {
		return require('./tmpl/bigpack.record.tag');
	}

	onCreate(opts) {
		this.mixin('router');
		this.$use((next, ctx) => this.opts.enterBigpackRecord(next, ctx))
	}

	async onSubmit(e) {
		e.preventDefault()
		let { dispatch, getState } = app.store;
		let { bigpack } = getState();
		this.opts.submit('bigpackRecordForm')
		if (this.opts.forms.bigpackRecordForm.$invalid) {
			return;
		}

		let res = await Wechat.uploadVoice({
			localId: bigpack.localId,
			isShowProgressTips: 1
		});
		bigpack.serverId = res.serverId;
		dispatch({type: 'bigpack/update', payload: bigpack})
		
		await $.post(`/gift/order/${ bigpack.id }/complete`, bigpack)
		route(`/order/${ bigpack.id }/ready`);
	}
}