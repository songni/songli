import riot from 'riot';
import route from 'riot-route';
import { Component } from '../../framework/ninjiajs/src/index';

@Component
export default class GiftShareModal extends riot.Tag {
	static originName = 'gift-share-modal'
	get name() {
		return 'gift-share-modal'
	}
  get css() {
    return `
      .share{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      .share img{
        width: 80%;
        float: right;
        margin-right: 2%;
      }
    `
  }
	get tmpl() {
		return `
      <div class="share" id="share" onclick="{ dismiss }">
        <img riot-src="{ shareSrc }" />
      </div>
		`;
	}
	onCreate(opts) {
    this.shareSrc = 'https://img.91pintuan.com/songli/gift_shared.png';
	}

  dismiss() {
    this.trigger('dismiss')
  }
}