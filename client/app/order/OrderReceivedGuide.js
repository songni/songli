import riot from 'riot';
import route from 'riot-route';
import actions from './order.actions';
import { Connect, Component} from '../../framework/ninjiajs/src/index';


@Component
@Connect(
  state => ({
    order: state.order,
  })
)
export default class OrderReceivedGuide extends riot.Tag {
  static originName = 'order-received-guide'

  get name() {
    return 'order-received-guide'
  }

  get tmpl() {
    return require(`./tmpl/order.received.guide.tag`);
  }
  
  onCreate(opts) {
  }
}