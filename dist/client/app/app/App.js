import riot from 'riot';
import actions from './app.actions';
import { Connect } from '../../framework/ninjiajs/src/index';

@Connect(state => ({
	clientWidth: state.clientWidth,
	clientHeight: state.clientHeight
}), dispatch => ({
	setClientWidth: () => dispatch(actions.setClientWidth()),
	setClientHeight: () => dispatch(actions.setClientHeight())
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
				this.opts.setClientHeight()
			}, 50)
		}, true)
	}
}