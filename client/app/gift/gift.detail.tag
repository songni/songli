<router-outlet>
	<div class="gift_detail">
		<div class="detail_cont">
			<div class="gift_img"> 
				<img 
				  if="{ parent.opts.gift.info.cover }"
				  riot-src="{ 'http://' + config.phtUri + parent.opts.gift.info.cover }"
				  style=" width: { parent.opts.clientWidth - 28 }px; height: { parent.opts.clientWidth - 28 }px "
				>
				<img 
				  if="{ !parent.opts.gift.info.cover }"
				  riot-src="{ 'https://img.91pintuan.com/songli/icon-herf/present_sent_demo.png' }"
				  style=" width: { parent.opts.clientWidth - 28 }px; height: { parent.opts.clientWidth - 28 }px "
				>
			</div>
			<div class="gift_info">
				<p class="name">{ parent.opts.gift.info.name }</p>
				<p class="lead">{ parent.opts.gift.info.lead }</p>
				<div class="receivers">
					<div class="used" if="{ parent.opts.gift.num.pay > 0 }">
						<span><img riot-src="{ 'https://img.91pintuan.com/songli/icon-herf/gift-box.png'} "/></span>
						<span>{ parent.opts.gift.info.benedictory.title ? 
								parent.opts.gift.info.benedictory.title.replace('{NUM}', (parent.opts.gift.num.receivers || 0)) : '已有' + (parent.opts.gift.num.receivers || 0) + '人收到了礼物' }
						</span>
					</div>
					<div if="{ parent.opts.gift.num.pay <= 0 }"></div>
				</div>
				<div class="price">
					<span>{ $.util.filter.currency(parent.opts.gift.info.price) }</span>
				</div>
			</div>
			<div class="detail_info">
			  <hr>
				<img class="title_img" riot-src="{ 'https://img.91pintuan.com/songli/word_gift_detail.png' }" />
				<hr class="hr">
				<raw content="{ parent.opts.gift.info.detail }"></raw>
			</div>
			<!--底表logo-->
			<bottom></bottom>
		</div>
		
		<!-- Start giving gifts to friends -->
		<div class="btn_fixed"></div>
		<div class="btn_give" if="{ !parent.opts.gift.num.stock || ((parent.opts.gift.num.stock - parent.opts.gift.num.subpay) > 0) }">
			<!-- type = 1 代表一送一 -->
			<a if="{ !parent.opts.gift.num.stock || ((parent.opts.gift.num.stock - parent.opts.gift.num.subpay) > 0) }" class="fl btn_one" href="{ '/gift/' + parent.opts.gift.id + '/order/record?type=one2one' }">送一人</a>
			<!-- type = 2 代表一送多 -->
			<a if="{ !parent.opts.gift.num.stock || ((parent.opts.gift.num.stock - parent.opts.gift.num.subpay) > 0) }" class="fr btn_more" href="{ '/gift/' + parent.opts.gift.id + '/order/record?type=one2many' }">送多人</a>
		</div>
		<!-- The gift has been sold out  -->
		<div class="btn_online" if="{ !parent.opts.gift.status.online || ( parent.opts.gift.num.stock != 0 && ((parent.opts.gift.num.stock - parent.opts.gift.num.subpay) <= 0) ) }">
			<a if="{ !parent.opts.gift.status.online }" disabled="true">抱歉，该商品已售罄</a>
			<a if="{ parent.opts.gift.num.stock != 0 && ((parent.opts.gift.num.stock - parent.opts.gift.num.subpay) <= 0) }" disabled="true">抱歉，该商品已售罄</a>
		</div>
	</div>
</router-outlet>