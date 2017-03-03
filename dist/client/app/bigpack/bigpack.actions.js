import route from 'riot-route';

const enterBigpackDetail = async (next, ctx) => async (dispatch, getState) => {
	let { user } = getState();
	let order = await $.get(`/gift/order/${ctx.req.params.id}/detail`);
	if (!user.subscribe) {
		return route(`/bigpack/${order.id}/subscribe`)
	}
	if (order.sender && order.sender.openid === user.openid) {
		return route(`/order/${order.id}/ready`)
	}
	dispatch(({type: 'bigpack/update', payload: order}))
	next();
}

const enterBigpackRecord = async (next, ctx) => async (dispatch, getState) => {
	let { user, bigpack } = getState();
	if (bigpack.sender) {
		if (bigpack.sender.id === user.id) {
			return route(`/order/${bigpack.id}/ready`)
		}
		widgets.Alert.add('danger', app.config.messages.GIFT_RECEIVED, 2000);
		setTimeout(() => {
			route(`/`);
		}, 2000)
		return
	}
	next();
}
export default {
	enterBigpackDetail,
	enterBigpackRecord
}