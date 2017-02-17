<div class="present_received_list listgift">
	<div class="card-group">
		<div class="card card-ship" each="{ suborder in suborders }">
			<div class="present-rl-item">
				<img src="https://img.91pintuan.com/songli/icon-herf/default-img.png" riot-src="{ suborder.headimgurl }" />
				<div class="ite-summary">
					<div class="clear"></div>
					<div class="ite-content">
						<span class="ite-name">{ suborder.consignee }</span>
						<span class="ite-status">
							<span class="trade-status-green">已收货</span>
						</span>
					</div>
					<div>
						<span class="ite-status">
							<span>{ $.util.filter.date(suborder.status.read_date) }</span>
						</span>
					</div>
				</div>
			</div>
			<div class="express">
				<span class="span1">快递单号</span>
				<span class="span2">{ suborder.express.company.name } { suborder.express.no }</span>
			</div>
		</div>
	</div>
</div>
