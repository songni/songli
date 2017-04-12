<div class="voice-box">
	<div class="voice-process">
		<div if="{ opts.order.type === 'one2one' }"><img src="https://img.91pintuan.com/songli/word_say_to.png" /></div>
		<div if="{ opts.order.type === 'one2many' }"><img src="https://img.91pintuan.com/songli/word-zhufu_newyear.png" /></div>
		<order-record-timer interval="1000" countdown="60" autostart="false">
		</order-record-timer>
	</div>
	<!-- 开始录音 -->
	<div class="record-before" if="{ opts.recordState.stop }">
		<img src="https://img.91pintuan.com/songli/client2/recode_start.png" onclick="{ record }" />
		<span class="hint">点击按钮开始录音</span>
	</div>
	<!-- 结束录音 -->
	<div class="record-before" if="{ opts.recordState.start }">
		<img src="https://img.91pintuan.com/songli/client2/recode_stop.png" onclick="{ stop }" />
		<span class="hint">再次点击结束录音</span>
	</div>
	<!-- 调试录音 -->
	<div class="record-after" if="{ opts.recordState.record }">
	
		<div if="{ opts.recordState.playVoice }"  class="btn_play" >
			<img src="https://img.91pintuan.com/songli/client2/recode_play.png" onclick="{ playVoice }">
			<label class="hint">播放</label>
		</div>
		
		<div if="{ opts.recordState.stopVoice }" class="btn_play" >
      <img src="https://img.91pintuan.com/songli/client2/pause_play.png" onclick="{ suspend }">
      <label class="hint">暂停</label>
    </div>
		
		<div class="btn_reset" >
			<img src="https://img.91pintuan.com/songli/client2/recode_reset.png" onclick="{ rerecord }">
			<label class="hint">重录</label>
		</div>
		
		<div class="btn_bigpack" if="{ opts.bigpack && opts.bigpack.gift && opts.bigpack.gift.id }" onclick="{ parent.onSubmit.bind(parent) }">
			<button>下一步</button>
		</div>
	</div>
</div>