<div class="order-info-warp">
  <div class="present_received_list secondpage">
    <div class="card-group">
      <div class="card card-received" each="{ suborder in suborders }">
        <div class="present-rl-item">
          <img src="https://img.91pintuan.com/songli/icon-herf/default-img.png" riot-src="{ suborder.headimgurl }" />
          <div class="ite-summary">
            <div class="clear"></div>
            <div class="ite-content">
              <span class="ite-name">{ suborder.consignee }</span>
              <span class="ite-status">
                <span class="trade-status-green">已领取</span>
              </span>
            </div>
            <div>
              <span class="ite-status">
                <span>{ $.util.filter.date(suborder.fillinDate) }</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="box-second"></div>
    </div>
  </div>
</div>