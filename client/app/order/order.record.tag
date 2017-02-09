<form class="record" ref="orderRecordForm" novalidate>
  <div class="sound-record">
    <!--大礼包-->
    <div if="{ opts.order.status.bigpack }" class="bigpack_recoding">
      <div class="start_recoding">
        <img if="{ opts.user.photo }" riot-src="{ opts.user.photo }" alt="" />
        <span>请开始录音</span>
      </div>
    </div>
    <!--送单人-->
    <div if="{ opts.order.type === 'one2one' }"  class="single">
      <img src="https://img.91pintuan.com/songli/word_send_to.png" />
      <input type="text" ref="name" placeholder="Ta的名字"  />
      <p if="{ opts.forms.orderRecordForm.$submitted && opts.forms.orderRecordForm.name.$error.required }" class="help-block" >昵称未填写</p>
      <p if="{ opts.forms.orderRecordForm.$submitted && opts.forms.orderRecordForm.name.$error.maxlength }" class="help-block" >收货人昵称过长</p>
      <p if="{ opts.forms.orderRecordForm.$submitted && opts.forms.orderRecordForm.name.$error.minlength }" class="help-block" >收货人昵称过短</p>
    </div>
    <!--送多人-->
    <div if="{ opts.order.type === 'one2many' }" class="multiple">
      <img src="https://img.91pintuan.com/songli/gift_copies-more.png" />
      <div class="input-group">
        <span class="input-left">
          <button type="button" onclick="{ reduCapacity }" class="input-lr" >
            <span> - </span>
          </button>
        </span>
        <span class="input-middle">
          <input type="number" ref="capacity" value="{ opts.order.capacity }">
        </span>
        <span class="input-right">
          <button type="button" onclick="{ incrCapacity }" class="input-lr" data-type="plus" >
            <span> + </span>
          </button>
        </span>
        <p if="{ opts.forms.orderRecordForm.$submitted && opts.forms.orderRecordForm.capacity.$error.min }" class="help-block">礼物份数至少是2份</p>
      </div>
    </div>
    <!--录音-->
    <div class="voice-box">
      <div class="voice-process">
        <div if="{ opts.order.type === 'one2one' }"><img src="https://img.91pintuan.com/songli/word_say_to.png" /></div>
        <div if="{ opts.order.type === 'one2many' }"><img src="https://img.91pintuan.com/songli/word-zhufu_newyear.png" /></div>
        <order-record-timer interval="1000" countdown="60" autostart="false">
        </order-record-timer>
      </div>
      <!-- 开始录音 -->
      <div class="record-before" if="{ opts.recordState.stop }">
        <img src="https://img.91pintuan.com/songli/record.png" onclick="{ record }" />
        <span class="hint">点击开始录音</span>
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
        <div class="right-button" onclick="{ onSubmit }">
          <img src="https://img.91pintuan.com/songli/next_step.png" />
          <label class="hint">下一步</label>
        </div>
      </div>
    </div>
    <!--说明-->
    <div class="recoding_desc">
      <div if="{ (opts.recordState.stop || opts.recordState.start) && (opts.order.gift && opts.order.gift.scene && opts.order.gift.scene === 'poi' || opts.gift.status.poi) }">
        <span>录制一段语音，收礼人到店领取该礼物时</span>
        <span>即可听到你的话</span>
      </div>
      <div if="{ (opts.recordState.stop || opts.recordState.start) && (opts.order.gift && opts.order.gift.scene && opts.order.gift.scene === 'logistics' || opts.gift.status.logistics)  }">
        <span>录制一段语音，收礼人收到礼物后</span>
        <span>扫描语音码，即可听到你的话</span>
      </div>
    </div>
  </div>
</form>
