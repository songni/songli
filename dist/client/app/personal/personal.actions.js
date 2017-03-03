import Wechat from '../../framework/wechat/index';
import route from 'riot-route';

const enterPersonal = async (next, ctx) => async (dispatch, getState) => {
  next();
}
const enterPersonalOrderInfo = async (next, ctx) => async (dispatch, getState) => {
  next();
}

export default {
  enterPersonal,
  enterPersonalOrderInfo
}