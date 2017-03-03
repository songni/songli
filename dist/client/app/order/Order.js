import riot from 'riot';
import route from 'riot-route';
import { View } from '../../framework/ninjiajs/src/index';

@View
export default class Order extends riot.Tag {
	static originName = 'order'
	
	get name() {
		return 'order'
	}

	get tmpl() {
		return `<router-outlet></router-outlet>`;
	}

	onCreate(opts) {
	}
}