import Wechat from '../wechat/wechat'

const enterGiftList = async () => async (dispatch, getState) => {
	await dispatch(nextPage());
	
	let merchant = getState().merchant;
	Wechat.ready(function(){
		let iconLiImgUrl = 'https://img.91pintuan.com/songli/icon-herf/default-img.png';
		let leanOptions = {
			title: merchant.info.name + '的礼物货架',
			link: location.href,
			imgUrl: iconLiImgUrl 
		};
		let options = {
			title: '会说话的礼物',
			desc: merchant.info.name + '的礼物货架',
			link: location.href,
			imgUrl: iconLiImgUrl
		};
		wx.onMenuShareTimeline(leanOptions);
		wx.onMenuShareAppMessage(options);
		wx.onMenuShareQQ(options);
		wx.onMenuShareWeibo(options);
	})
}

const nextPage = async () => async (dispatch, getState) => {
	let gifts = getState().gifts;
	if(gifts.busy) return;
	dispatch({type: 'gifts/busy', payload: true});
	let params = gifts.params;
	Object.assign(params, {limit: gifts.limit, page: gifts.page});
	let data = await $.get(`/gift?${$.util.querystring.stringify(params)}`);
	let count = data[0];
	var items = data[1];
	dispatch({type: 'gifts/count', payload: count});
	dispatch({type: 'gifts/add', payload: items});
	dispatch({type: 'gifts/page/increase'});
	if((getState().gifts.items.length + items.length) >= count){
			dispatch({type: 'gifts/busy', payload: true});
			return;
	}
	dispatch({type: 'gifts/unbusy', payload: true});
}

const getGiftById = async id => async (dispatch, getState) => {
	let gift = await $.get(`/gift/${id}`);
	dispatch(({type: 'gift/update', payload: gift}))
}

export default {
	enterGiftList,
	nextPage,
	getGiftById
}