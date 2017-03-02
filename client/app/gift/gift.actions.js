import Wechat from '../../framework/wechat/index';

const enterGiftShare = async (next, ctx) => async (dispatch, getState) => {
	let limit = 20;
	let id = ctx.req.params.id;
	let orders = await $.get(`/gift/order/list/s?limit=${limit}&id=${id}`);
	if (orders[1].length) {
			let suborders = [];
			for (let i=0, len=orders[1].length; i<len; i++) {
					let order = orders[1][i];
					for (let j=0, len=order.receivers.length; j<len; j++) {
							let suborder = order.receivers[j]
							if (suborders.length >= limit) {
									break;
							}
							suborders.push(suborder);
					}
			}
			dispatch({ type: '/gift/suborders/update', payload: suborders })
	}
	next();
}

const enterGiftList = async (next, ctx) => async (dispatch, getState) => {
	dispatch({type: 'gifts/reset'});
	let merchant = getState().merchant;
	let leanOptions = {
		title: merchant.info.name + app.config.messages.SHARE_DESC,
		link: location.href,
		imgUrl: app.config.images.SHARE_DEF_COVER
	};
	let options = {
		title: app.config.messages.SHARE_TITLE,
		desc: merchant.info.name + app.config.messages.SHARE_DESC,
		link: location.href,
		imgUrl: app.config.images.SHARE_DEF_COVER
	};
	await Wechat.config();
	wx.onMenuShareTimeline(leanOptions);
	wx.onMenuShareAppMessage(options);
	wx.onMenuShareQQ(options);
	wx.onMenuShareWeibo(options);
	next();
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

const enterGiftDetail = async (next, ctx) => async (dispatch, getState) => {
	let id = ctx.req.params.id;
	await dispatch(getGiftById(id));
	let { gift } = getState();
	let iconLiImgUrl = gift.info.cover ? app.config.phtUri + gift.info.cover : app.config.images.SHARE_DEF_COVER;
	let leanOptions = {
		title: gift.info.name,
		imgUrl: iconLiImgUrl 
	};
	let options = {
		title: app.config.messages.SHARE_TITLE,
		desc: gift.info.name,
		imgUrl: iconLiImgUrl 
	};
	await Wechat.config();
	wx.onMenuShareTimeline(leanOptions);
	wx.onMenuShareAppMessage(options);
	wx.onMenuShareQQ(options);
	wx.onMenuShareWeibo(options);
	next();
}

const getGiftById = async id => async (dispatch, getState) => {
	let gift = await $.get(`/gift/${id}`);
	dispatch(({type: 'gift/update', payload: gift}))
}

const getPois = async () => async (dispatch, getState) => {
  let { order } = getState();
  let { gift } = order;
  let res = null;
  if (gift.status && gift.status.lbs) {
		try {
			res = await Wechat.getLocation()  
		} catch(e) {
			widgets.Alert.add('warning', app.config.errors.LOCATION_NOAUTH.message);
		}
		let query = $.util.querystring.stringify({
			tag: gift.poitag,
			latitude: res.latitude || 0,
			longitude: res.longitude || 0
		});
		let pois = await $.get('/wechat/poi?' + query);
		dispatch({type: 'pois/update', payload: pois});
		dispatch({type: 'poi/loaded', payload: true});
  } else {
    const url = gift.poitag ? '/wechat/poi?tag=' + gift.poitag : '/wechat/poi';
    let pois = await $.get(url);
    dispatch({type: 'pois/update', payload: pois});
    dispatch({type: 'poi/loaded', payload: true})
  }
}

const selectPoi = poi => ({type: 'suborder/update', payload: { poi }})

export default {
	enterGiftList,
	enterGiftShare,
	enterGiftDetail,
	nextPage,
	getPois,
	selectPoi,
	getGiftById
}