import riot from 'riot';
import route from 'riot-route';
import actions from '../order/order.actions'
import { View, Connect, onUse } from '../../framework/ninjiajs/src/index';

@View
@Connect(
	state => ({
		merchant: state.merchant,
		order: state.bigpack,
		clientWidth: state.clientWidth,
	})
)
export default class BigpackSubscribe extends riot.Tag {
	static originName = 'bigpack-subscribe'

	get name() {
		return 'bigpack-subscribe'
	}

	get tmpl() {
		return require('./tmpl/bigpack-subscribe.tag');
	}

	onCreate(opts) {
	}
}