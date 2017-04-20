import api from './suborder.api'

const nextPage = async (params={}) => async (dispatch, getState) => {
	let suborders = getState().suborderInteracts
	let order = getState().order
	
	if(suborders.busy) return;
	dispatch({type: 'suborderInteracts/busy', payload: true});
	
	let p = suborders.params;
	Object.assign(p, {limit: suborders.limit, page: suborders.page}, params);
	let data = await api.getSuborders(order.id, p)
	let count = data[0]
	let items = data[1]
	
	dispatch({type: 'suborderInteracts/count', payload: count})
	dispatch({type: 'suborderInteracts/add', payload: items})
	dispatch({type: 'suborderInteracts/page/increase'})
	
	if((suborders.suborders.length + items.length) >= count){
			dispatch({type: 'suborderInteracts/busy', payload: true})
			return
	}
	dispatch({type: 'suborderInteracts/unbusy', payload: true})
}
export default { nextPage }