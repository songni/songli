import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Form, Component } from '../../framework/ninjiajs/src/index';

@Component
export default class OrderReceiveWb extends riot.Tag {
  static originName = 'order-receive-wb'

  get name() {
    return 'order-receive-wb'
  }

  get tmpl() {
		return `<div></div>`;
  }
	
  onCreate(opts) {
    console.warn(opts)
	}
  
}