let api = {}

api.getSuborders = async (orderId, params) => {
  return await $.get(`/gift/order/${orderId}/suborders?${params ? $.util.querystring.stringify(params): ''}`);
}

api.getLatestTime = async orderId => {
  return await $.get(`/gift/order/${orderId}/latest_time`);
}

export default api