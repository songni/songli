import riot from 'riot';
import route from 'riot-route';
import { Connect, View, Form } from '../../framework/ninjiajs/src/index';
import Wechat from '../../framework/wechat/index';
import actions from './order.actions';

@View
@Form({
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
@Connect(
	state => ({
		order: state.order,
		recordState: state.record,
		gift: state.gift
	}),
	dispatch => ({
		enterOrderRecord: (next, ctx, tag) => dispatch(actions.enterOrderRecord(next, ctx, tag))
	})
)
export default class OrderRecord extends riot.Tag {
	static originName = 'order-record'
	get name() {
		return 'order-record'
	}
	get tmpl() {
		return require(`./tmpl/order.record.tag`);
	}
	onCreate(opts) {
		this.mixin('router');
		this.$use((next, ctx) => this.opts.enterOrderRecord.apply(this, [next, ctx, this]))
	}
  
  reduCapacity() {
    let { dispatch, getState } = app.store;
		let capacity = getState().order.capacity;
		if (capacity > 2) {
			dispatch({type: 'order/update', payload: {capacity: --capacity}})
		} else if (capacity == 2) {
				widgets.Alert.add('warning', app.config.messages.GIFT_REDUCE, 2000);
		}
  }
  
  incrCapacity() {
    let { dispatch, getState } = app.store;
		let capacity = getState().order.capacity;
		dispatch({type: 'order/update', payload: {capacity: ++capacity}})
  }
  
	async record() {
		let { dispatch } = app.store
		await Wechat.startRecord();
		this.tags['order-record-timer'].trigger('timer:start');
		dispatch({type: 'record/update', payload: {
			start: true,
			stop: false,
			record: false
		}})
	}

	async stop() {
		let { dispatch } = app.store
		let me = this;
		let res = await Wechat.stopRecord();
		me.tags['order-record-timer'].trigger('timer:stop');
		dispatch({type: 'order/update', payload: { localId: res.localId }})
		dispatch({type: 'record/update', payload: { start: false, record: true }})
	}

	rerecord() {
		let { dispatch } = app.store
		this.tags['order-record-timer'].trigger('timer:init');
		dispatch({ type: 'record/reset' });
	}

	playVoice() {
		let order = app.store.getState().order;
		this.tags['order-record-timer'].trigger('timer:play');
		Wechat.playVoice({ localId: order.localId});
	}

	async onSubmit(e) {
		let { dispatch, getState } = app.store;
		let me = this;
		e.preventDefault()
		this.opts.submit('orderRecordForm')
		
		if (this.opts.forms.orderRecordForm.$invalid) {
			return;
		}
		
		let order = getState().order;
		let res = await Wechat.uploadVoice({
			localId: order.localId,
			isShowProgressTips: 1
		});
		order.serverId = res.serverId;
		if (order.type === 'one2one') {
			order.name = me.refs.name.value;
		}
		if (order.type === 'one2many') {
			order.capacity = me.refs.capacity.value;
		}
		dispatch({type: 'order/update', payload: order})
		localStorage.setItem("order:recorded", JSON.stringify(order));
		location.href = `/wepay?showwxpaytitle=1&component=OrderPay`;
	}
}