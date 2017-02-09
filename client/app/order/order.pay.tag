<div style="height:8px"></div>
<div class="empty-canvas empty-pay">
	<div class="pay">
		<div class="card-pay">
			<div class="present-detail-summary">
				<p class="name">{ opts.gift.info.name }</p>
				<p class="lead">{ opts.gift.info.lead }</p>
				<div class="separate-box present-summary-bottom">
					<div class="separate-left">
						<span>{ $.util.currency(opts.gift.info.price) }</span>
					</div>
					<div class="separate-right trade-status-h">
						<span>{ opts.order.capacity }份</span>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<div class="card-pay total-pay">
			<div class="card">
				<div class="separate-box">
					<div class="separate-left">
						总 计
					</div>
					<div class="separate-right">
						{ $.util.currency(opts.gift.info.price * opts.order.capacity) }
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<!--/total-pay-->
		<div class="pay-now">
			<a class="button btn-pay btn-green" onclick="{ wxPay }" disabled="{ submiting }">{ submiting ? '支付中...' : '支付' }</a>
		</div>
	</div>
</div>
