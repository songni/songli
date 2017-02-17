<on-scroll 
  infinite-scroll='{ opts.nextPageCreator(opts.force) }' 
  infinite-scroll-disabled='{ opts.orders.busy }' 
  infinite-scroll-distance='{ 100 }'
  >
  <div class="order_list">
    <a class="order_href" 
      each="{ order in parent.opts.orders.items }" 
      href="{ '/personal/order/' + order.id + '/info' }"
      >
      <div class="order_wrap">
        <div class="order_head">
          <span>
            <img  riot-src="{ order.gift.info.cover ? app.config.phtUri + order.gift.info.cover : app.config.images.GIFTSHRAE_DEF_COVER }">
          </span>
          <span style="width: { parent.parent.opts.clientWidth - 120 }px">{ order.gift.info.name }</span>
        </div>
        <div class="order_main">
          <ul>
            <li>
              <span>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</span>
              <span>{ $.util.currency(order.gift.info.price) }</span>
              <em>x{ order.capacity }</em>
            </li>
            <li>
              <span>支付金额：</span>
              <span>{ $.util.filter.currency(order.gift.info.price * order.capacity) }</span>
            </li>
            <li>
              <span>下单时间：</span>
              <span>{ $.util.filter.date(order.time.add, 'yyyy-MM-dd hh:mm:ss') }</span>
            </li>
          </ul>
        </div>
        <div class="order_foot">
          <span>订单号 { order.serial }</span>
          <span><img src="https://img.91pintuan.com/songli/client/poi-right.png"/></span>
        </div>
      </div>
    </a>
  </div>
</on-scroll>
