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

	get tmpl() { return `<div class="bigpack_record">
  <form class="record_form" ref="bigpackRecordForm" novalidate>
    <div if="{ opts.order.capacity === 1 }" class="one2one">
      <div class="name">
        <span>送给</span>
        <input type="text" placeholder="{ opts.forms.bigpackRecordForm.name.$invalid && opts.forms.bigpackRecordForm.$submitted ? '昵称未填写' : 'Ta的名字' }" ref="name" />
        <p show="{ opts.forms.bigpackRecordForm.name.$error.maxlength && opts.forms.bigpackRecordForm.$submitted }" class="help-block">昵称字数太多.</p>
        <p show="{ opts.forms.bigpackRecordForm.name.$error.required && opts.forms.bigpackRecordForm.$submitted }" class="help-block">昵称未填写.</p>
      </div>
    </div>
    <div class="voice_box">
      <span class="title">录制语音祝福</span>
      <order-record-voice store-field="bigpack"></gift-record-voice>
    </div>
    <div class="bigpack_detail">
      <div class="info">
        <img riot-src="{ opts.order.gift.info.cover ? app.config.phtUri + opts.order.gift.info.cover + app.config.phtStlList4 : app.config.images.GIFT_DEF_COVER }">
        <span>{ opts.order.gift.info.name }</span>
      </div>
      <div class="num">
        <span>数量</span>
        <span>{ opts.order.capacity }份</span>
      </div>
    </div>
  </form>
</div> ` }

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