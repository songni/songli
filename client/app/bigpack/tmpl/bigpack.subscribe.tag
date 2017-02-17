<div ui-view="">
  <div class="bigpack_sunscribe">
    <!--title-->
    <div class="pack_title" style="width: { opts.clientWidth - 24 }px;">
      <span><img riot-src="{ opts.merchant.pubno.head_img }"/></span>
      <span style="width: { opts.clientWidth - 76 }px;">商家{ opts.merchant.pubno.nick_name }发给你一个大礼包 </span>
    </div>
    <!--merchant code-->
    <div class="mer_code">
      <div class="explain">
        <span>请长按二维码关注商家公号</span>
        <span>获取该大礼包</span>
      </div>
      <!--商家公号名称-->
      <div class="merchant_name">
        <span>{ opts.merchant.pubno.nick_name }</span>
      </div>
      <!--二维码-->
      <div style="width: { opts.clientWidth/2 + 50 }px; height: { opts.clientWidth / 2 + 50 }px;" class="merchant_code">
        <img riot-src="{ opts.order.qrcode.bigpack_sub_src }" alt="" />
        
        <!--四边圆角-->
        <div class="radius">
          <img ng-src="https://img.91pintuan.com/songli/client/icon/top.png"/>
          <img ng-src="https://img.91pintuan.com/songli/client/icon/right.png"/>
          <img ng-src="https://img.91pintuan.com/songli/client/icon/bottom.png"/>
          <img ng-src="https://img.91pintuan.com/songli/client/icon/left.png"/>
        </div>
      </div>
    </div>
  </div>
</div>
<!--底标-->
<div class="icon-hrer icon-bigpack">
  <icon-href theme="white"></icon-href>
</div>