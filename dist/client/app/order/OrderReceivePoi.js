import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Form, Component } from '../../framework/ninjiajs/src/index';

@Component
@Form({
  consignee: {
    required: true,
    minlength: 1,
    maxlength: 20
  },
  telephone: {
    required: true,
    minlength: 6,
    maxlength: 11
  },
  poi: {
    required: true,
  }
})
@Connect(
	state => ({
		order: state.order,
		clientWidth: state.clientWidth,
		poi: state.suborder.poi,
		poiLoaded: state.poi.loaded
	}),
  dispatch => ({
    orderReceiveSubmit: o => dispatch(actions.orderReceiveSubmit(o))
  })
)
export default class OrderReceivePoi extends riot.Tag {
  static originName = 'order-receive-poi'

  get name() {
    return 'order-receive-poi'
  }

  get tmpl() {
    //<!-- build:tmpl:begin -->
		return `<div class="receive_poi">
  <div class="receive_wrap">
    <div class="poi_cont">
      <div class="gift_info">
        <div class="info">
          <div class="title">
            <span><img riot-src="{ app.config.phtUri + opts.order.gift.info.cover }"></span>
            <span>礼品</span>
            <span style=" width: { (opts.clientWidth-24)*0.85 - 80 }px;" >{ opts.order.gift.info.name }</span>
          </div>
        </div>
        <div class="step">
          <img src="https://img.91pintuan.com/songli/client/receive-step-1.png" alt="" />
        </div>
      </div>
      <!--form表单-->
      <form class="form-recpoi" ref="orderReceivePoiForm" novalidate>
        <div class="form_common">
          <label class="form_label fl">姓名</label>
          <input class="fr" type="text" ref="consignee" placeholder="收礼人姓名">
          <p if="{ opts.forms.orderReceivePoiForm.$submitted && opts.forms.orderReceivePoiForm.consignee.$error.required }" class="help-block" >* 请填写收货人姓名</p>
          <p if="{ opts.forms.orderReceivePoiForm.$submitted && opts.forms.orderReceivePoiForm.consignee.$error.maxlength }" class="help-block" >* 收货人姓名过长</p>
          <p if="{ opts.forms.orderReceivePoiForm.$submitted && opts.forms.orderReceivePoiForm.consignee.$error.minlength }" class="help-block" >* 收货人字数过短</p>
        </div>
        <div class="form_common">
          <label class="form_label fl">手机号</label>
          <input class="fr" type="tel" ref="telephone" placeholder="手机号码">
          <p if="{ opts.forms.orderReceivePoiForm.$submitted && opts.forms.orderReceivePoiForm.telephone.$error.required" class="help-block">* 请填写手机号码.</p>
          <p if="{ opts.forms.orderReceivePoiForm.$submitted && opts.forms.orderReceivePoiForm.telephone.$error.minlength" class="help-block">* 手机号码最少六位.</p>
        </div>
        <!--门店自提-->
        <div class="form_common form_poi" onclick="{ selPoi }">
          <label class="label_poi fl" for="poi">使用门店</label>
          <span class="fl poi" if="{ !opts.poiLoaded }">门店加载中</span>
          <span class="fl poi" if="{ opts.poiLoaded }">{ opts.poi ? opts.poi.base_info.business_name : '请选择门店' }</span>
          <input type="hidden" ref="poi">
          <span class="fr right"><img src="https://img.91pintuan.com/songli/client/poi-right.png" alt="" /></span>
          <p if="{ opts.forms.orderReceivePoiForm.$submitted && opts.forms.orderReceivePoiForm.poi.$error.required }" class="help-block">* 请选择门店</p>
        </div>
        
        <button type="submit" class="btn_next" onclick="{ onSubmit }" >下一步</button> 
      </form>
    </div>
  </div>
  <icon-href theme="{ white }"></icon-href>
</div> `
		//<!-- endbuild -->
  }
	
  onCreate(opts) {
    this.on('mount', () => {
      app.store.dispatch({type: 'poi/loaded', payload: true})  
    })
  }
  
  selPoi() {
    let pois = this.pois;
    let address = this.address;
    let modalInstance = widgets.Modal.open({
      tag: 'gift-poi-modal',
      props: {
        poi: this.opts.poi
      }
    })
    modalInstance.one('dismiss', poi => {
      this.refs['poi'].value = poi;
      triggerDomEvent('change', this.refs['poi']);
      function triggerDomEvent(eventName, root){
        var e = document.createEvent('Event')
        e.initEvent(eventName, true, true)
        setTimeout(() => {
          root.dispatchEvent(e);
        }, 0)
      }
    })
    if (this.opts.poi && this.opts.poi.id) {
      this.refs['poi'].value = this.opts.poi.id;
    }
  }
  
  
  async onSubmit(e) {
    e.preventDefault();
    let { dispatch, getState } = app.store;
    let { suborder, order, user } = getState();
    this.opts.submit('orderReceivePoiForm')
    
    if (this.opts.forms.orderReceivePoiForm.$invalid) {
      return;
    }
    
    let address = {
      consignee: this.refs['consignee'].value,
      telephone: this.refs['telephone'].value,
      poi: suborder.poi
    }
    
    await this.opts.orderReceiveSubmit(address)
    
  }
  
}