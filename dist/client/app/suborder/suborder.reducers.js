const initSuborder = {
  consignee: null,
  address: null,
  telephone: null,
  poi: null,
}
const suborder = (suborder = initSuborder, action) => {
  switch (action.type) {
    case 'suborder/init':
      return initSuborder;
    case 'suborder/update': 
      return Object.assign({}, suborder, action.payload);
    default: 
      return suborder;
  }
}

const initSuborderInteracts = {
  suborders: [],
  busy: false,
  page: 1,
  limit: 10,
  params: {},
  count: 0,
}
const suborderInteracts = (suborderInteracts = initSuborderInteracts, { type, payload }) => {
  switch (type) {
		case 'suborderInteracts/init': 
			return Object.assign({}, suborderInteracts, payload);
		case 'suborderInteracts/params/update':
			return Object.assign({}, suborderInteracts, {params: payload});
		case 'suborderInteracts/page/increase':
			return Object.assign({}, suborderInteracts, {page: suborderInteracts.page + 1});
		case 'suborderInteracts/busy':
			return Object.assign({}, suborderInteracts, {busy: true});
		case 'suborderInteracts/unbusy':
			return Object.assign({}, suborderInteracts, {busy: false});
		case 'suborderInteracts/count':
			return Object.assign({}, suborderInteracts, {count: payload});
		case 'suborderInteracts/add':
			return Object.assign({}, suborderInteracts, {suborders: [...suborderInteracts.suborders, ...payload]});
		default: 
			return suborderInteracts;
	}
}

const initSuborderCount = {
  receivedCount: 0,
  readCount: 0,
  shippedCount: 0,
}

const suborderCount = (suborderCount = initSuborderCount, { type, payload }) => {
  switch (type) {
    case 'suborderCount/init': 
      return Object.assign({}, suborderCount, payload);
    case 'suborderCount/update':
      return Object.assign({}, suborderCount, payload);
    default: 
      return suborderCount;
  }
}

const initSuborderLatestTime = {
  receivedTime: null,
  shippedTime: null,
  readTime: null
}

const suborderLatestTime = (suborderLatestTime = initSuborderLatestTime, { type, payload }) => {
  switch (type) {
    case 'suborderLatestTime/init': 
      return Object.assign({}, suborderLatestTime, payload);
    case 'suborderLatestTime/update':
      return Object.assign({}, suborderLatestTime, payload);
    default: 
      return suborderLatestTime;
  }
}


export default {
  suborder,
  suborderInteracts,
  suborderCount,
  suborderLatestTime
}