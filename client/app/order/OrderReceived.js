import riot from 'riot';
import route from 'riot-route';
import { Connect, View } from '../../framework/ninjiajs/src/index';
import Wechat from '../../framework/wechat/index';
import actions from './order.actions';

@View
@Connect(
	state => ({
    order: state.order,
    suborder: state.suborder,
    merchant: state.merchant,
    clientWidth: state.clientWidth,
  }),
  dispatch => ({
    detail: actions.giftDetail
  })
)
export default class OrderReceived extends riot.Tag {
	static originName = 'order-received'
	get name() {
		return 'order-received'
	}
	get tmpl() {
		return require(`./tmpl/order-received.tag`);
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse);
	}
	
	openMerchant (){
	  widgets.Modal.open({
      tag: 'merchant-info',
      size: 'lg'
    })
	}
	
	async openLocation () {
		if (!this.opts.suborder) {
			return;
		}
		let poi = this.opts.suborder.poi.base_info;
		let res = null;
		
		try {
			res = await Wechat.getLocation({
				latitude: poi.latitude,
				longitude: poi.longitude,
				name: poi.business_name + '' + poi.branch_name,
				address: poi.province + poi.city + poi.district + poi.address,
				scale: 17,
				infoUrl: window.location.href,
			});
			
		} catch(e) {
			widgets.Alert.add('warning', app.config.errors.LOCATION_NOAUTH.message);
		} 

  }
	
	onUse(next) {
	  let { dispatch, getState } = app.store;
    let { order, user } = getState();
		let suborder = order.receivers.filter(r => r.userOpenId === user.openid)[0];
		if (!suborder) {
			return route(`/`);
		}
    dispatch(({type: 'suborder/update', payload: suborder}));
    next();
  }

}