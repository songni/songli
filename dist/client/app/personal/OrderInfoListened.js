import riot from 'riot';
import route from 'riot-route';
import { View, Connect, onUse } from '../../framework/ninjiajs/src/index';
import actions from './personal.actions';
 
@View
@Connect(
	state => ({
		order: state.order,
		suborders: state.suborderInteracts.suborders,
		clientWidth: state.clientWidth
	}),
	dispatch => ({
    enterPersonalOrderInfoListened: (next, ctx) => dispatch(actions.enterPersonalOrderInfoListened(next, ctx)),
  })
)
export default class PersonalOrderInfoListened extends riot.Tag {
	static originName = 'personal-order-info-listened'
	get name() {
		return 'personal-order-info-listened'
	}
	get tmpl() {
    return `
      <div class="order_info" each="{ suborder in opts.suborders }">
        <div class="suborder_img">
          <img riot-src="{ suborder.headimgurl }">
        </div>
        <div class="suborder_info" style="width: { parent.opts.clientWidth -90 }px" >
          <div class="name">
            <span>{ suborder.consignee }</span>
            <span>已收货</span>
          </div>
          <div class="time">
            <span>{ $.util.filter.date(suborder.status.read_date) }</span>
          </div>
        </div>
        <div class="express" >
          <div if="{ suborder.scene === 'logistics' }">
            <span>快递单号</span>
            <span>{ suborder.express.company.name } { suborder.express.no }</span>
          </div>
        </div>
      </div>
    `;
	}

  @onUse('enterPersonalOrderInfoListened')
	onCreate(opts) {}
}