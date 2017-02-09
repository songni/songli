import UserAgent from '../useragent/useragent'

const Wechat = {
	params: {
		url  : window.location.href,
		title : document.title,
		desc : this.url,
		img : 'http://static.91pintuan.com/logo.png'
	},
	config: async function(){
		let absUrl = location.href;
		$.get('/wechat/sign/jssdk?type=jsapi&url=' + encodeURIComponent(absUrl).replace('%3A', ':')).then(function(data){
			// app.store.dispatch({type: 'signature', payload: data.signature});
			let config = {
				debug: false,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'chooseWXPay',
					'editAddress',
					'startRecord',
					'stopRecord',
					'onVoiceRecordEnd',
					'playVoice',
					'pauseVoice',
					'stopVoice',
					'onVoicePlayEnd',
					'uploadVoice',
					'downloadVoice',
					'scanQRCode',
					'openAddress',
					'getLocation',
					'openLocation'
				]
			};
			wx.config(config);
		});
	},
	ready:function(data){
		if (UserAgent.isiOS) {
			wx.ready(done.bind(this))
		} else {
			this.config().then(() => {
				wx.ready(done.bind(this))
			})
		}

		function done () {
			
			if (typeof data === 'function') {
				return data()
			}

			try{
				data  = data || {};
				let url   = data.url ?  data.url  : this.params.url;
				let title = data.title? data.title: this.params.title;
				let desc  = data.desc?  data.desc : this.params.url;
				let img   = data.img ?  data.img  : this.params.img;

				let options = {
					title: title,
					desc: desc,
					link: url,
					imgUrl:  img,
					success: function(res){/*alert(res.errMsg)*/},
					cancel: function(res){/*Alert.add('warning',res.errMsg);alert(res.errMsg);*/},
					fail: function(res){/*alert(res.errMsg)*/},
					complete: function(res){/*alert(res.errMsg)*/},
					trigger: function(res){/*alert(res.errMsg)*/}
				};
				let optionsTimeline = {
					title: data.timeline,
					link: url,
					imgUrl:  img
				};
				wx.ready(function(){
					wx.onMenuShareTimeline(optionsTimeline);
					wx.onMenuShareAppMessage(options);
					wx.onMenuShareQQ(options);
					wx.onMenuShareWeibo(options);
				});
			}catch(e){
				alert(e.message);
			}
		}
	}
}

export default Wechat;