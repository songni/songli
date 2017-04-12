import riot from 'riot';
import route from 'riot-route';
import { View, Connect, Form, onUse } from '../../framework/ninjiajs/src/index';
import Wechat from '../../framework/wechat/index';
import actions from './bigpack.actions';

@View
@Form({
	image: {
		required: true
	}
})
@Connect(
	state => ({
		merchant: state.merchant,
		order: state.bigpack,
		user: state.user,
		clientWidth: state.clientWidth
	}),
	dispatch => ({
		uploadImage: () => dispatch(actions.uploadImage),
		onSubmit: function(e){ return dispatch(actions.onSubmit(e, this.opts)) },
		enterBigpackShoot: (next, ctx) => dispatch(actions.enterBigpackShoot(next, ctx))
	})
)
export default class BigpackShoot extends riot.Tag {
	static originName = 'bigpack-shoot'

	get name() {
		return 'bigpack-shoot'
	}

	get tmpl() {
		return require('./tmpl/bigpack-shoot.tag');
	}

	@onUse('enterBigpackShoot')
	onCreate(opts) {}
}