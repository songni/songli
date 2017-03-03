<on-scroll 
  infinite-scroll='{ opts.nextPage }' 
  infinite-scroll-disabled='{ opts.gifts.busy }' 
  infinite-scroll-distance='{ 100 }'
  >
  <div class="gift-list">
    <a class="list_item fl" 
      each="{ gift in parent.opts.gifts.items }" 
      href="/gift/{ gift.id }"
      style="width: { parent.parent.opts.clientWidth/2}px;"
      >
      <div class="list_img" style="width: { parent.parent.opts.clientWidth/2}px; height: { parent.parent.opts.clientWidth/2  -12 }px;" >
        <img 
          riot-src="{ gift.info.cover ? 'http://' + config.phtUri + gift.info.cover : app.config.images.GIFT_DEF_COVER }" 
          if="{ gift.info.cover }" 
          style="width: { parent.parent.opts.clientWidth/2 -12 }px; height: { parent.parent.opts.clientWidth/2  -12 }px;"
        >
      </div>
      <div class="gift_name" style="width: { parent.parent.opts.clientWidth/2 -12 }px;">
				<span>{ gift.info.name }</span>
      </div>
      <div class="gift_price" style="width: { parent.parent.opts.clientWidth/2 -12 }px;">
        <span>{ $.util.filter.currency(gift.info.price) }</span>
      </div>
    </a>
  </div>
</on-scroll>
