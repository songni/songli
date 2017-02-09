import riot from 'riot';
import actions from './app.actions';
import { connect } from '../../framework/ninjiajs/src/index';

@connect(state => ({
	clientWidth: state.clientWidth
}), dispatch => ({
	setClientWidth: () => dispatch(actions.setClientWidth())
}))
export default class App extends riot.Tag {
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