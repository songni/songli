import App from './app/App';
import GiftList from './gift/GiftList';
import Gift from './gift/Gift';
import GiftDetail from './gift/GiftDetail';
import Order from './order/Order';
import OrderRecord from './order/OrderRecord';
import OrderPay from './order/OrderPay';

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
			path: '/wepay',
			branch: true,
			// component: OrderPay,
			component: ctx => {
				let components = {
					OrderPay
				}
				let c = ctx.req.query.component
				if (components[c]) {
					return components[c];
				}
			}
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
									path: '/record',
									component: OrderRecord,
									authenticate: true
								}
							]
						}
					]
				}
			]
		}
	]
}