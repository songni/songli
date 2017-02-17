const initBigpack = {
	localId: null,
	serverId: null,
	name: null,
	capacity: null,
	type: null,
	gift: null
}
const bigpack = (bigpack = initBigpack, action) => {
	switch (action.type) {
		case 'bigpack/init': 
			return initBigpack;
		case 'bigpack/update':
			return Object.assign({}, bigpack, action.payload);
		default: 
			return bigpack;
	}
}

export default {
	bigpack
}