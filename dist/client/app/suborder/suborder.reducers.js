const initSuborder = {
  consignee: null,
  address: null,
  telephone: null,
  poi: null,
}
const suborder = (suborder = initSuborder, action) => {
  switch (action.type) {
    case 'suborder/init':
      return initSuborder;
    case 'suborder/update': 
      return Object.assign({}, suborder, action.payload);
    default: 
      return suborder;
  }
}

export default {
  suborder
}