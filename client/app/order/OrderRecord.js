import riot from 'riot';
import route from 'riot-route';
import { connect, view, form } from '../../framework/ninjiajs/src/index';
import Wechat from '../wechat/wechat'

@view
@form({
	name: {
		required: true,
		minlength: 2,
		maxlength: 20
	},
	capacity: {
	  required: true,
	  min: 2
	}
})
@connect(
	state => ({
		order: state.order,
		recordState: state.record,
		gift: state.gift
	})
)
export default class OrderRecord extends riot.Tag {
	static originName = 'order-record'
	get name() {
		return 'order-record'
	}
	get tmpl() {
		return require(`./order.record.tag`);
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use(this.onUse)
	}

	async onUse(next, ctx) {
		let { dispatch, getState } = app.store;
		let type = ctx.req.query['type'];
		let order = getState().order;
		let payload = { type }
		dispatch({ type: 'record/reset' })
		if (!order.id) {
			if (type === 'one2one') {
				payload.capacity = 1;
			}	else {
				payload.capacity = 2;
			}
			payload.gift = this.opts.gift.id;
			dispatch({ type: 'order/update', payload });
		}
		next();
		this.tags['order-record-timer'].trigger('timer:init');
	}
  
  reduCapacity() {
    let { dispatch, getState } = app.store;
		let capacity = getState().order.capacity;
		if (capacity > 2) {
			dispatch({type: 'order/update', payload: {capacity: --capacity}})
		} else if (capacity == 2) {
				widgets.Alert.add('warning', '礼物份数至少是2份', 2000);
		}
  }
  
  incrCapacity() {
    let { dispatch, getState } = app.store;
		let capacity = getState().order.capacity;
		dispatch({type: 'order/update', payload: {capacity: ++capacity}})
  }
  
	record() {
		let { dispatch } = app.store
		let me = this;
		Wechat.ready(async function() {
			wx.startRecord({
				success: function(res) {
					me.tags['order-record-timer'].trigger('timer:start');
					dispatch({type: 'record/update', payload: {
						start: true,
						stop: false,
						record: false
					}})
				},
				fail: function(res){
					console.warn(res)
				}
			});
		})
	}

	stop() {
		let { dispatch } = app.store
		let me = this;
		Wechat.ready(async function() {
			wx.stopRecord({
				success: function(res) {
					me.tags['order-record-timer'].trigger('timer:stop');
					dispatch({type: 'order/update', payload: { localId: res.localId }})
					dispatch({type: 'record/update', payload: {
						start: false,
						record: true
					}})
				},
				fail: function(res){
					console.warn(res)
				}
			});
		})
	}

	rerecord() {
		let { dispatch } = app.store
		this.tags['order-record-timer'].trigger('timer:init');
		dispatch({ type: 'record/reset' });
	}

	playVoice() {
		let order = app.store.getState().order;
		this.tags['order-record-timer'].trigger('timer:play');
		Wechat.ready(async function() {
			wx.playVoice({
				localId: order.localId
			});
		})
	}

	async onSubmit(e) {
		let { dispatch, getState } = app.store;
		e.preventDefault()
		this.opts.submit('orderRecordForm')
		
		if (this.opts.forms.orderRecordForm.$invalid) {
			return;
		}
		
		let order = getState().order;
		wx.uploadVoice({
			localId: order.localId,
			isShowProgressTips: 1,
			success: function(res) {
				order.serverId = res.serverId;
				dispatch({type: 'order/update', payload: { ...order }})
				location.href = `/wepay?showwxpaytitle=1&component=OrderPay`;
			}
		});
	}
}