<div class="order_pay">
  <div class="payment">
    <div class="pay_info">
      <div class="pay_nl">
        <span>{ opts.gift.info.name }</span>
        <span>{ opts.gift.info.lead }</span>
      </div>
      <div class="pay_num">
        <span>{ $.util.filter.currency(opts.gift.info.price) }</span>
        <span>{ opts.order.capacity }份</span>
      </div>
    </div>
    <div class="pay_total">
      <span>总 计</span>
      <span>{ $.util.filter.currency(opts.gift.info.price * opts.order.capacity) }</span>
    </div>
    <!--/total-pay-->
    <div class="pay_now">
      <a class="pay_btn" onclick="{ opts.wxPay.bind(this) }" disabled="{ submiting }">{ submiting ? '支付中...' : '支付' }</a>
    </div>
  </div>
</div>