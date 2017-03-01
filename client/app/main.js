import riot from 'riot'
import wx from 'weixin-js-sdk'
import { promisify, promisifyAll } from '../framework/promisify'
import {} from '../framework/es6-polyfill'
import {} from '../framework/jquery'
import Cookies from '../framework/cookie'
import bootstrap from './bootstrap'
import config from './constant'
import { Ninjia, router, Connect, provider } from '../framework/ninjiajs/src/index'
import reducer from './registerReducers'
import middlewares from './middlewares'
import routes from './routes'
import App from './app/App'

if(process.env.NODE_ENV === 'development'){
  require('./main.scss')
}

window.libs = {
  riot,
  wx
}
window.riot = riot
window.wx = wx

/**
 * configure application.
 */
let app = Ninjia({container: window, reducer, middlewares, state: {}}) // container, reducer, middlewares, initialState

app.config = config

app.set('env', process.env.NODE_ENV ? process.env.NODE_ENV : 'development')

app.set('mode', 'browser')

app.set('context', { store: app.store, hub: router.hub, tags: {}, util: {promisify, promisifyAll}})

router.hub.routes = routes

app.router(router)

riot.util.tmpl.errorHandler = e => {}
/**
 * application ready callback.
 */
app.start(async () => {
  /**
  * export app to global.
  */
  window.app = app
  let origin = location.host.replace(location.host.split('.')[0], '').slice(1)
  await bootstrap(app, {origin})
  /**
  * router interceptors.
  */
  app.hub.subscribe('history-pending', async (from, to, $location, { req }, next) => {
    if (req.body.authenticate && !Cookies.get('token')) {
      let query = req.query
      let referer = location.pathname + location.search
      referer = referer.startsWith('/') ? referer : '/' + referer
      Cookies.set('referer', referer)
      let link = await $.get(`/wechat/client?referer=${referer}`)
      location.href = link.link
      return
    }
    next && next()
  })

  app.hub.on('history-resolve', (from, to, ctx, hints, index) => {
  })

  /**
   * import all required tags. (previously tag, compile needed)
  */
  require('./commons/on-scroll.html')
  require('./commons/modal.html')
  require('./commons/alert.html')
  require('./commons/rlink.html')
  require('./commons/img-lazy-loader.html')
  require('./commons/bottom.html')
  require('./commons/raw.html')
  require('./commons/carousel.html')
  require('./commons/progressbar.html')
  require('./commons/radio-group.html')
  require('./commons/radio.html')
  require('./commons/RouterOutlet.js')
  require('./commons/IMarquee.js')

  require('./app/IconHref.js')

  require('./gift/GiftShareModal.js')
  require('./gift/GiftPoiModal.js')
  require('./order/MerchantInfo.js')

  require('./order/OrderRecordTimer.js')
  require('./order/OrderRecordVoice.js')
  require('./order/OrderList.js')
  require('./order/OrderInteract.js')
  require('./order/OrderReadyOne2One.js')
  require('./order/OrderReadyOne2Many.js')
  require('./order/OrderReceive.js')
  require('./order/OrderReceivePoi.js')
  require('./order/OrderReceiveLogistics.js')
  require('./order/OrderReceivedGuide.js')
  require('./order/OrderPreReceive.js')
    

  /**
   * register widgets.
  */
  app.registerWidget({
    name: 'alert',
    methods: ['add']
  })

  app.registerWidget({
    name: 'modal',
    methods: ['open']
  })
    
  window.widgets.Alert = app.context.tags['alert']
  window.widgets.Modal = app.context.tags['modal']
  /**
   * set entry for the application.
  */
  let entry = new App(document.getElementById('app'), {store: app.store})

  app.hub.root = entry

  app.set('entry', entry)

  /**
   * set provider for redux.
  */
  provider(app.store)(app.entry)
})
