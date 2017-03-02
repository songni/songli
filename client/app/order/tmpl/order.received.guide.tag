<div if="{ opts.order.gift.scene === 'logistics' }" class="received_guide">
  <div class="guide_wrap">
    <div class="received_cont">
      <img class="right_top_corner" src="https://img.91pintuan.com/songli/i.png">
      <div class="head_portrait">
        <img riot-src="{ opts.order.sender.info.headimgurl }" />
      </div>
      <div class="head_nickname">
        <span>{ opts.order.sender.info.nickname }的礼物</span>
      </div>
      <div if="{ opts.order.capacity === 1 }">
        <div class="receive_status">
          <span class="gift_num">礼物已被领取</span> 
          <span class="receive_num">等待商家发货</span>
        </div>
        <div class="receiver_info">
          <div><span>收礼人：</span><span>{ opts.order.receivers[0].consignee }</span></div>
          <div><span>手机号：</span><span>{ opts.order.receivers[0].telephone }</span></div>
          <div><span>地&nbsp;&nbsp;&nbsp;&nbsp;址：</span><span>{ opts.order.receivers[0].address }</span></div>
        </div>
        <div class="btn_continue"> 
          <a href="/gift/{ opts.order.gift.id }">我也要送礼</a>
        </div>
      </div>
      <div if="{ opts.order.capacity > 1 }">
        <div class="receive_status">
          <span class="gift_num">礼物已被领取</span> 
          <span class="receive_num">还有{ opts.order.capacity - opts.order.receivers.length }份</span>
        </div>
        <div class="gift_inform">
          <span>你已成功领取{ opts.order.sender.info.nickname }的礼物。等待商家发货吧。不要忘了除了礼物{ opts.order.sender.info.nickname }还对你说了一段话，收到礼物时扫描语音码，听听ta都说了些什么吧。</span>
        </div>
        <div class="btn_continue"> 
          <a href="/gift/{ opts.order.gift.id }">我也要送礼</a>
        </div>
      </div>
    </div>
    <order-interact></order-interact>
  </div>
  <!--Bottom mark-->
  <icon-href theme="{ white }"></icon-href>
</div>

<div if="{ opts.order.gift.scene === 'poi' }" class="received_guide">
  <div class="guide_wrap">
    <div class="received_cont">
      <img class="right_top_corner" src="https://img.91pintuan.com/songli/i.png" />
      <div class="head_portrait">
        <img riot-src="{ opts.order.sender.info.headimgurl }" />
      </div>
      <div class="head_nickname">
        <span>{ opts.order.sender.info.nickname }的礼物</span>
      </div>
      <div class="receive_status">
        <span class="gift_num">你已领取礼物 </span>
        <span class="receive_num color-pink" href="/order/{ opts.order.id }/received" >查看礼物详情</span>
      </div>
      <div class="gift_inform">
        <span>你已成功领取{ opts.order.sender.info.nickname }的礼物。使用时请到你所选择的对应门店，点击立即使用将二维码消费凭证出示给商家，即可领取礼物。</span>
      </div>
      <div class="user_intr">
        <span><img src="https://img.91pintuan.com/songli/client/vcode-icon.png"></span>
        <span>到店使用时请向商家出示二维码</span>
      </div>
      <div class="btn_group">
        <a href="/order/{ opts.order.id }/received" class="btn_use">立即使用</a>
        <a href="/gift/{ opts.order.gift.id }" class="btn_send">我也要送礼</a>
      </div>
    </div>
    <order-interact></order-interact>
  </div>
  <!--Bottom mark-->
  <icon-href theme="{ white }"></icon-href>
</div>