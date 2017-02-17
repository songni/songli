<router-outlet>
  <div class="bigpack" style="min-height: { document.body.clientHeight }px;">
    <!--title-->
    <div class="pack_title" style="width: { opts.clientWidth - 24 }px;">
      <span><img riot-src="{ opts.merchant.pubno.head_img }"/></span>
      <span style="width: { opts.clientWidth - 76 }px;">商家{ opts.merchant.pubno.nick_name }发给你一个大礼包 </span>
    </div>
    <!--订单详情-->
    <div class="detail">
      <!--order ID-->
      <div class="order_id">
        <span>订单号</span>
        <span>{ opts.order.id }</span>
      </div>
      <!--order img-->
      <div class="order_img" style="width: { opts.clientWidth / 2 + 70 }px; height: { opts.clientWidth / 2 + 70 }px;">
        <img riot-src="{ opts.order.gift && opts.order.gift.info && opts.order.gift.info.cover ? app.config.phtUri + opts.order.gift.info.cover : 'https://img.91pintuan.com/songli/icon-herf/present_sent_demo.png' }"/>
        <!--order title && price-->
        <div class="title_price" style="width: { opts.clientWidth / 2 + 70 }px;">
          <span class="order_title">{ opts.order.gift.info.name }</span>
          <span class="order_price">{ $.util.currency(opts.order.gift.info.price) }</span>
        </div>
      </div>
      <!--order numbers-->
      <div class="order_num">{ opts.order.capacity }份礼物</div>
      <!--Start giving gifts-->
      <div class="order_btn">
        <button class="btn btn_start btn_end" if="{ opts.isUnavailable }">该大礼包已送出</button>
        <button class="btn btn_start" if="{ !opts.isUnavailable }" href="{ '/bigpack/' + opts.order.id + '/record'">开始送礼</button>
      </div>
      <!--Description information-->
      <div class="des_info">
        <span>点击开始送礼并完善语音信息</span>
      </div>
    </div>
  </div>
  <!--底标-->
  <div class="icon-hrer icon-bigpack">
    <icon-href theme="white"></icon-href>
  </div>
</router-outlet>