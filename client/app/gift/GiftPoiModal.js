import riot from 'riot';
import route from 'riot-route';
import { Component, Connect } from '../../framework/ninjiajs/src/index';
import actions from './gift.actions';

@Component
@Connect(
  state => ({
    order: state.order,
    pois: state.pois,
    clientWidth: state.clientWidth
  }),
  dispatch => ({
    getPois: () => dispatch(actions.getPois()),
    selectPoi: poi => dispatch(actions.selectPoi(poi))
  })
)
export default class GiftPoiModal extends riot.Tag {
  static originName = 'gift-poi-modal'
  get name() {
    return 'gift-poi-modal'
  }
  
  get tmpl() {
    return require('./tmpl/gift.poi.modal.tag');
  }
  
  onCreate(opts) {
    this.on('mount', this.onMount.bind(this));
  }
  
  selPoi(poi) {
    return e => {
      this.opts.selectPoi(poi);
      this.trigger('dismiss', poi);
    }
  }
  
  onMount() {
    this.opts.getPois();
  }
  
  dismiss() {
    this.trigger('dismiss')
  }
}