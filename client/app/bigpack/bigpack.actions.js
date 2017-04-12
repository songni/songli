import route from 'riot-route';
import Wechat from '../../framework/wechat/index';

const enterBigpackDetail = async (next, ctx) => async (dispatch, getState) => {
	let { user } = getState();
	let order = await $.get(`/gift/order/${ctx.req.params.id}/detail`);
	dispatch(({type: 'bigpack/update', payload: order}))
	if (!user.subscribe && order.gift.scene != 'wb') {
		next()
		return route(`/bigpack/${order.id}/subscribe`)
	}
	if (order.sender && order.sender.openid === user.openid) {
		return route(`/order/${order.id}/ready`)
	}
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

const enterBigpackShoot = async (next, ctx) => async (dispatch, getState) => {
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

const uploadImage = async (dispatch, getState) => {
	try {
		let res = await Wechat.chooseImage({count: 1, sizeType: ['compressed']});
		if (!res.localIds.length) {
			throw new Error(`image expected.`);
		}
		dispatch({type: 'bigpack/update', payload: {localId: res.localIds[0]}})
	} catch(e) {
		widgets.Alert.add('danger', app.config.messages.UPLOAD_IMAGE_FAILED, 2000);
	}
}

const onSubmit = async (e, opts) => async (dispatch, getState) => {
	try {
		e.preventDefault()
		let { bigpack, user } = getState()

		if (!bigpack.localId) {
			widgets.Alert.add('danger', app.config.messages.UPLOAD_IMAGE_FAILED, 2000);
			return;
		}

		let res = await Wechat.uploadImage({
			localId: bigpack.localId,
			isShowProgressTips: 1
		});
		bigpack.serverId = res.serverId;
		await $.post(`/gift/order/${ bigpack.id }/complete`, bigpack)
		bigpack.sender = user;
		dispatch({type: 'order/update', payload: bigpack})
		let { order } = getState();
		route(`/order/${ bigpack.id }/ready`);
	} catch (e) {
		widgets.Alert.add('danger', e.message, 2000);
	}
}

export default {
	enterBigpackDetail,
	enterBigpackRecord,
	enterBigpackShoot,
	uploadImage,
	onSubmit
}