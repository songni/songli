const initRecord = {
	start: false,
	stop: true,
	record: false,
	playVoice: false,
	stopVoice: true,
}
const record = (record = initRecord, action) => {
	switch (action.type) {
		case 'record/reset':
			return initRecord;
		case 'record/update': 
			return Object.assign({}, record, action.payload);
		default: 
			return record;
	}
}

const initOrders = {
	items: [],
  busy: false,
  page: 1,
  limit: 10,
  params: {},
	count: 0
}
const orders = (orders = initOrders, action) => {
	switch (action.type) {
		case 'orders/init': 
			return Object.assign({}, orders, action.payload);
		case 'orders/params/update':
			return Object.assign({}, orders, {params: action.payload});
		case 'orders/page/increase':
			return Object.assign({}, orders, {page: orders.page + 1});
		case 'orders/busy':
			return Object.assign({}, orders, {busy: true});
		case 'orders/unbusy':
			return Object.assign({}, orders, {busy: false});
		case 'orders/count':
			return Object.assign({}, orders, {count: action.payload});
		case 'orders/add':
			return Object.assign({}, orders, {items: [...orders.items, ...action.payload]});
		default: 
			return orders;
	}
}

const initOrder = {
	localId: null,
	serverId: null,
	name: null,
	capacity: null,
	type: null,
	gift: null
}
const order = (order = initOrder, action) => {
	switch (action.type) {
		case 'order/init': 
			return initOrder;
		case 'order/update':
			return Object.assign({}, order, action.payload);
		default: 
			return order;
	}
}

const orderReceiveCollection = (orderReceiveCollection = false, action) => {
	if (action.type === 'order/receive/collection') {
		return action.payload
	}
	return orderReceiveCollection
}

export default {
	order,
	orders,
	record,
	orderReceiveCollection
}