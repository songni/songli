import riot from 'riot';
import route from 'riot-route';
import { Component, Connect } from '../../framework/ninjiajs/src/index';


@Component
@Connect(
  state => ({
    merchant: state.merchant,
    clientWidth: state.clientWidth
  })
)
export default class MerchantInfo extends riot.Tag {
  static originName = 'merchant-info'
  get name() {
    return 'merchant-info'
  }
  
  get tmpl() {
    return `
      <div class="merchant-info" onclick="{ dismiss }">
        <div class="merchant-pubno">
          <div class="pubno">
            <span><img width="50px"  riot-src="{ opts.merchant.pubno.head_img }"></span>
            <span>{ opts.merchant.pubno.nick_name }</span>
          </div>
          <div class="pubno">
            <span>联系人</span>
            <span>{ opts.merchant.info.linkman }</span>
          </div>
          <div class="pubno">
            <span>联系商家</span>
            <span>{ opts.merchant.info.phone ? opts.merchant.info.phone : opts.merchant.info.telephone }</span>
          </div>
          <div class="pubno">
            <span>官方微信</span>
            <span>{ opts.merchant.pubno.nick_name }</span>
          </div>
        </div>
      </div>
    `;
  }
  
  onCreate(opts) {
    
  }
  
  
  dismiss() {
    this.trigger('dismiss')
  }
}