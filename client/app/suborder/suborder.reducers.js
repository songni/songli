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

const initSuborderInteracts = {
  page: 0,
  limit: 10,
  suborders: [],
  busy: false
}
const suborderInteracts = (suborderInteracts = initSuborderInteracts, { type, payload }) => {
  switch (type) {
    case 'suborderInteracts/nextPage':
      let { originSuborders } = payload
      let { page, limit, suborders } = suborderInteracts
      let max = originSuborders.length
      let wants = (page + 1) * limit
      let counts = limit
      if (wants > max) {
        counts = max > limit ? limit: max
      }
      return Object.assign({}, suborderInteracts, {
        suborders: 
          [
            ...suborders,
            ...originSuborders.slice(page * limit, (page + 1) * counts),
          ],
        page: page + 1
      })
    case 'suborderInteracts/busy':
      return Object.assign({}, suborderInteracts, { busy: true })
    case 'suborderInteracts/unbusy':
      return Object.assign({}, suborderInteracts, { busy: false })
    case 'suborderInteracts/reset':
      return suborderInteracts;
    default:
      return suborderInteracts;
  }
}

export default {
  suborder,
  suborderInteracts
}