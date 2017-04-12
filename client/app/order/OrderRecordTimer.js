import riot from 'riot';
import route from 'riot-route';
import { Component } from '../../framework/ninjiajs/src/index';

@Component
export default class OrderRecordTimer extends riot.Tag {
	static originName = 'order-record-timer'
	get name() {
		return 'order-record-timer'
	}
	get tmpl() {
		return `
		  <!--
			<div class="progress">
				<div class="progress-active" id="pro" aria-valuenow="{ countdown }" aria-valuemin="0" aria-valuemax="60" style="width: { progress ? progress : 0 }%;">
				</div>
			<div>
			-->
			<span class="progress-time" id="second">{ countdown === 60 ? '00:00' : $.util.filter.toDouble(60 - countdown) }</span>
		`;
	}
	onInit() {
		this.progress = 0;
		this.countdown = 60;
		this.maxtime = 60;
		this.proRecorded = 0;
		this.timeRecorded = 0;
		this.startTime = 0;
		this.endTime = 0;
		this.interval && clearInterval(this.interval);
		this.timeout && clearTimeout(this.timeout);
	}

	reset() {
		clearInterval(this.interval);
		clearTimeout(this.timeout);
		this.interval = null;
		this.timeout = null
		this.progress = 0;
		this.countdown = 60;
	}

	onCreate(opts) {
		this.on('unmount', this.reset)

		this.on('update', () => {
			this.maxtime = parseInt(this.opts.maxtime, 10) || 60;
			this.during = parseInt(this.opts.interval, 10) || 1000
		})

		this.on('timer:init', this.onInit.bind(this));

		this.on('timer:start', () => {
			this.reset();
			this.startTime = new Date();
			this.interval = setInterval(() => {
				this.progress += (100 * this.during / 1000) / (this.maxtime)
				this.countdown -= this.during / 1000;
				this.update();
			}, this.during)
		})

		this.on('timer:stop', () => {
			clearInterval(this.interval);
			this.endTime = new Date();
			this.proRecorded = this.progress;
			this.timeRecorded = this.endTime - this.startTime;
			this.startTime = 0;
			this.endTime = 0;
		})
		
		this.on('timer:pause', () => {
      clearInterval(this.interval);
    })

		this.on('timer:play', () => {
			this.reset();
			this.startTime = new Date();
			this.interval = setInterval(() => {
				this.progress += (100 * this.during / 1000) / (this.countdown)
				this.countdown -= this.during / 1000;
				this.update();
			}, this.during)
			this.timeout = setTimeout(() => {
				this.trigger('timer:stop');
			}, this.timeRecorded)
		})

		this.onInit();
	}

}