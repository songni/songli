'use strict';

var apiUri = {};
//pro
apiUri['91songli.cc'] = 'http://api.91songli.cc';
apiUri['91songli.com'] = 'http://api.91songli.com';
apiUri['wx.songni.cc'] = 'http://api.91songli.cc';
apiUri['dalibao.com'] = 'http://api.dalibao.com';
//dev
apiUri['dev.91songli.cc'] = 'http://apidev.91songli.cc';
apiUri['dev.songni.cc'] = 'http://apidev.91songli.cc';
apiUri['dev2.songni.cc'] = 'http://apidev.91songli.cc';

exports = module.exports = {
  development:{//开发版
    uri: 'http://apidev.91songli.cc',
    imgUri: 'img.91pintuan.com',
    phtUri: 'photo.91pintuan.com',
    phtUriExotic: 'http://photo.91pintuan.com',
    component: '5726bf8700bbe21526c4ccbe',
    apiUri: apiUri,
    debug: true,
    from: 'client'
  },
  production: {//产品版本
    uri: 'http://api.91songli.cc',
    imgUri: 'img.91pintuan.com',
    phtUri: 'photo.91pintuan.com',
    phtUriExotic: 'http://photo.91pintuan.com',
    component: '5581117b5f225e4c401c9259',
    apiUri: apiUri,
    debug: false,
    from: 'client'
  }
};
