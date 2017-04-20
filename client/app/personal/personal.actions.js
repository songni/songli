import Wechat from '../../framework/wechat/index';
import route from 'riot-route';
import suborderActions from '../suborder/suborder.actions';
import api from '../suborder/suborder.api';

const enterPersonal = async (next, ctx) => async (dispatch, getState) => {
  next();
}
const enterPersonalOrderInfo = async (next, ctx) => async (dispatch, getState) => {
  let { order } = getState();
  
  let [shippedCount] = await api.getSuborders(order.id, { status: 'shipping' })
  let [readCount] = await api.getSuborders(order.id, { status: 'read' })
  let [receivedCount] = await api.getSuborders(order.id)
  dispatch({ type: 'suborderCount/update', payload: { readCount, shippedCount, receivedCount} });
  
  let [receivedTime, shippedTime, readTime] = await api.getLatestTime(order.id)
  dispatch({ type: 'suborderLatestTime/update', payload: { receivedTime, shippedTime, readTime} });
  
  next();
}

const enterPersonalOrderInfoListened = async (next, ctx) => async (dispatch, getState) => {
  await dispatch(suborderActions.nextPage({ status: 'read' }) )
  next();
}

const enterPersonalOrderInfoReceived = async (next, ctx) => async (dispatch, getState) => {
  await dispatch(suborderActions.nextPage() )
  next();
}

const enterPersonalOrderInfoShipped = async (next, ctx) => async (dispatch, getState) => {
  await dispatch(suborderActions.nextPage({ status: 'shipping' }) )
  next();
}

export default {
  enterPersonal,
  enterPersonalOrderInfo,
  enterPersonalOrderInfoListened,
  enterPersonalOrderInfoReceived,
  enterPersonalOrderInfoShipped
}