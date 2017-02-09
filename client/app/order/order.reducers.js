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

const initOrder = {
	// order record
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

export default {
	order,
	record
}