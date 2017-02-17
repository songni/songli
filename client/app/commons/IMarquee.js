import riot from 'riot';
import route from 'riot-route';
import { Component } from '../../framework/ninjiajs/src/index';

@Component
export default class IMarquee extends riot.Tag {
  static originName = 'imarquee'
	get name() {
		return 'imarquee'
	}

	get css() {
		return `
			.marquee_container {
				position: relative;
				overflow: hidden;
			}
			.marquee_body {
				transition: margin 3s;
				transition-timing-function: linear;
				margin: 0px;
			}
		`
	}

	get tmpl() {
		return `
			<div class="marquee_container" style="height: { gap * (capacity - 1) }px">
				<div ref="marquee_body" class="marquee_body">
					<yield/>
				</div>
			</div>
		`;
	}
	
	onCreate(opts) {
		this.on('mount', this.componentDidMounted.bind(this));
		this.on('unmount', this.componentUnmounted.bind(this));
	}

	componentDidMounted() {
		this.gap = this.opts.gap || 60;
		this.height = this.opts.height;
		this.speed = parseInt(this.opts.speed) || 3000;
		this.index = 0;
		this.capacity = Math.ceil(parseInt(this.height / this.gap, 10));

		this.nextItem();
		
		setTimeout(() => {
			this.initPoi()
		}, 100)

		this.itemsInterval = setInterval(() => {
			this.nextItem();
			this.resetPoi();
		}, this.speed)	
	}

	nextItem() {
		let len = this.opts.items.length;
		let overload = this.index + this.capacity - len;
		let items = this.opts.items.slice(this.index, this.index + this.capacity)
		if (items.length < this.capacity) {
			items = items.concat(this.opts.items.slice(0, overload))
		}
		this.items = items;
		(overload > 0) && (this.index = 0) || this.index++
		this.update();
	}

	initPoi() {
		let marqueeBodyEl = document.querySelector('.marquee_body');
		marqueeBodyEl.style.transition = 'margin ' + this.speed / 1000 + 's';
		marqueeBodyEl.style.transitionTimingFunction = 'linear';
		marqueeBodyEl.style.marginTop = '-' + this.gap + 'px';
	}

	resetPoi() {
		let marqueeBodyEl = document.querySelector('.marquee_body');
		marqueeBodyEl.style.transition = 'none';
		marqueeBodyEl.style.marginTop = '0px';
		setTimeout(() => {
			this.initPoi();
		}, 100)
	}
	
	componentUnmounted() {
		clearInterval(this.itemsInterval)
	}
}
