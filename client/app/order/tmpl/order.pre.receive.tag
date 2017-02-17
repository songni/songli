<div class="pre_receive">
  <div class="pre_wrap">
    <div class="pre_cont">
      <img class="right_top_corner" src="https://img.91pintuan.com/songli/i.png" />
      <div class="head_portrait">
        <img riot-src="{ opts.order.sender.info.headimgurl }" />
      </div>
      <div class="head_nickname">
        <span>{ opts.order.sender.info.nickname }送给你一份礼物</span>
      </div>
      <div class="receive_status">
        <div if="{ opts.isAvailable }">
          <div if="{ opts.type === 'one2one' }">
            <span class="gift_num">请尽快领取</span>
            <span class="receive_num" if="{ opts.order.gift.scene === 'poi' }">领取后到店使用</span>
            <span class="receive_num" if="{ opts.order.gift.scene === 'logistics' }">领取后将快递配送</span>
          </div>
          <div if="{ opts.type === 'one2many' }">
            <span class="gift_num">还有{ opts.availableCount }份 </span>
            <span class="receive_num">{ opts.receivedCount }人已领取</span>
          </div>
        </div>
        <div if="{ !opts.isAvailable }">
          <div if="{ opts.type === 'one2one' }">
            <span class="gift_num">礼物已被抢完</span>
            <span class="receive_num">{ opts.order.receivers[0].name }</span>
          </div>
          <div if="{ opts.type === 'one2many' }">
            <span class="gift_num">礼物已被抢完</span> <br />
            <span class="receive_num">{ opts.receivedCount }人已领取</span>
          </div>
        </div>
      </div>
      <div class="gift_inform">
        <span>{ opts.order.sender.info.nickname }为你准备了一份礼物：{ opts.order.gift.info.name }。并对你说了一段话，赶快领取吧！</span>
      </div>
      <div class="btn_group">
        <a if="{ opts.isAvailable }" href="/order/{ opts.order.id }/receive" class="btn_receive">领取礼物</a>
        <a if="{ !opts.isAvailable }" href="/gift/{ opts.order.gift.id }" class="btn_send">我也要送礼</a>
        <span if="{ opts.type === 'one2many' && opts.order.gift.scene === 'poi' }">领取后到店使用</span>
      </div>
      
      <order-interact
        if="{ opts.isInteract }"
        order="{ order }"
      ></order-interact>
      
    </div>
  </div>
  <icon-href theme="white"></icon-href>
</div>