import Wechat from '../../framework/wechat/index';
import route from 'riot-route';
import giftActions from '../gift/gift.actions';

const enterOrderPay = async (next, ctx, tag) => async (dispatch, getState) => {
  let orderRaw = localStorage.getItem("order:recorded");
  if (!orderRaw) {
    widgets.Alert.add('warning', '当前订单已过期', 2000);
    setTimeout(() => {
      route('/');
    }, 2000)
    return;
  }
  let order = JSON.parse(orderRaw);
  dispatch({type: 'order/update', payload: order })
  dispatch(giftActions.getGiftById(order.gift));
  next();
}

const enterOrderSubscribe = async (next, ctx) => async (dispatch, getState) => {
  let qr = await $.get(`/gift/wx_qrcode?scene=giftSubToPushUnconsumedSuborder`)
  dispatch({type: 'qrcode/subscribe/update', payload: qr.response.ticket});
  next();
}

const wxPay = async function (tag) {
  let me = this;
  return async (dispatch, getState) => {
    me.submitted = true;
    setTimeout(() => {
      me.submitted = false;
    }, 5000);
    let order = getState().order;
    if (!order) {
      return;
    }
    let data = await $.post(`/gift/${order.gift}/preorder`, order)
    try {
      let res = await Wechat.chooseWXPay({
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign
      });
    } catch(e) {
      me.submitted = false;
      if (o.type === 'cancel') {
        widgets.Alert.add('warning', app.config.errors.PAY_CANCEL.message, 2000);
      } else {
        widgets.Alert.add('warning', app.config.errors.NETWORK_ERR.message, 2000);
      }
      return;
    }
    
    let url = `/gift/${order.gift}/order/${order.id}/ready`;
    route(url);
  }
}

const enterOrderRecord = async (next, ctx, tag) => async (dispatch, getState) => {
  let type = ctx.req.query['type'];
  let payload = { type }
  dispatch({ type: 'record/reset' })
  dispatch({ type: 'order/init' })
  if (type === 'one2one') {
    payload.capacity = 1;
  }	else {
    payload.capacity = 2;
  }
  payload.gift = tag.opts.gift.id;
  dispatch({ type: 'order/update', payload });
  next();
}

const enterOrderState = async ctx => async (dispatch, getState) => {
  let { order, user } = getState();
  if (order.sender.id === user.id) {
    return route(`/order/${order.id}/ready`);
  }
  
}

const enterOrderList = async (next, ctx, my) => async (dispatch, getState) => {
  $scope.gifts = new GiftOrder({
    my: true
  });
  let orders = await $.get('/gift/order?my=true');
  dispatch({type: 'orders/update', })
  
  next && next();
}

const nextPage = async my => async (dispatch, getState) => {
	let orders = getState().orders;
	if(orders.busy) return;
	dispatch({type: 'orders/busy', payload: true});
	let params = orders.params;

  my && (params['my'] = true)

	Object.assign(params, {limit: orders.limit, page: orders.page});
	let data = await $.get(`/gift/order/list/s?${$.util.querystring.stringify(params)}`);
	let count = data[0];
	var items = data[1];
	dispatch({type: 'orders/count', payload: count});
	dispatch({type: 'orders/add', payload: items});
	dispatch({type: 'orders/page/increase'});
	if((getState().gifts.items.length + items.length) >= count){
			dispatch({type: 'orders/busy', payload: true});
			return;
	}
	dispatch({type: 'orders/unbusy', payload: true});
}

const enterOrderReady = async () => async (dispatch, getState) => {
  let { order, user } = getState();

  if (order.sender.id != user.id) {
		widgets.Alert.add('danger', app.config.errors.NORIGHT_OPEN_PAGE.message, 2000);
		return route('/');
	}

  let iconLiImgUrl = order.gift.info.cover ? app.config.phtUri + order.gift.info.cover : app.config.images.SHARE_DEF_COVER;
  let leanOptions = {
    title: order.sender.name + app.config.messages.SHARE_INFO + order.gift.info.name,
    link: location.href,
    imgUrl: iconLiImgUrl 
  };
  let options = {
    title: order.sender.name + app.config.messages.SHARE_INFO,
    desc: order.gift.info.name,
    link: location.href,
    imgUrl: iconLiImgUrl
  };
  Wechat.onMenuShareTimeline(leanOptions);
  Wechat.onMenuShareAppMessage(options);
  Wechat.onMenuShareQQ(options);
  Wechat.onMenuShareWeibo(options);
}

const enterOrderReadyOne2One = async () => async (dispatch, getState) => {
	let { order, user } = getState();

	const isReceived = order => {
		return order.receivers && order.receivers[0] && order.receivers[0].telephone || false
	}

	if (!isReceived(order) && order.gift.scene === 'logistics') {
		dispatch({ type: 'order/receive/collection', payload: true });
	}
}

const getOrderById = async id => async (dispatch, getState) => {
	let order = await $.get(`/gift/order/${id}/detail`);
	dispatch(({type: 'order/update', payload: order}))
}

const shareOrder = () => {
	widgets.Modal.open({
		tag: 'gift-share-modal',
		size: 'lg'
	})
}

const orderReceiveSubmit = async (address) => async (dispatch, getState) => {
  let { order, user } = getState();
  if (address.poi) {
    address.scene = 'poi';
  }
  else if (address.address) {
    address.scene = 'logistics'; 
  }
  
  let data = await $.post(`/gift/order/${ order.id }/address`, address);

  if (!data.rc) console.error('saveAddr', app.config.errors.NO_RES_CODE.message);

  switch (data.rc) {
    case 1: 
      widgets.Alert.add('success', app.config.messages.GIFT_SAVED, 2000);
      break;
    case 2:
      widgets.Alert.add('success', app.config.messages.NO_GIFT_LEFT, 2000);
      break;
    case 3:
      widgets.Alert.add('success', app.config.messages.INFO_INCOMPLETE, 2000);
      break;
    case 4:
      if(address.scene === 'logistics'){
        return route(`/gift/${ order.gift.id }/share`)
      }
      if(address.scene === 'poi'){
        if(user.subscribe){
          return location.reload();	
        }
        return route(`/order/${ order.id }/subscribe`)
      }
      break;
    default:
      widgets.Alert.add('warning', app.config.errors.SERVER_ERROR.message, 2000);
      break;
  }
}




export default {
  enterOrderPay,
  enterOrderRecord,
  enterOrderSubscribe,
  enterOrderReady,
	enterOrderReadyOne2One,
  enterOrderState,
  enterOrderList,
  nextPage,
	getOrderById,
	shareOrder,
  orderReceiveSubmit,
  wxPay
}