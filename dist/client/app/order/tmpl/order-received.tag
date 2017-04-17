<div class="received_result">
  <div class="received_wrap">
    <div class="reeceived_cont">
      <!--门店场景-->
      <div if="{ opts.suborder.scene === 'poi' }">
        <div class="gift_info" href="">
          <div class="info">
            <div class="title">
              <span><img riot-src="{ app.config.phtUri + opts.order.gift.info.cover }"></span>
              <span style=" width: { (opts.clientWidth-24)*0.85 - 60 }px;" >{ opts.order.gift.info.name }</span>
            </div>
          </div>
        </div>
        <!--使用状态-->
        <div class="use_state" if="{ opts.suborder }">
          <span>礼物券已被领取</span>
          <span class="color-pink" >{ opts.suborder.status.shipping ? '已使用' : '未使用' }</span>
        </div>
        <!--二维码-->
        <div class="gift_code" if="{ suborder} ">
          <span><img riot-src="{ opts.suborder.qrcode.src }"></span>
          <span>{ opts.suborder.id }</span>
          <span>请保留二维码消费凭证</span>
          <span>到店使用时请向商家出示二维码</span>
        </div>
        <!--领取信息-->
        <div class="rec_info" if="{ opts.suborder }" >      
          <ul>
            <li onclick="{ openMerchant }">
              <div class="rec-l fl">
                <span>联系商家</span>
                <span>{ opts.merchant.pubno.nick_name }</span>
              </div>
              <div class="rec-r fl">
                <img class="merchant" riot-src="{ opts.merchant.pubno.head_img }">
                <img class="icon-r fr" src="https://img.91pintuan.com/songli/client/received.png">
              </div>
            </li>
            <li onclick="{ openLocation }">
              <div class="rec-l fl">
                <span>自提门店</span>
                <span>{ opts.suborder.poi.base_info.business_name }</span>
              </div>
              <div class="rec-r fl">
                <img class="poi-icon" src="http://91pt.oss-cn-beijing.aliyuncs.com/songli/client/received-address.png">
                <img class="icon-r fr" src="http://91pt.oss-cn-beijing.aliyuncs.com/songli/client/received.png">
              </div>
            </li>
            <li>
              <div class="clear"></div>
              <div class="rec-l">
                <span>领取人信息</span>
                <span>{ opts.suborder.consignee + '   ' + opts.suborder.telephone }</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--微商场景-->
      <div class="received_wb" if="{ opts.suborder.scene === 'wb' }">
        <a href="" class="wb_title" onclick="{ opts.detail }" >
          <span><img riot-src="{ app.config.phtUri + opts.order.gift.info.cover + app.config.phtStlList4 }"></span>
          <span>{ opts.order.gift.info.name }</span>
          <span><img src="https://img.91pintuan.com/songli/client/poi-right.png" alt="" /></span>
        </a>
        <div class="wb_note">
          <span>长按二维码添加客服微信获取礼包</span>
        </div>
        <div class="wb_img">
          <div class="img" style=" width:{ opts.clientWidth * 0.85 }px; height:{ (opts.clientWidth * 0.85)*4/3 }px;" >
            <img riot-src="{ '//' + config.phtUri + opts.order.media.info.path + app.config.phtWbQrcode }">
          </div>          
        </div>
      </div>
    </div>
  </div>
  <!--Bottom mark-->
  <icon-href theme="{ white }"></icon-href>
</div>