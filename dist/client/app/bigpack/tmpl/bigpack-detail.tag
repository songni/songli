<router-outlet>
  <div class="bigpack">
    <div class="bigpack_wrap">
      <div class="bigpack_cont" >
        <!--title-->
        <div class="pack_title" style="width: { parent.opts.clientWidth - 24 }px;">
          <span><img riot-src="{ parent.opts.merchant.pubno.head_img }"/></span>
          <span style="width: { parent.opts.clientWidth - 76 }px;">商家{ parent.opts.merchant.pubno.nick_name }发给你一个大礼包 </span>
          <span>订单号 { parent.opts.order.id }</span>
        </div>
        <!--bigpack order detail-->
        <div class="detail">
          <div class="order_img" style="width: { parent.opts.clientWidth - 50 }px; height: { parent.opts.clientWidth - 50 }px;">
            <img riot-src="{ parent.opts.order.gift && parent.opts.order.gift.info && parent.opts.order.gift.info.cover ? app.config.phtUri + parent.opts.order.gift.info.cover : app.config.images.GIFTSHRAE_DEF_COVER }"/>
            <div class="title_price" style="width: { parent.opts.clientWidth - 50 }px;">
              <span>{ parent.opts.order.gift.info.name }</span>
              <span>{ $.util.filter.currency(parent.opts.order.gift.info.price) }</span>
            </div>
          </div>
          <div class="order_num">{ parent.opts.order.capacity }份礼物</div>
          <div class="order_btn">
            <button class="btn_end" if="{ parent.opts.isUnavailable }">该大礼包已送出</button>
            <a class="btn_start" if="{ !parent.opts.isUnavailable }" href="javascript:void 0" onclick="{ parent.onSubmit }">开始使用</a>
          </div>
          <div if="{ parent.opts.order.gift.scene != 'wb' }" class="des_info">
            <span>点击开始送礼并完善语音信息</span>
          </div>
          <div if="{ parent.opts.order.gift.scene === 'wb' }" class="des_info">
            <span>点击开始使用，领取大客户礼包</span>
            <span>上传微信二维码名片，即可开始送礼</span>
          </div>
        </div>
      </div>
    </div>
    <icon-href theme="white"></icon-href>
    </div>
</router-outlet>
