<div class="bigpack_record">
  <div class="record_wrap">
    <form class="record_form" ref="bigpackRecordForm" novalidate>
      <div class="user_photo">
        <span><img riot-src=" { opts.user.photo } "></span>
        <span>请开始录音</span>
      </div>
      <div class="big_title_img">
        <div if="{ opts.order.capacity === 1 }"><img src="https://img.91pintuan.com/songli/word_say_to.png" /></div>
        <div if="{ opts.order.capacity > 1 }"><img src="https://img.91pintuan.com/songli/word-zhufu_newyear.png" /></div>
      </div>
      <div if="{ opts.order.capacity === 1 }" class="one2one">
        <div class="name">
          <span><img src="https://img.91pintuan.com/songli/word_send_to.png" /></span>
          <input type="text" placeholder="{ opts.forms.bigpackRecordForm.name.$invalid && opts.forms.bigpackRecordForm.$submitted ? '昵称未填写' : 'Ta的名字' }" ref="name" />
          <p show="{ opts.forms.bigpackRecordForm.name.$error.maxlength && opts.forms.bigpackRecordForm.$submitted }" class="help-block">昵称字数太多.</p>
          <p show="{ opts.forms.bigpackRecordForm.name.$error.required && opts.forms.bigpackRecordForm.$submitted }" class="help-block">昵称未填写.</p>
        </div>
      </div>
      <div>
        <order-record-voice store-field="bigpack"></gift-record-voice>
      </div>
      <div class="recoding_desc">
        <div if="{ (opts.recordState.stop || opts.recordState.start) && (opts.order.gift && opts.order.gift.scene && opts.order.gift.scene === 'poi' || opts.order.gift.status.poi) }">
          <span>录制一段语音，收礼人到店领取该礼物时</span>
          <span>即可听到你的话</span>
        </div>
        <div if="{ (opts.recordState.stop || opts.recordState.start) && (opts.order.gift && opts.order.gift.scene && opts.order.gift.scene === 'logistics' || opts.order.gift.status.logistics)  }">
          <span>录制一段语音，收礼人收到礼物后</span>
          <span>扫描语音码，即可听到你的话</span>
        </div>
      </div>
    </form>
  </div>
</div>