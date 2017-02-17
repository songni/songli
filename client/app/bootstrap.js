import Cookies from '../framework/cookie';
import originConfig from '../../server/config/environment/shared';
import Wechat from '../framework/wechat/index';

const bootstrap = async (app, {origin}) => {
    let {env, store} = app;
    let config = originConfig[env];
    let dispatch = store.dispatch;
    Object.assign($, $.ajax.base(`${config.apiUri[origin]}/api`));
		
		window.config = config;

    $.setErrorInterceptor((e, chain) => {
			let response = e.response;
			if(!response){
				console.error("[action Failed]")
				console.error(e);
				return;
			}
			if(response && response.status === 401) {
					
			}
    })

    $.addResponseInterceptor(response => {
			return response
    })

		let headers = {'X-API-From': config.from};
		Object.assign($, $.withProps({headers}));

		const getQuery = query => $.util.querystring.parse(window.location.search.replace('?', ''))[query];

		let code = getQuery('code');
    if(code){
			let res = await fetch(`${config.apiUri[origin]}/api/wechat/token?code=${code}`, {
				method: 'get',
				headers: {
						'X-API-From': config.from,
						'X-Component': config.component
				}
			});
			let { token } = await res.json();
			if(token){
				Cookies.set('token', token);
			}
			let referer = Cookies.get('referer');
			location.href = `${location.origin}${referer}`;
			return;
    }

		let token = Cookies.get('token'); 
		
    if(token) {
			headers.Authorization = token;
			Object.assign($, $.withProps({headers}));
			let user = await $.get('/wechat/userinfo');
			dispatch({type: 'user', payload: user});
    }

		let merchant = await $.get('/merchant');
		app.store.dispatch({type: 'merchant', payload: merchant})

		Wechat.config();

    wx.error(function(res){
      widgets.Alert.add('warn', res.errMsg);
    });

}
export default bootstrap;