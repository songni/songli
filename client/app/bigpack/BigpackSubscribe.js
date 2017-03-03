import riot from 'riot';
import route from 'riot-route';
import { View, Connect } from '../../framework/ninjiajs/src/index';

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
		//<!-- build:tmpl:begin -->
		return require('./tmpl/bigpack-subscribe.tag');
		//<!-- endbuild -->
	}
	onCreate(opts) {
	}
}