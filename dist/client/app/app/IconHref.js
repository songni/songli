import riot from 'riot';
import route from 'riot-route';
import { Component } from '../../framework/ninjiajs/src/index';

@Component
export default class IconHref extends riot.Tag {
  static originName = 'icon-href'
	get name() {
		return 'icon-href'
	}

	get tmpl() {
		return `
			<div class="icon-href-container" >
				<a href="http://www.91songli.com/">
					<img riot-src="{'https://img.91pintuan.com/songli/icon-herf/' + theme + '_icon_xx.png' }">
				</a>
			</div>
		`;
	}
	
	onCreate() {
    !this.opts.theme && (this.opts.theme = 'white');
		this.theme = this.opts.theme;
	}
}
