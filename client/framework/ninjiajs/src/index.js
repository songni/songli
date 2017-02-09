import router from './router';
import register from './riot-tag';
import Application from './application';
import { provider, connect } from './riot-redux';
import viewCreator from './view';
import { view } from './riot-router-redux';
import form from './riot-redux-form';

let { hub } = router;

hub.view = viewCreator(hub);

hub.subscribe('history-pending', (from, to, location, ctx, next) => {
	if(from && from.tag){
		from.tag.trigger('before-leave');
	}
	next();
});

hub.subscribe('history-resolve', (from, to, ctx, hints, index, next) => {
	next();
});

hub.on('history-success', (from, to) => {
	// to && to.tag && to.tag.trigger('entered');
});

export { register, router, Application as Ninjia, provider, connect, view, form }