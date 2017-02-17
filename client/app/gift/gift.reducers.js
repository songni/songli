const initPoi = {
  loaded: false
}
const poi = (poi = initPoi, action) => {
  switch (action.type) {
    case 'poi/loaded':
      return Object.assign({}, poi, { loaded: action.payload })
    default:
      return poi
  }
}

const qrForSubscribe = (qrForSubscribe = null, action) => {
	switch (action.type) {
		case 'qrcode/subscribe/update':
			return action.payload
		default:
			return qrForSubscribe
	}
}

const initGifts = {
	items: [],
  busy: false,
  page: 1,
  limit: 10,
  params: {},
	count: 0
}
const gifts = (gifts = initGifts, action) => {
	switch (action.type) {
		case 'gifts/init': 
			return Object.assign({}, gifts, action.payload);
		case 'gifts/params/update':
			return Object.assign({}, gifts, {params: action.payload});
		case 'gifts/page/increase':
			return Object.assign({}, gifts, {page: gifts.page + 1});
		case 'gifts/busy':
			return Object.assign({}, gifts, {busy: true});
		case 'gifts/unbusy':
			return Object.assign({}, gifts, {busy: false});
		case 'gifts/count':
			return Object.assign({}, gifts, {count: action.payload});
		case 'gifts/add':
			return Object.assign({}, gifts, {items: [...gifts.items, ...action.payload]});
		default: 
			return gifts;
	}
}

const gift = (gift = {}, action) => {
	switch (action.type) {
		case 'gift/update':
			return Object.assign({}, gift, action.payload)
		default:
			return gift;
	}
}

const suborders = (suborders = [], action) => {
	switch (action.type) {
		case '/gift/suborders/update':
			return action.payload;
		default:
			return suborders
	}
}

const pois = (pois = [], action) => {
  switch(action.type){
    case 'pois/update':
      return [...action.payload]
    default: 
      return pois;
  }
}

export default {
	gifts,
	gift,
	suborders,
	pois,
	poi,
	qrForSubscribe
}