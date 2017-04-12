import riot from 'riot';
import route from 'riot-route';
import { View, Connect, Form, onUse } from '../../framework/ninjiajs/src/index';
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
		order: state.bigpack,
		user: state.user,
		recordState: state.record,
		clientHeight: state.clientHeight
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
		return require('./tmpl/bigpack-record.tag');
	}

	@onUse('enterBigpackRecord')
	onCreate(opts) {}

	async onSubmit(e) {
		try {
			e.preventDefault()
			let { dispatch, getState } = app.store;
			let { bigpack, user } = getState();
			this.opts.submit('bigpackRecordForm')

			if (this.opts.forms.bigpackRecordForm.$invalid) {
				return;
			}

			let res = await Wechat.uploadVoice({
				localId: bigpack.localId,
				isShowProgressTips: 1
			});
			bigpack.serverId = res.serverId;
			if (bigpack.capacity === 1) {
				bigpack.name = this.refs['name'].value;
			}
			await $.post(`/gift/order/${ bigpack.id }/complete`, bigpack)
			bigpack.sender = user;
			dispatch({type: 'order/update', payload: bigpack})
			let { order } = getState();
			route(`/order/${ bigpack.id }/ready`);
		} catch (e) {
			widgets.Alert.add('danger', e.message, 2000);
		}
	}
}