import riot from 'riot';
import route from 'riot-route';
import { Connect, Component } from '../../framework/ninjiajs/src/index';

const getRemainCount = order => {
	return order.capacity - (order.receivers && order.receivers.length || 0)
}
const getSubordersSortedById = order => {
	return order.receivers && order.receivers.sort((a, b) => {
		return a.id - b.id
	}) || []
}

const isInteract = order => {
  if (order.gift.scene != 'wb' && 
      order.receivers &&
      order.receivers.length && 
      order.receivers.filter(r => r.telephone).length > 0){
    return true;
  }
  if (order.gift.scene === 'wb' && 
      order.receivers && 
      order.receivers.length &&
      order.receivers.length > 0){
    return true;
  }
  return false;
}

@Component
@Connect(state => ({
	order: state.order,
	remainCount: getRemainCount(state.order),
	suborders: getSubordersSortedById(state.order),
	isInteract: isInteract(state.order)
}))
export default class OrderInteract extends riot.Tag {
  static originName = 'order-interact'

  get name() {
    return 'order-interact'
  }

  get tmpl() {
    return `
			<div if="{ opts.isInteract }" class="interact">
				<p>{ opts.order.receivers.length }人已领取 ，<span if="{ opts.remainCount === 0 }">礼物已经领完</span><span if="{ opts.remainCount !== 0 }">还有{ opts.remainCount }份</span></p>
				<ul>
					<li each="{ suborder in opts.suborders }">
							<img riot-src="{ suborder.headimgurl }"/>
							<span>{ suborder.name || suborder.consignee }</span>
							<span> 已领取</span>
							<span>{ $.util.filter.date(suborder.fillinDate, 'MM-dd hh:mm:ss') }</span>
					</li>
				</ul>
			</div>
		`;
  }

  onCreate(opts) {}
}