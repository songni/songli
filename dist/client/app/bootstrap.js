import Cookies from '../framework/cookie';
import originConfig from '../../server/config/environment/shared';
import Wechat from '../framework/wechat/index';

const bootstrap = async (app, {origin}) => {
	try {
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
			let user = null;
			try {
				user = await $.get('/wechat/userinfo');
			} catch (e) {
				alert(JSON.stringify(e))
			}
			
			dispatch({type: 'user', payload: user});

		}
		
		
		let merchant = await $.get('/merchant');
		
		dispatch({type: 'merchant', payload: merchant})
		
		let configList = [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'chooseWXPay',
			'editAddress',
			'startRecord',
			'stopRecord',
			'onVoiceRecordEnd',
			'playVoice',
			'pauseVoice',
			'stopVoice',
			'getLocation',
			'onVoicePlayEnd',
			'uploadVoice',
			'downloadVoice',
			'openLocation'
		]
		Wechat.config(configList);
	} catch (e) {
		alert(e.message);
	}
}
export default bootstrap;