let api = {}

// 是不是收礼人
api.isUserReceived = async (orderId, userOpenid) => {
  return await $.get(`/gift/order/${orderId}/is_user_received?openid=${userOpenid}`)
}

// 已经被领取了多少
api.receivedCount = async orderId => {
  return await $.get(`/gift/order/${orderId}/received_count`)
}

export default api