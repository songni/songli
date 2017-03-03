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
		return `<div class="voice-box">
	<div class="voice-process">
		<div if="{ opts.order.type === 'one2one' }"><img src="https://img.91pintuan.com/songli/word_say_to.png" /></div>
		<div if="{ opts.order.type === 'one2many' }"><img src="https://img.91pintuan.com/songli/word-zhufu_newyear.png" /></div>
		<order-record-timer interval="1000" countdown="60" autostart="false">
		</order-record-timer>
	</div>
	<!-- 开始录音 -->
	<div class="record-before" if="{ opts.recordState.stop }">
		<img src="https://img.91pintuan.com/songli/record.png" onclick="{ record }" />
		<span class="hint">点击开始录音1</span>
	</div>
	<!-- 结束录音 -->
	<div class="record-before" if="{ opts.recordState.start }">
		<img src="https://img.91pintuan.com/songli/re_stop.png" onclick="{ stop }" />
		<span class="hint">结束录音</span>
	</div>
	<!-- 调试录音 -->
	<div class="record-after" if="{ opts.recordState.record }">
		<div class="left-button" onclick="{ playVoice }">
			<img src="https://img.91pintuan.com/songli/play_red.png" />
			<label class="hint">播放</label>
		</div>
		<div class="left-button" onclick="{ rerecord }">
			<img src="https://img.91pintuan.com/songli/re_record.png" />
			<label class="hint">重录</label>
		</div>
		<div class="right-button" onclick="{ parent.onSubmit.bind(parent) }">
			<img src="https://img.91pintuan.com/songli/next_step.png" />
			<label class="hint">下一步</label>
		</div>
	</div>
</div> `
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