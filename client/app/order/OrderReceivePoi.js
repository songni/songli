import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Form, Component } from '../../framework/ninjiajs/src/index';

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
  poi: {
    required: true,
  }
})
@Connect(
	state => ({
		order: state.order,
		clientWidth: state.clientWidth,
		poi: state.suborder.poi,
		poiLoaded: state.poi.loaded
	})
)
export default class OrderReceivePoi extends riot.Tag {
  static originName = 'order-receive-poi'

  get name() {
    return 'order-receive-poi'
  }

  get tmpl() {
		return require(`./tmpl/order.receive.poi.tag`);
  }
	
  onCreate(opts) {
    this.on('mount', () => {
      app.store.dispatch({type: 'poi/loaded', payload: true})  
    })
  }
  
  selPoi() {
    let pois = this.pois;
    let address = this.address;
    let modalInstance = widgets.Modal.open({
      tag: 'gift-poi-modal',
      size: 'lg'
    })
  }
  
  
  async onSubmit(e) {
    e.preventDefault();
    let { dispatch, getState } = app.store;
    let { suborder, order } = getState();
    this.opts.submit('orderReceivePoiForm')
    
    if (this.opts.forms.orderReceivePoiForm.$invalid) {
      return;
    }
    
    let address = {
      consignee: this.refs['consignee'].value,
      telephone: this.refs['telephone'].value,
      poi: suborder.poi.id
    }
    
    if(user.subscribe){       // 0未关注， 1 关注
      return location.reload();	
    }

    route(`/order/${order.id}/subscribe`);
  }
  
}