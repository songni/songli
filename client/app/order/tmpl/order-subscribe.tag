<div class="subscribe">
  <div class="subscribe_wrap">
    <div class="subscribe_cont">
      <div class="gift_info">
        <div class="info">
          <div class="title"> 
            <span><img riot-src="{ app.config.phtUri + opts.order.gift.info.cover }"></span>
            <span style=" width: { (opts.clientWidth-24)*0.85 - 60 }px;" >{ opts.order.gift.info.name }</span>
          </div>
        </div>
        <div class="step">
          <img src="https://img.91pintuan.com/songli/client/receive-step-2.png" alt="" />
        </div>
      </div>
      <div class="guidance">
        <span>长按二维码关注公号</span>
        <span>获取礼物领取凭证</span>
      </div>
      <div class="merchant_code" style="width: { opts.clientWidth / 2 + 40 }px; height: { opts.clientWidth / 2 + 40 }px;">
        <!--商家二维码-->
        <div class="code" style="width: { opts.clientWidth / 2 + 40 }px;">
          <img if="{ opts.qrcode }" riot-src="{ 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + opts.qrcode }"/>
        </div>
        <div class="radius">
          <img src="https://img.91pintuan.com/songli/client/tops.png"/>
          <img src="https://img.91pintuan.com/songli/client/right.png"/>
          <img src="https://img.91pintuan.com/songli/client/bottom.png"/>
          <img src="https://img.91pintuan.com/songli/client/left.png"/>
        </div>
      </div>
      <div class="past"></div>
    </div>
  </div>
  <icon-href theme="white"></icon-href>
</div>