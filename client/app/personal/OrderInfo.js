import riot from 'riot';
import route from 'riot-route';
import { View, Connect, onUse } from '../../framework/ninjiajs/src/index';
import moment from '../../framework/moment';
import actions from './personal.actions';
import interruptors from '../interruptors';
import suborderActions from '../suborder/suborder.actions';


@View
@Connect(
	state => ({
		order: state.order,
		suborder: state.suborderInteracts.suborders[0],
		receivedNum: state.suborderCount.receivedCount,
		shippedNum: state.suborderCount.shippedCount,
		listenedNum: state.suborderCount.readCount,
		receivedTime: state.suborderLatestTime.receivedTime,
		shippedTime: state.suborderLatestTime.shippedTime,
		readTime: state.suborderLatestTime.readTime,
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
		return require('./tmpl/order-info.tag');
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