<router-outlet>
	<div class="order-info-warp">
		<!-- 单人订单 -->
		<div class="present-sent-detail listgift">
			<div class="card-group">
				<div class="detail-title">
					<div class="detail-title-img">
						<img riot-src="{ parent.opts.order.gift.info.cover ? app.config.phtUri + parent.opts.order.gift.info.cover : 'https://img.91pintuan.com/songli/icon-herf/present_sent_demo.png' }" class="od-trade-img">
					</div>
						<div class="detail-title-content">
							<p class="giftname">{ parent.opts.order.gift.info.name }</p>
						</div>
				</div>
			</div>
			<div class="card-group2">
				<ul class="card detail-content">
					<li class="card-li">
						<span class="listInfo">单价：</span>
						<span class="listorder">{ $.util.filter.currency(parent.opts.order.gift.info.price) }</span>
					</li>
					<li class="clear"></li>
					<li class="card-li">
						<span class="listInfo">数量：</span>
						<span class="listorder">{ parent.opts.order.capacity }份</span>
					</li>
					<li class="clear"></li>
					<li class="card-li">
						<span class="listInfo">总价：</span>
						<span class="listorder">{ $.util.filter.currency(parent.opts.order.gift.info.price * opts.order.capacity) }</span>
					</li>
					<li class="clear"></li>
					<li class="card-li">
						<span class="listInfo">下单时间：</span>
						<span class="listorder listorder2">{ $.util.filter.date(parent.opts.order.time.add) }</span>
					</li>
					<li class="clear"></li>
					<li class="card-li" if="{ parent.opts.order.express }">
						<span class="listInfo">快递单号:</span>
						<span class="listorder listorder2">
							{ parent.opts.order.receivers[0].express.no }
						</span>
					</li>
					<li class="clear"></li>
				</ul>
			</div>
			<!-- #TODO leave order stauts to https://github.com/arrking/songni/issues/74 -->
			<!--礼物状态-->
			<div class="card-group3" if="{ parent.opts.order.capacity == 1 }">
				<ul class="detail-status">
					<li>
						<span class="state">礼物状态 </span>
					</li>
					<li if="{ parent.opts.suborder.status.read }" class="receiver">
						<span class="name">{ $.util.filter.date(parent.opts.suborder.status.read_date) }</span>
						<span class="status status-listen">已收货</span>
					</li>
					<li if="{ parent.opts.suborder.status.shipping }" class="receiver">
						<span class="name">{ $.util.filter.date(parent.opts.suborder.status.shipping_date) }</span>
						<span class="status status-deliver">已发货</span>
					</li>
					<li if="{ parent.opts.suborder && opts.suborder.telephone }" class="receiver">
						<span class="name">{ $.util.filter.date(parent.opts.suborder.fillinDate) }</span>
						<span class="status status-deliver">已领取</span>
					</li>
					<li class="receiver">
						<span class="name">{ parent.opts.suborder && parent.opts.order.time.pay ? $.util.filter.date(parent.opts.order.time.pay) + '下单' : '' }</span>
						<a if="{ parent.opts.suborder && opts.suborder.telephone }" ui-sref="order.detail.one2one-address({id: order.id})" class="status status-deliver">礼物已被领取 <img class="spanimg" src="https://img.91pintuan.com/songli/client/poi-right.png"/></span></a>
						<a if="{ !parent.opts.suborder || !opts.suborder.telephone }" ui-sref="order.detail.one2one-address({id: order.id})" class="status status-deliver">1份礼物未被领取 <img class="spanimg" src="https://img.91pintuan.com/songli/client/poi-right.png"/></span></a>
					</li>
				</ul>
			</div>

			<div class="card-group3" if="{ parent.opts.order.capacity > 1 }">
				<!-- #TODO leave order stauts to https://github.com/arrking/songni/issues/74 -->
				<ul class="detail-status">
					<li if="{ parent.opts.listenedNum || parent.opts.shippedNum || parent.opts.receivedNum }">
							<span class="state">礼物状态 </span>
					</li>
					<li class="receiver" if="{ parent.opts.listenedNum != 0 }">
						<span class="trade-time">{ $.util.filter.date(parent.opts.readTime) }</span>
						<div class="trade-num trade-status-yellow" onclick="{ parent.listened.bind(parent) }">已收货 { parent.opts.listenedNum }
							<img class="spanimg" src="https://img.91pintuan.com/songli/client/poi-right.png"/></span>
						</div>
					</li>
					<li class="receiver" if="{ parent.opts.shippedNum != 0 }">
						<span class="trade-time">{ $.util.filter.date(parent.opts.shippedTime) }</span>
							<div class="trade-num trade-status-green" onclick="{ parent.shipped.bind(parent) }">已发货 { parent.opts.shippedNum }
								<img class="spanimg" src="https://img.91pintuan.com/songli/client/poi-right.png"/></span>
							</div>
					</li>
					<li class="receiver" if="{ parent.opts.receivedNum != 0 }">
						<span class="trade-time">{ $.util.filter.date(opts.receivedTime) }</span>
							<div class="trade-num trade-status-green" onclick="{ parent.received.bind(parent) }">已领取 { parent.opts.receivedNum } 
								<img class="spanimg" src="https://img.91pintuan.com/songli/client/poi-right.png"/></span>
							</div>
					</li>
					<li class="receiver">
						<span class="trade-time">{ $.util.filter.date(parent.opts.order.time.pay) }</span>
						<div class="trade-num trade-status-green" onclick="{ parent.jumpToAddressCard.bind(parent) }">
								{ parent.opts.order.capacity - parent.opts.receivedNum === 0 ? '礼物已被领完' : parent.opts.order.capacity - parent.opts.receivedNum + '份礼物未领取' }
							<img class="spanimg" src="https://img.91pintuan.com/songli/client/poi-right.png"/></span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</router-outlet>
