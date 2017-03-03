let u = navigator.userAgent;
const UserAgent = {
	isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
	isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

class WechatJsApiProxy {
	static methods = [
		'onMenuShareTimeline',
		'onMenuShareAppMessage',
		'onMenuShareQQ',
		'onMenuShareWeibo',
		'onMenuShareQZone',
		'startRecord',
		'stopRecord',
		'onVoiceRecordEnd',
		'playVoice',
		'pauseVoice',
		'stopVoice',
		'onVoicePlayEnd',
		'uploadVoice',
		'downloadVoice',
		'chooseImage',
		'previewImage',
		'uploadImage',
		'downloadImage',
		'translateVoice',
		'getNetworkType',
		'openLocation',
		'getLocation',
		'hideOptionMenu',
		'showOptionMenu',
		'hideMenuItems',
		'showMenuItems',
		'hideAllNonBaseMenuItem',
		'showAllNonBaseMenuItem',
		'closeWindow',
		'scanQRCode',
		'chooseWXPay',
		'openProductSpecificView',
		'addCard',
		'chooseCard',
		'openCard',
		'editAddress'
	]

	constructor() {
		this.cmdQueue = new CmdQueue();
		this.configList = WechatJsApiProxy.methods;
		this.init();
		WechatJsApiProxy.methods.forEach(m => {
			let me = this;
			me[m] = (...args) => {
				let promise = new Promise((resolve, reject) => {
					me.cmdQueue.enqueue({
						$location: window.location.href,
						method: m,
						args,
						ctx: me,
						resolve,
						reject,
						done: o => {
							if (o.type === 'fail' || o.type === 'cancel') {
								let errMsg = `[wx:jssdk] Reject action. [method]: ${m}, [type]: ${o.type}, [reason]: ${o.payload && o.payload.errMsg}`;
								let err  = new Error(errMsg);
								err.type = o.type;
								err.originMsg = o.payload && o.payload.errMsg || null;
								return reject(err.originMsg);
							}
							resolve(o.payload);
						}
					});
				})
				setTimeout(() => {
					promise.catch(e => {
						// noop
					})
				}, 0)
				return promise
			}
		})
	}

	async init () {
		await this.waitForWxJsApi(1000);
		console.warn('init wait for ok')
		wx.error(function(res){
			// alert(JSON.stringify(res));
			// this.config();
		});
	}

	async waitForWxJsApi(time = 50) {
		if (typeof wx === 'undefined') {
			setTimeout(async () => {
				await this.waitForWxJsApi(time);
			}, time)
		}
		console.info('[wx:jssdk]: wx is ready.')
	}

	async config () {
		await this._config();
		await new Promise((resolve, reject) => {
			wx.ready(() => { resolve() })
		})
		console.warn('config ok')
	}

	async _config(apiList) {
		let absUrl = location.href; 
		let data = await $.get('/wechat/sign/jssdk?type=jsapi&url=' + encodeURIComponent(absUrl).replace('%3A', ':'));
		if (!apiList) {
			apiList = WechatJsApiProxy.methods;
		}
		if (!Array.isArray(apiList)) {
			alert(`[wx:jssdk]: wx config expected a array, but ${typeof apiList}`);
			return;
		}

		let config = {
			debug: false,
			appId: data.appId,
			timestamp: data.timestamp,
			nonceStr: data.nonceStr,
			signature: data.signature,
			jsApiList: apiList
		};
		this.configList = apiList;

		wx.config(config);
	}

	async ready($location) {
		let promise = new Promise(async (resolve, reject) => {
			let timeout = setTimeout(() => {
				reject(`wx js api is timeout.`)
			}, 5000);
			if (UserAgent.isiOS) {
				done();
			} else {
				this._config().then(done)
			}
			function done () {
				
				wx.ready(function() {
					resolve()
					clearTimeout(timeout)
					return;
				})
			}
		})
		await promise;
	}

	async exec({ method, args, done, $location, resolve, reject }) {
		try {
			await this.ready($location);
		} catch(e) {
			return;
		}
		let [ arg = {}, successCb, failCb, cancelCb, completeCb ] = args;
		let originSuccess = arg.success
		let originFail = arg.fail
		let originCancel = arg.cancel
		function success(res) {
			originSuccess && originSuccess();
			successCb && successCb()
			done({ type: 'success', payload: res });
		}
		function cancel(res) {
			originCancel && originCancel();
			cancelCb && cancelCb()
			done({ type: 'cancel', payload: res });
		}
		function fail(res) {
			originFail && originFail();
			failCb && failCb()
			done({ type: 'fail', payload: res });
		}
		arg.success = success;
		arg.fail = fail
		arg.cancel = cancel

		wx[method].apply(wx, [arg])
	}
}

class CmdQueue {
	constructor(limit = 100){
		this.limit = limit;
		this.busy = false;
		this.queue = [];
		this.ready = false;
	}

	async waitForWxJsApi(time = 50) {
		if (typeof wx === 'undefined') {
			setTimeout(async () => {
				await this.waitForWxJsApi(time);
			}, time)
		}
		this.ready = true;
		console.info('[wx:jssdk]: wx is ready.')
	}

	enqueue(cmd) {
		if (this.crashed) {
			console.warn(`Wechat js sdk crashed.`);
			return;
		}
		this.queue.push(cmd)
		if (this.busy) {
			return;
		}
		this.startUp();
	}

	async startUp() {
		let cmd = this.queue[0];
		if (this.crashed) {
			this.queue = [];
			this.busy = false;
			return;
		}
		if (!cmd) {
			this.busy = false;
			return;
		}
		this.busy = true;
		if (!this.ready) {
			await this.waitForWxJsApi();
		}
		await this.exec(cmd);
		await this.startUp();
	}

	async exec(cmd) {
		let { ctx, args, method } = cmd;
		try {
			await ctx.exec(cmd);
		} catch(e) {
			console.warn(`
				Wechat js sdk crashed. a error ocurr in cmd queue.
				[message]: ${e.message}
			`);
			this.crashed = true;
			return;
		}
		
		this.queue.splice(0, 1);
	}
}

export default new WechatJsApiProxy();