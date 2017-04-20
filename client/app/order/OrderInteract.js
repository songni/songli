import riot from 'riot';
import route from 'riot-route';
import { Connect, Component } from '../../framework/ninjiajs/src/index';
import actions from './order.actions';
import suborderActions from '../suborder/suborder.actions';
import { createSelector } from 'reselect';

const orderSelector = state => state.order;
const receivedNumSelector = createSelector(
  orderSelector,
  order => {
    return  order.receivedCount;
  }
)

const getRemainCountSelector = createSelector(
  orderSelector,
  order => {
    return order.capacity - order.receivedCount;
  }
)

const getSubordersSortedByIdSelector = createSelector(
  orderSelector,
  order => {
    return order.receivers && order.receivers.sort((a, b) => {
      return a.id - b.id
    }) || []
  }
)

const isInteractSelector = createSelector(
  orderSelector,
  order => {
    return order.receivedCount > 0;
  }
)

@Component
@Connect(
  state => ({
    order: state.order,
    remainCount: getRemainCountSelector(state),
    isInteract: isInteractSelector(state),
    receivedNum: receivedNumSelector(state),
    suborderInteracts: state.suborderInteracts
  }),
  dispatch => ({
    nextPage: () => dispatch(suborderActions.nextPage())
  })
)
export default class OrderInteract extends riot.Tag {
  static originName = 'order-interact'

  get name() {
    return 'order-interact'
  }

  get tmpl() {
    return `
			<div if="{ opts.isInteract }" class="interact">
				<p>{ opts.receivedNum }人已领取 ，<span if="{ opts.remainCount === 0 }">礼物已经被领完</span><span if="{ opts.remainCount !== 0 }">还有{ opts.remainCount }份</span></p>
        <on-scroll 
        infinite-scroll='{ opts.nextPage }' 
        infinite-scroll-disabled='{ opts.suborderInteracts.busy }' 
        infinite-scroll-distance='{ 100 }'
        >
          <ul>
            <li each="{ suborder in parent.opts.suborderInteracts.suborders }">
              <img riot-src="{ suborder.headimgurl }"/>
              <span>{ suborder.name || suborder.consignee }</span>
              <span> 已领取</span>
              <span>{ $.util.filter.date(suborder.fillinDate, 'MM-dd hh:mm:ss') }</span>
            </li>
          </ul>
        </on-scroll>
			</div>
		`;
  }

  onCreate(opts) {
    let { dispatch } = app.store
    dispatch({type: 'suborderInteracts/reset'})
    dispatch(suborderActions.nextPage())
  }
}