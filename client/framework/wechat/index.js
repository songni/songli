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
		'openCard'
	]

	constructor() {
		this.cmdQueue = new CmdQueue();

		WechatJsApiProxy.methods.forEach(m => {
			let me = this;
			me[m] = (...args) => {
				let promise = new Promise((resolve, reject) => {
					me.cmdQueue.enqueue({
						method: m,
						args,
						ctx: me,
						done: o => {
							if (o.type === 'fail' || o.type === 'cancel') {
								let errMsg = `[wx:jssdk] Reject action. [method]: ${m}, [type]: ${o.type}, [reason]: ${o.payload && o.payload.errMsg}`;
								let err  = new Error(errMsg);
								err.type = o.type;
								return reject(err);
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

	async config(apiList = WechatJsApiProxy.methods) {
		let absUrl = location.href;
		let data = await $.get('/wechat/sign/jssdk?type=jsapi&url=' + encodeURIComponent(absUrl).replace('%3A', ':'));
		if (!Array.isArray(apiList)) {
			console.warn(`[wx:jssdk]: wx config expected a array, but ${typeof apiList}`);
			return;
		}
		for (let i=0, len=apiList.length; i<len; i++) {
			let curr = apiList[i];
			if (WechatJsApiProxy.methods.indexOf(curr) < 0) {
				console.warn(`[wx:jssdk]: [config] invalid js api, ${curr}`);
				return;
			}
		}
		let config = {
			debug: false,
			appId: data.appId,
			timestamp: data.timestamp,
			nonceStr: data.nonceStr,
			signature: data.signature,
			jsApiList: apiList
		};
		wx.config(config);
	}

	async ready() {
		let promise = new Promise((resolve, reject) => {
			let timeout = setTimeout(() => {
				reject(new Error('wx js sdk timeout.'));
			}, 5000)
			if (UserAgent.isiOS) {
				wx.ready(function() {
					resolve()
					clearTimeout(timeout)
					return;
				})
			} else {
				this.config().then(() => {
					wx.ready(() => {
						resolve()
						clearTimeout(timeout)
						return;
					})
				})
			}
		})
		await promise;
	}

	async exec({ method, args, done }) {
		try {
			await this.ready();
		} catch(e) {
			throw e;
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
			done({ type: 'cancel', payload: res});
		}
		function fail(res) {
			originFail && originFail();
			failCb && failCb()
			done({ type: 'fail', payload: res});
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
		console.warn('[wx:jssdk]: wx is ready.')
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