import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Component, Form } from '../../framework/ninjiajs/src/index';

@Component
@Form({
  consignee: {
    required: true,
    minlength: 2,
    maxlength: 20
  },
  telephone: {
    required: true,
    minlength: 6,
    maxlength: 11
  },
  address: {
    required: true,
    maxlength: 500
  }
})
@Connect(
  state => ({
    order: state.order,
    isShare: state.orderReceiveCollection
  }),
  dispatch => ({
    share: actions.shareOrder,
    orderReceiveSubmit: o => dispatch(actions.orderReceiveSubmit(o))
  })
)
export default class OrderReceiveLogistics extends riot.Tag {
  static originName = 'order-receive-logistics'

  get name() {
    return 'order-receive-logistics'
  }

  get tmpl() {
    return require(`./tmpl/order.receive.logistics.tag`);
  }
	
  onCreate(opts) {
  }
  
  async onSubmit(e) {
    e.preventDefault();
    let { dispatch, getState } = app.store;
    let me = this;
    this.opts.submit('orderReceiveLogisticsForm')
    
    if (this.opts.forms.orderReceiveLogisticsForm.$invalid) {
      return;
    }

    let address = {
      consignee: this.refs['consignee'].value,
      telephone: this.refs['telephone'].value,
      address: this.refs['address'].value
    }
    await this.opts.orderReceiveSubmit(address);
  }    
}