import riot from 'riot';
import route from 'riot-route';
import { Component, Connect, Form } from '../../framework/ninjiajs/src/index';
import actions from './gift.actions';


@Component
@Form({
  capacity: {
    required: true,
    min: 1,
    max: 9999
  }
})
@Connect(
  state => ({
    gift: state.gift,
    clientWidth: state.clientWidth
  }),
  dispatch => ({
    
  })
)
export default class GiftBuyModal extends riot.Tag {
  static originName = 'gift-buy-modal'
  get name() {
    return 'gift-buy-modal'
  }
  
  get tmpl() {
    return `
       <div class="gift_buy">
        <div class="buy_cont">
          <div class="title">
            <img riot-src="{ opts.gift.info.cover ? 'http://' + config.phtUri + opts.gift.info.cover + app.config.phtStlList3 : app.config.images.GIFT_DEF_COVER }">
            <span style="width: {opts.clientWidth - 105 }px">{ opts.gift.info.name }</span>
          </div>
          <div class="price">
            <span>礼品单价</span>
            <span>{ $.util.filter.currency(opts.gift.info.price) }</span>
          </div>
          <form ref="giftBuyCapacity" novalidate class="num">
            <span>礼品数量</span>
            <span class="input_group">
              <button type="button" onclick="{ reduCapacity }"><em></em></button>
              <input  type="number" ref="capacity" value="1">
              <button type="button" onclick="{ incrCapacity }" data-type="plus" ><em>+</em></button>
            </span><b>份</b>
            <p if="{ opts.forms.giftBuyCapacity.$submitted && opts.forms.giftBuyCapacity.capacity.$error.required }" class="help-block">礼物份数不能为空</p>
            <p if="{ opts.forms.giftBuyCapacity.$submitted && opts.forms.giftBuyCapacity.capacity.$error.min }" class="help-block">礼物份数至少是1份</p>
            <p if="{ opts.forms.giftBuyCapacity.$submitted && opts.forms.giftBuyCapacity.capacity.$error.max }" class="help-block">礼物份数至多9999份</p>
          </form>
          <div class="next">
            <button onclick="{ buyNext }">录音并支付</button>
          </div>
        </div>
      </div>
    `;
  }
  
  onCreate(opts) {}
  
  reduCapacity() {
    let { dispatch, getState } = app.store;
    let capacity = this.refs.capacity.value;
    if(capacity > 1){
      dispatch({type: 'order/update', payload: {capacity: this.refs.capacity.value--}})
    }else{
      widgets.Alert.add('warning', app.config.messages.GIFT_REDUCE, 2000);
    }
  }
  
  incrCapacity() {
    let { dispatch, getState } = app.store;
    dispatch({type: 'order/update', payload: {capacity: ++this.refs.capacity.value}})
  } 
  
  buyNext(e) {
    let { dispatch, getState } = app.store;
    e.preventDefault()
    this.opts.submit('giftBuyCapacity')
    if (this.opts.forms.giftBuyCapacity.$invalid) {
      return;
    }
    
    if(this.refs.capacity.value == 1){
      dispatch({type: 'order/update', payload: {capacity: 1}})
    }
    
    let { gift, order } = getState()
    order.gift = gift.id
    localStorage.setItem("order:capacity", JSON.stringify(order));
    location.href = `/wepay/?component=OrderPlace`;
    
    this.trigger('dismiss')
  }
  
}