import App from './app/App';
import GiftList from './gift/GiftList';
import Gift from './gift/Gift';
import GiftDetail from './gift/GiftDetail';
import GiftShare from './gift/GiftShare';
import Order from './order/Order';
import OrderRecord from './order/OrderRecord';
import OrderPlace from './order/OrderPlace';
import OrderPay from './order/OrderPay';
import OrderDetail from './order/OrderDetail';
import Personal from './personal/Personal';
import OrderList from './personal/OrderList';
import OrderInfo from './personal/OrderInfo';
import OrderInfoReceived from './personal/OrderInfoReceived';
import OrderInfoShipped from './personal/OrderInfoShipped';
import OrderInfoListened from './personal/OrderInfoListened';
import OrderReady from './order/OrderReady';
import OrderState from './order/OrderState';
import OrderReceive from './order/OrderReceive';
import OrderSubscribe from './order/OrderSubscribe';
import OrderReceived from './order/OrderReceived';
import OrderGiftDetail from './order/OrderGiftDetail';
import OrderMock from './order/OrderMock';
import Bigpack from './bigpack/Bigpack';
import BigpackDetail from './bigpack/BigpackDetail';
import BigpackSubscribe from './bigpack/BigpackSubscribe';
import BigpackRecord from './bigpack/BigpackRecord';
import BigpackShoot from './bigpack/BigpackShoot';

export default {
	component: App,
	path: '',
	children: [
		{
			path: '/',
			component: GiftList,
			defaultRoute: true
		},
		{
			path: '/wepay/',
			authenticate: true,
			components: { OrderPay, OrderPlace }
		},
		{
			path: '/gift',
			component: Gift,
			abstract: true,
			children: [
				{
					path: '/list',
					component: GiftList
				},
				{
					path: '/:id',
					component: GiftDetail,
					children: [
						{
							path: '/order',
							component: Order,
							abstract: true,
							children: [
								{
									path: '/state',
									component: OrderState,
									authenticate: true
								},
								{
									path: '/record',
									component: OrderRecord,
									authenticate: true
								},
								{
									path: '/place',
									component: OrderPlace,
									authenticate: true
								}
							]
						},
						{
							path: '/share',
							component: GiftShare
						}
					]
				}
			]
		},
		{
			path: '/order',
			component: Order,
			abstract: true,
			children: [
				{
					path: '/:id',
					component: OrderDetail,
					authenticate: true,
					children: [
						{
							path: '/ready',
							component: OrderReady
						},
						{
							path: '/state',
							component: OrderState
						},
						{
							path: '/fillin',
							component: OrderMock
						},
						{
							path: '/receive',
							component: OrderReceive
						},
						{
							path: '/subscribe',
							component: OrderSubscribe
						},
						{
							path: '/received',
							component: OrderReceived
						},
						{
              path: '/detail',
              component: OrderGiftDetail
            }
					]
				}
			]
		},
		{
			path: '/personal',
			component: Personal,
			authenticate: true,
			children: [
				{
					path: '/order',
					component: Order,
					children: [
						{
							path: '/list',
							component: OrderList
						},
						{
							path: '/:id',
							component: OrderDetail,
							children: [
								{
									path: '/info',
									component: OrderInfo,
									children: [
										{
											path: '/received',
											component: OrderInfoReceived
										},
										{
											path: '/shipped',
											component: OrderInfoShipped
										},
										{
											path: '/listened',
											component: OrderInfoListened
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			path: '/bigpack',
			component: Bigpack,
			authenticate: true,
			abstract: true,
			children: [
				{
					path: '/:id',
					component: BigpackDetail,
					children: [
						{
							path: '/subscribe',
							component: BigpackSubscribe
						},
						{
							path: '/record',
							component: BigpackRecord
						},
						{
							path: '/shoot',
							component: BigpackShoot
						}
					]
				}
			]
		}
	]
}