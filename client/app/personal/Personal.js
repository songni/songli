import riot from 'riot';
import route from 'riot-route';
import { View, Connect, onUse } from '../../framework/ninjiajs/src/index';
import actions from './personal.actions';

@View
@Connect(null, dispatch => ({
	enterPersonal: (next, ctx) => dispatch(actions.enterPersonal(next, ctx))
}))
export default class Personal extends riot.Tag {
	static originName = 'personal'
	get name() {
		return 'personal'
	}
	get tmpl() {
		return `<router-outlet></router-outlet>`;
	}

	@onUse('enterPersonal')
	onCreate(opts) {}
}