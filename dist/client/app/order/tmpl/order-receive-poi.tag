<div class="receive_poi">
  <div class="receive_wrap">
    <div class="poi_cont">
      <div class="gift_info">
        <div class="info">
          <div class="title">
            <span><img riot-src="{ app.config.phtUri + opts.order.gift.info.cover }"></span>
            <span style=" width: { (opts.clientWidth-24)*0.85 - 60 }px;" >{ opts.order.gift.info.name }</span>
          </div>
        </div>
        <div class="step">
          <img src="//img.91pintuan.com/songli/client/receive-step-1.png" alt="" />
        </div>
      </div>
      <!--form表单-->
      <form class="form-recpoi" ref="orderReceivePoiForm" novalidate>
        <div class="form_common">
          <label class="form_label fl">姓名</label>
          <input class="fr" type="text" ref="consignee" placeholder="收礼人姓名">
          <p if="{ opts.forms.orderReceivePoiForm.$submitted && opts.forms.orderReceivePoiForm.consignee.$error.required }" class="help-block" >* 请填写收货人姓名</p>
          <p if="{ opts.forms.orderReceivePoiForm.$submitted && opts.forms.orderReceivePoiForm.consignee.$error.maxlength }" class="help-block" >* 收货人姓名过长</p>
        </div>
        <div class="form_common">
          <label class="form_label fl">手机号</label>
          <input class="fr" type="tel" ref="telephone" placeholder="手机号码">
          <p if="{ opts.forms.orderReceivePoiForm.$submitted && opts.forms.orderReceivePoiForm.telephone.$error.required" class="help-block">* 请填写手机号码.</p>
        </div>
        <!--门店自提-->
        <div class="form_common form_poi" onclick="{ selPoi }">
          <label class="label_poi fl" for="poi">使用门店</label>
          <span class="fl poi" if="{ !opts.poiLoaded }">门店加载中</span>
          <span class="fl poi" if="{ opts.poiLoaded }">{ opts.poi ? opts.poi.base_info.business_name : '请选择门店' }</span>
          <input type="hidden" ref="poi">
          <span class="fr right"><img src="//img.91pintuan.com/songli/client/poi-right.png" alt="" /></span>
          <p if="{ opts.forms.orderReceivePoiForm.$submitted && opts.forms.orderReceivePoiForm.poi.$error.required }" class="help-block">* 请选择门店</p>
        </div>
        
        <button type="submit" class="btn_next" onclick="{ onSubmit }" >下一步</button> 
      </form>
    </div>
  </div>
  <icon-href theme="{ white }"></icon-href>
</div>