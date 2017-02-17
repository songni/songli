import Wechat from '../../framework/wechat/index';
import route from 'riot-route';

const enterPersonal = async (next, ctx) => async (dispatch, getState) => {
  next();
}
const enterPersonalOrderInfo = async (next, ctx) => async (dispatch, getState) => {
  let { order, user } = getState();
  if (order.sender.id != user) {
    // widgets.Alert.add('danger', app.config.errors.NORIGHT_OPEN_PAGE.message, 2000);
    // setTimeout(() => {
    //   route(`/`);
    // }, 2000)
    // return;
  }
  next();
}

export default {
  enterPersonal,
  enterPersonalOrderInfo
}