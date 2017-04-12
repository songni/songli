'use strict';

let apiUriDev = {};
apiUriDev['wx.dev.91pintuan.com'] = 'https://apidev.91pintuan.com';
apiUriDev['99.dev.91pintuan.com'] = 'https://api99dev.91pintuan.com';

let apiUriPro = {};
apiUriPro['wx.91pintuan.com'] = 'https://api.91pintuan.com';
apiUriPro['91pintuan.com']    = 'https://api.91pintuan.com';
apiUriPro['99.91pintuan.com'] = 'https://api99.91pintuan.com'; 

let properties = {
  phtStlList: '@1e_1c_0o_0l_100sh_150h_150w_90q.src',
  phtStlList2: '@1e_1c_0o_0l_100sh_300h_300w_90q.src',
  phtStlList3: '@1e_1c_0o_0l_100sh_60h_60w_90q.src',
  phtStlList4: '@1e_1c_0o_0l_100sh_50h_50w_90q.src',
  phtStlList5: '@1e_1c_0o_0l_100sh_150h_300w_90q.src',
  phtWbQrcode: '@1e_1c_0o_0l_100sh_400h_300w_30q.src',
  images: {
    SHARE_DEF_COVER: 'http://91pt.oss-cn-beijing.aliyuncs.com/songli/icon-herf/default-img.png',
    GIFTSHRAE_DEF_COVER: 'https://img.91pintuan.com/songli/icon-herf/present_sent_demo.png',
    GIFT_DEF_COVER: 'https://img.91pintuan.com/songli/rose_demo.png'
  },
  messages: {
    GIFT_SAVED: '该礼物已被领取',
    NO_GIFT_LEFT: '手慢了，没有礼物了',
    INFO_INCOMPLETE: '信息不全',
    SHARE_INFO: '送你一份礼物，请点击领取。',
    SHARE_TITLE: '会说话的礼物',
    SHARE_DETAIL_CARE: '微信轻送礼，就用91送礼',
    SHARE_DESC: '的礼物货架',
    GIFT_REDUCE: '礼物份数至少是1份',
    GIFT_RECEIVED: '礼物已被他人领取',
    UPLOAD_IMAGE_FAILED: '请上传图片'
  },
  errors: {
    NORIGHT_OPEN_PAGE: {
      code: 404,
      message: '无权打开此页面'
    },
    SERVER_ERROR: {
      code: 500,
      message: '系统内部错误'
    },
    NO_RES_CODE: {
      code: 501,
      message: '没有response code !'
    },
    PAY_CANCEL: {
      code: 503,
      message: '您取消了支付'
    },
    PAY_FAIL: {
      code: 504,
      message: '支付失败'
    },
    NETWORK_ERR: {
      code: 502,
      message: '网络错误'
    },
    LOCATION_NOAUTH: {
      code: 801,
      message: '您拒绝授权获取地理位置'
    },
    VOICE_EXPECTED: {
      code: 505,
      message: '请录制祝福语'
    }
  }
}

let config = {
  development:{//开发版
    uri: 'https://apidev.91pintuan.com',
    imgUri:'https://img.91pintuan.com',
    phtUri:'https://photo.91pintuan.com',
    phtUriExotic:'http://photo.91pintuan.com',
    component: '5726bf8700bbe21526c4ccbe',
    apiUri: apiUriDev,
    debug:true,
    from:'client'
  },
  production:{//产品版本
    uri: 'https://api.91pintuan.com',
    imgUri:'https://img.91pintuan.com',
    phtUri:'https://photo.91pintuan.com',
    phtUriExotic:'http://photo.91pintuan.com',
    component: '5581117b5f225e4c401c9259',
    apiUri: apiUriPro,
    debug:false,
    from:'client'
  },
  test: {
    uri: 'https://apidev.91pintuan.com',
    imgUri:'https://img.91pintuan.com',
    phtUri:'https://photo.91pintuan.com',
    phtUriExotic:'http://photo.91pintuan.com',
    component: '5581117b5f225e4c401c9259',
    apiUri: apiUriPro,
    debug:false,
    from:'client'
  }
};

mixin(config.development, properties);
mixin(config.production, properties);
mixin(config.test, properties);

function mixin(t, s){
  for(var p in s){
    t[p] = s[p]
  }
}

export default config[process.env.NODE_ENV];
