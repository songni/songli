import riot from 'riot';
import route from 'riot-route';
import actions from './gift.actions';
import { View } from '../../framework/ninjiajs/src/index';

@View
export default class Gift extends riot.Tag {
	static originName = 'gift'
	get name() {
		return 'gift'
	}
	get tmpl() {
		return `<router-outlet></router-outlet>`;
	}
	onCreate(opts) {
	}
}