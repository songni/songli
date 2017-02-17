import riot from 'riot';
import route from 'riot-route';
import { Connect, Component } from '../../framework/ninjiajs/src/index';

const getRemainCount = order => {
	return state.order.capacity - state.order.receivers.length
}

@Component
@Connect(state => ({
	order: state.order,
	remainCount: getRemainCount(state.order)
}))
export default class OrderInteract extends riot.Tag {
  static originName = 'order-interact'
  get name() {
    return 'order-interact'
  }
  get tmpl() {
    return `
			<div if="{ (opts.order.capacity > 1) && opts.order.receivers && opts.order.receivers.length }" class="interact">
				<p>{ opts.order.receivers.length }人已领取 ，<span if="{ opts.remainCount === 0 }">礼物已经领完</span><span if="{ remainCount !== 0 }">还有{ remainCount }份</span></p>
				<ul>
					<li each="{ receiver in receivers }">
							<img riot-src="{ receiver.headimgurl }"/>
							<span class="receiver-name">{ receiver.name || receiver.consignee } </span>
							<span class="font"> 已领取</span>
							<span class="date">{ $.util.format(receiver.fillinDate, 'MM-dd HH:mm:ss') }</span>
					</li>
				</ul>
			</div>
		`;
  }
  onCreate(opts) {
		this.receivers = [];

		this.on('update', () => {
			if (this.opts.order.receivers) {
				this.receivers = this.opts.order.receivers.sort((a, b) => {
					return a.id - b.id
				})
			}
		})
  }
}