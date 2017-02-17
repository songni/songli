<div class="ready_single">
  <div class="single_wrap">
    <div class="receive_logistics">
      <img class="right_top_corner" src="https://img.91pintuan.com/songli/i.png">
      <div class="head_portrait">
        <img riot-src="{ opts.order.sender.info.headimgurl }" />
      </div>
      <div class="gift_inform">
        <span if="{ opts.isShare }" class="receive-present-text">已经完成支付！想要送给谁写下收礼人的收货信息；不知道地址可以直接发给对方填写</span>
        <span if="{ !opts.isShare }" class="receive-present-text">你的朋友{ opts.order.sender.info.nickname }为你准备了一份礼物，并对你说了一段话表达祝福。赶快领取吧，写下地址收到礼物时扫描二维码听Ta对你说~</span>
      </div>
      <!--form表单-->
      <form class="form_group" ref="orderReceiveLogisticsForm" novalidate>
        <input class="form_name" type="text" ref="consignee" placeholder="收礼人姓名">
        <p if="{ opts.forms.orderReceiveLogisticsForm.$submitted && opts.forms.orderReceiveLogisticsForm.consignee.$error.required }" class="help-block" >* 请填写收货人姓名</p>
        <p if="{ opts.forms.orderReceiveLogisticsForm.$submitted && opts.forms.orderReceiveLogisticsForm.consignee.$error.maxlength }" class="help-block" >* 收货人姓名过长</p>
        <p if="{ opts.forms.orderReceiveLogisticsForm.$submitted && opts.forms.orderReceiveLogisticsForm.consignee.$error.minlength }" class="help-block" >* 收货人字数过短</p>   
    
        <input class="form_tel" type="tel" ref="telephone" placeholder="手机号码">
        <p if="{ opts.forms.orderReceiveLogisticsForm.$submitted && opts.forms.orderReceiveLogisticsForm.telephone.$error.required" class="help-block">* 请填写手机号码.</p>
        <p if="{ opts.forms.orderReceiveLogisticsForm.$submitted && opts.forms.orderReceiveLogisticsForm.telephone.$error.minlength" class="help-block">* 手机号码最少六位.</p>
        
        <div class="form_addr" if="{ (opts.order.gift.scene || opts.order.gift.scene === 'logistics') }">
          <textarea rows="2" ref="address" class="form_textarea" placeholder="请留下详细收货地址，确保能收到礼物"></textarea>
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