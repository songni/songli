import route from 'riot-route';

const isNotSender = (next, ctx, tag) => {
  let { getState } = tag.store
	let { order, user } = getState();
  if (order.sender.id === user.id) {
    setTimeout(() => {
      route(`/order/${order.id}/ready`);
    }, 2000)
    return;
  }
	next();
}

const isSender = (next, ctx, tag) => {
  let { getState } = tag.store
	let { order, user } = getState();
  if (order.sender.id != user.id) {
    widgets.Alert.add('danger', app.config.errors.NORIGHT_OPEN_PAGE.message, 2000);
    setTimeout(() => {
      route(`/`);
    }, 2000)
    return;
  }
	next();
}
  

export default {
	isSender,
  isNotSender
}