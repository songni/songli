import riot from 'riot';
import route from 'riot-route';
import { connect, view, form } from '../../framework/ninjiajs/src/index';
import Wechat from '../wechat/wechat'

@view
@connect(
	state => ({
		order: state.order,
		recordState: state.record,
		gift: state.gift
	})
)
export default class OrderPay extends riot.Tag {
	static originName = 'order-pay'
	get name() {
		return 'order-pay'
	}
	get tmpl() {
		return require(`./order.pay.tag`);
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse)
	}

	async onUse(next, ctx) {
		let { dispatch, getState } = app.store;
		next();
	}

	async wxPay() {
		this.submitted = true;
		setTimeout(() => {
			this.submitted = false;
		}, 5000);
		let order = getState().order;
		if (!order) {
			return;
		}
		let data = await $.post(`/gift/${order.gift}/preorder`, order)
		wx.chooseWXPay({
			timestamp: data.timestamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.paySign,
			success: function(res) {
				var url = $state.href(data.state, {
					id: data.id
				});
				route(url);
			},
			cancel: function(res) {
				this.submitted = false;
			},
			fail: function(res) {
				this.submitted = false;
				Alert.add('warning', res.errMsg);
			}
		});
	};
}