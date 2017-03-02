import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Form, Component } from '../../framework/ninjiajs/src/index';

@Component
@Form({
  consignee: {
    required: true,
    minlength: 1,
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
	}),
  dispatch => ({
    orderReceiveSubmit: o => dispatch(actions.orderReceiveSubmit(o))
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
      props: {
        poi: this.opts.poi
      }
    })
    modalInstance.one('dismiss', poi => {
      this.refs['poi'].value = poi;
      triggerDomEvent('change', this.refs['poi']);
      function triggerDomEvent(eventName, root){
        var e = document.createEvent('Event')
        e.initEvent(eventName, true, true)
        setTimeout(() => {
          root.dispatchEvent(e);
        }, 0)
      }
    })
    if (this.opts.poi && this.opts.poi.id) {
      this.refs['poi'].value = this.opts.poi.id;
    }
  }
  
  
  async onSubmit(e) {
    e.preventDefault();
    let { dispatch, getState } = app.store;
    let { suborder, order, user } = getState();
    this.opts.submit('orderReceivePoiForm')
    
    if (this.opts.forms.orderReceivePoiForm.$invalid) {
      return;
    }
    
    let address = {
      consignee: this.refs['consignee'].value,
      telephone: this.refs['telephone'].value,
      poi: suborder.poi
    }
    
    await this.opts.orderReceiveSubmit(address)
    
  }
  
}