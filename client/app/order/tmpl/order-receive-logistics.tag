<div class="ready_single">
  <div class="single_wrap">
    <div class="receive_logistics">
      <img class="right_top_corner" src="//img.91pintuan.com/songli/i.png">
      <div class="head_portrait">
        <img riot-src="{ opts.order.sender.info.headimgurl }" />
      </div>
      <div class="gift_inform">
        <span if="{ opts.isShare }" class="receive-present-text">已经完成支付！想要送给谁写下收礼人的收货信息；不知道地址可以直接发给对方填写</span>
        <span if="{ !opts.isShare }" class="receive-present-text">{ opts.order.sender.info.nickname }送你一份礼物，并对你说了一段话。领取并完善信息，收到礼物扫描语音二维码即可收听。</span>
      </div>
      <!--form表单-->
      <form class="form_group" ref="orderReceiveLogisticsForm" novalidate>
        <input class="form_name" type="text" ref="consignee" placeholder="输入姓名">
        <p if="{ opts.forms.orderReceiveLogisticsForm.$submitted && opts.forms.orderReceiveLogisticsForm.consignee.$error.required }" class="help-block" >* 请填写收货人姓名</p>
        <p if="{ opts.forms.orderReceiveLogisticsForm.$submitted && opts.forms.orderReceiveLogisticsForm.consignee.$error.maxlength }" class="help-block" >* 收货人姓名过长</p>  
    
        <input class="form_tel" type="tel" ref="telephone" placeholder="输入手机号">
        <p if="{ opts.forms.orderReceiveLogisticsForm.$submitted && opts.forms.orderReceiveLogisticsForm.telephone.$error.required" class="help-block">* 请填写手机号码.</p>
        
        <div class="form_addr" if="{ (opts.order.gift.scene || opts.order.gift.scene === 'logistics') }">
          <textarea rows="2" ref="address" class="form_textarea" placeholder="输入你的详细收货地址"></textarea>
          <p if="{ opts.forms.orderReceiveLogisticsForm.$submitted && opts.forms.orderReceiveLogisticsForm.address.$error.required }" class="help-block">* 请输入收货人的详细地址.</p>
          <p if="{ opts.forms.orderReceiveLogisticsForm.$submitted && opts.forms.orderReceiveLogisticsForm.address.$error.maxlength }" class="help-block" >* 配送地址字数太多.</p>
        </div>
        
        <div class="btn_group">
          <button  type="submit" class="btn_done" onclick="{ onSubmit }">完成</button>
          <a href="javascript:void(0)" if="{ opts.isShare }" class="btn_share"  onclick="{ opts.share }">不知道地址，发给好友填写</a>
        </div> 
        
      </form>
    </div>
  </div>
  <!--Bottom mark-->
  <icon-href theme="{ white }"></icon-href>
</div>