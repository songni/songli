import riot from 'riot';
import route from 'riot-route';
import { View, Connect } from '../../framework/ninjiajs/src/index';


@View
@Connect(
  state => ({
    order: state.order,
    clientWidth: state.clientWidth
  })
)
export default class OrderGiftDetail extends riot.Tag {
  static originName = 'order-gift-detail'
  get name() {
    return 'order-gift-detail'
  }
  
  get tmpl() {
    return `
      <div class="gift_dets" onclick="{ dismiss }">
        <div class="dets_conts">
          <span class="title">礼物详情</span>
          <div class="contents">
            <raw content="{ opts.order.gift.info.detail }"></raw>
          </div>
        </div>
      </div>
    `;
  }
  
  onCreate(opts) {}
  
  dismiss() {
    this.trigger('dismiss')
  }
}