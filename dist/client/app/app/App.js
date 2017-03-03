import riot from 'riot';
import actions from './app.actions';
import { Connect } from '../../framework/ninjiajs/src/index';

@Connect(state => ({
	clientWidth: state.clientWidth
}), dispatch => ({
	setClientWidth: () => dispatch(actions.setClientWidth())
}))
export default class App extends riot.Tag {
	static originName = 'app'
	get name() {
		return 'app'
	}
	get tmpl() {
		return `
			<router-outlet></router-outlet>
		`
	}
	onCreate(opts) {
		window.addEventListener('resize', () => {
			$.util.throttle(() => {
				this.opts.setClientWidth()
			}, 50)
		}, true)
	}
}