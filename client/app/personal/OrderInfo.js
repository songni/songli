import riot from 'riot';
import route from 'riot-route';
import { View, Connect, onUse } from '../../framework/ninjiajs/src/index';
import moment from '../../framework/moment';
import actions from './personal.actions';
import interruptors from '../interruptors';

const receivedNum = receivers => receivers && receivers.length || 0;
const shippedNum = receivers => receivers && receivers.filter(r => r.status.shipping).length || 0;
const listenedNum = receivers => receivers && receivers.filter(r => r.status.read).length || 0;
const shippedTime = receivers => {
	if (!receivers) {
		return "";
	}
	let received = receivers.reduce((acc, curr) => {
		if (curr.status && curr.status.shipping_date) {
			if (acc && acc.status && acc.status.shipping_date) {
				if (moment(curr.status.shipping_date).isAfter(acc.status.shipping_date)) {
					return curr;
				} else {
					return acc;
				}
			}
			return curr;
		}
		return acc;
	}, undefined);
	return received && received.status.shipping_date || ""
}
const receivedTime = receivers => {
	if (!receivers) {
		return "";
	}
	let received = receivers.reduce((acc, curr) => {
		if (curr.fillinDate) {
			if (acc && acc.fillinDate) {
				if (moment(curr.fillinDate).isAfter(acc.fillinDate)) {
					return curr;
				} else {
					return acc;
				}
			}
			return curr;
		}
		return acc;
	}, undefined);
	return received && received.fillinDate || ""
}
const readTime = receivers => {
	if (!receivers) {
		return "";
	}
	let received = receivers.reduce((acc, curr) => {
		if (curr.status && curr.status.read_date) {
			if (acc && acc.status && acc.status.read_date) {
				if (moment(curr.status.read_date).isAfter(acc.status.read_date)) {
					return curr;
				} else {
					return acc;
				}
			}
			return curr;
		}
		return acc;
	}, undefined);
	return received && received.status.read_date || ""
}

@View
@Connect(
	state => ({
		order: state.order,
		suborder: state.order.receivers && state.order.receivers[0],
		receivedNum: receivedNum(state.order.receivers),
		shippedNum: shippedNum(state.order.receivers),
		listenedNum: listenedNum(state.order.receivers),
		receivedTime: receivedTime(state.order.receivers),
		shippedTime: shippedTime(state.order.receivers),
		readTime: readTime(state.order.receivers),
		clientWidth: state.clientWidth
	}),
	dispatch => ({
		enterPersonalOrderInfo: (next, ctx) => dispatch(actions.enterPersonalOrderInfo(next, ctx))
	})
)
export default class PersonalOrderInfo extends riot.Tag {
	static originName = 'personal-order-info'

	get name() {
		return 'personal-order-info'
	}

	get tmpl() {
		return require('./tmpl/order.info.tag');
	}

	@onUse([interruptors.isSender, 'enterPersonalOrderInfo'])
	onCreate(opts) {}

	received() {
		if (this.opts.receivedNum) {
			route(`/personal/order/${this.opts.order.id}/info/received`);
		}
	};

	listened() {
		if (this.opts.listenedNum > 0) {
			route(`/personal/order/${this.opts.order.id}/info/listened`);
		}
	};
    
  shipped() {
		if (this.opts.shippedNum > 0){
			route(`/personal/order/${this.opts.order.id}/info/shipped`);
		}
	};

  jumpToAddressCard() {
		route(`/order/${this.opts.order.id}/ready`);
	}
}