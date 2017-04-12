import riot from 'riot';
import route from 'riot-route';
import { Connect, View, Form, onUse } from '../../framework/ninjiajs/src/index';
import Wechat from '../../framework/wechat/index';
import actions from './order.actions';

@View
@Connect(
  state => ({
    gift: state.gift,
    order: state.order,
    clientWidth: state.clientWidth,
    clientHeight: state.clientHeight,
    recordState: state.record,
  }),
  dispatch => ({
    enterOrderPlace: (next, ctx) => dispatch(actions.enterOrderPlace(next, ctx)),
    place: function(e){ return dispatch(actions.place.apply(this))}
  })
)
export default class OrderPlace extends riot.Tag {
  static originName = 'order-place'
  get name() {
    return 'order-place'
  } 
  get tmpl() {
    return `
      <div class="order_place" style="height: { opts.clientHeight }px">
        <div class="order_voice" style="height: { opts.clientHeight * 0.55 }px">
          <span class="title">录制语音祝福</span>
          <order-record-voice></order-record-voice>
        </div>
        <div class="order_wepay" style="height: { (opts.clientHeight * 0.45) - 30 }px">
          <div class="info">
            <img riot-src="{ opts.gift.info.cover ? 'http://' + config.phtUri + opts.gift.info.cover + app.config.phtStlList4 : app.config.images.GIFT_DEF_COVER }">
            <div class="info_right">
              <span>{ opts.gift.info.name }</span>
              <span>
                <em>单价{ $.util.filter.currency(opts.gift.info.price) }</em>
                <em>x{ opts.order.capacity }</em>
              </span>
            </div>
          </div>
          <div class="wepay">
            <span>需支付</span>
            <span>{ $.util.filter.currency(opts.order.capacity * opts.gift.info.price) }</span>
          </div>
          <div class="{ (opts.recordState.start || opts.recordState.stop) ? 'btn_disabled' : 'btn_pay' }">
            <input type="button" onclick="{ opts.place.bind(this) }" value="支付" disabled="{ opts.recordState.start || opts.recordState.stop }" >
          </div>
        </div>
      </div>
    `;
  }
  @onUse('enterOrderPlace')
  onCreate(opts) { }
  
}