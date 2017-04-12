<div class="bigpack_record">
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
</div>