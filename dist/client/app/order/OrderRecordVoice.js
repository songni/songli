import riot from 'riot';
import route from 'riot-route';
import { Component, Connect } from '../../framework/ninjiajs/src/index';
import Wechat from '../../framework/wechat/index';

@Component
@Connect(
	state => ({
		recordState: state.record,
		order: state.order,
		bigpack: state.bigpack
	})
)
export default class OrderRecordVoice extends riot.Tag {
	static originName = 'order-record-voice'
	get name() {
		return 'order-record-voice'
	}
	get tmpl() { return `<div class="voice-box">
	<div class="voice-process">
		<div if="{ opts.order.type === 'one2one' }"><img src="//img.91pintuan.com/songli/word_say_to.png" /></div>
		<div if="{ opts.order.type === 'one2many' }"><img src="//img.91pintuan.com/songli/word-zhufu_newyear.png" /></div>
		<order-record-timer interval="1000" countdown="60" autostart="false">
		</order-record-timer>
	</div>
	<!-- 开始录音 -->
	<div class="record-before" if="{ opts.recordState.stop }">
		<img src="//img.91pintuan.com/songli/client2/recode_start.png" onclick="{ record }" />
		<span class="hint">点击按钮开始录音</span>
	</div>
	<!-- 结束录音 -->
	<div class="record-before" if="{ opts.recordState.start }">
		<img src="//img.91pintuan.com/songli/client2/recode_stop.png" onclick="{ stop }" />
		<span class="hint">再次点击结束录音</span>
	</div>
	<!-- 调试录音 -->
	<div class="record-after" if="{ opts.recordState.record }">
	
		<div if="{ opts.recordState.playVoice }"  class="btn_play" >
			<img src="//img.91pintuan.com/songli/client2/recode_play.png" onclick="{ playVoice }">
			<label class="hint">播放</label>
		</div>
		
		<div if="{ opts.recordState.stopVoice }" class="btn_play" >
      <img src="//img.91pintuan.com/songli/client2/pause_play.png" onclick="{ suspend }">
      <label class="hint">暂停</label>
    </div>
		
		<div class="btn_reset" >
			<img src="//img.91pintuan.com/songli/client2/recode_reset.png" onclick="{ rerecord }">
			<label class="hint">重录</label>
		</div>
		
		<div class="btn_bigpack" if="{ opts.bigpack && opts.bigpack.gift && opts.bigpack.gift.id }" onclick="{ parent.onSubmit.bind(parent) }">
			<button>下一步</button>
		</div>
	</div>
</div> ` }
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
			record: false,
			playVoice: true,
			stopVoice: false
		}})
	}

	async stop() {
		let { dispatch } = app.store
		let me = this;
		let res = await Wechat.stopRecord();
		me.tags['order-record-timer'].trigger('timer:stop');
		dispatch({type: `${ this.opts.storeField }/update`, payload: { localId: res.localId }})
    dispatch({type: 'record/update', payload: {
      start: false,
      stop: false,
      record: true,
      playVoice: true,
      stopVoice: false
    }})
	}

	rerecord() {
		let { dispatch } = app.store
		this.tags['order-record-timer'].trigger('timer:init');
		dispatch({ type: 'record/reset' });
	}

	playVoice() {
	  let { dispatch } = app.store
		let order = app.store.getState().order;
		this.tags['order-record-timer'].trigger('timer:play');
		Wechat.playVoice({ localId: order.localId});
		dispatch({ type: 'record/update', payload: {stopVoice: true, playVoice: false} });
	}
	
	suspend() {
	  let order = app.store.getState().order;
	  let { dispatch } = app.store;
    this.tags['order-record-timer'].trigger('timer:pause');
    dispatch({ type: 'record/update', payload: {stopVoice: false, playVoice: true} });
	}
}