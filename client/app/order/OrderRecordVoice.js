import riot from 'riot';
import route from 'riot-route';
import { Component, Connect } from '../../framework/ninjiajs/src/index';
import Wechat from '../../framework/wechat/index';

@Component
@Connect(
	state => ({
		recordState: state.record,
		order: state.order
	})
)
export default class OrderRecordVoice extends riot.Tag {
	static originName = 'order-record-voice'
	get name() {
		return 'order-record-voice'
	}
	get tmpl() {
		//<!-- build:tmpl:begin -->
		return require('./tmpl/order-record-voice.tag')
		//<!-- endbuild -->
	}
	onCreate(opts) {
		if (!opts.storeField) {
			opts.storeField = 'order';
		}
		this.on('mount', this.onMount.bind(this))
	}
	onMount() {
		this.tags['order-record-timer'].trigger('timer:init');
	}

	async record() {
		let { dispatch } = app.store
		await Wechat.startRecord();
		this.tags['order-record-timer'].trigger('timer:start');
		dispatch({type: 'record/update', payload: {
			start: true,
			stop: false,
			record: false
		}})
	}

	async stop() {
		let { dispatch } = app.store
		let me = this;
		let res = await Wechat.stopRecord();
		me.tags['order-record-timer'].trigger('timer:stop');
		dispatch({type: `${ this.opts.storeField }/update`, payload: { localId: res.localId }})
		dispatch({type: 'record/update', payload: { start: false, record: true }})
	}

	rerecord() {
		let { dispatch } = app.store
		this.tags['order-record-timer'].trigger('timer:init');
		dispatch({ type: 'record/reset' });
	}

	playVoice() {
		let order = app.store.getState().order;
		this.tags['order-record-timer'].trigger('timer:play');
		Wechat.playVoice({ localId: order.localId});
	}
}