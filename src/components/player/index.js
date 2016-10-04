import './styles.less';

import angular from 'angular';

import playerControls from './playerControls';
import trackDetails from './trackDetails';
import trackProgressbar from './trackProgressbar';

const module = angular.module('playerModule', [
	playerControls,
	trackProgressbar,
	trackDetails
]);

controller.$inject = ['$scope', '$q'];
function controller($scope, $q) {
	"use strict";

	const audio = new Audio();
	const $audio = angular.element(audio);
	const image = new Image();

	this.playing = false;
	this.loading = true;
	this.totalTime = 0;
	this.currentTime = 0;

	this.playerBg = 'http://res.cloudinary.com/dmc5off8m/image/upload/v1475591496/player_bg_dzc3sm.jpg';

	this.$onChanges = () => {
		this.loading = true;

		if(!this.trackData) {
			return;
		}

		$q.all([
				new Promise((resolve) => image.onload = () => {
					this.playerBg = this.trackData.trackImage;
					resolve();
				}),
				new Promise((resolve) => audio.onloadedmetadata = () => resolve())
			]
		).then(() => {
			this.loading = false;
			this.totalTime = audio.duration;
			this.currentTime = 0;
		});

		audio.src = this.trackData.audioUrl;
		image.src = this.trackData.trackImage;
	};

	this.$onDestroy = () => $audio.off();

	$audio
		.on('playing', () => {
			audio.autoplay = true;

			this.playing = true;

			$scope.$digest(); // update only the local scope, and it's descendants
		})
		.on('timeupdate', () => {
			this.currentTime = audio.currentTime;

			$scope.$digest(); // update only the local scope, and it's descendants
		})
		.on('ended', () => {
			$scope.$applyAsync(this.forward);
		})
		.on('error', () => {
			$scope.$applyAsync(this.forward);
		});

	this.play = () => audio.play();

	this.pause = () => {
		audio.pause();

		audio.autoplay = false;

		this.playing = false;
	};

	this.seek = (time) => this.loading || (audio.currentTime = time);
}

module.component('player', {
	template: require('./template.html'),
	controller,
	controllerAs: 'playerCtrl',
	bindings: {
		forward: '&',
		backward: '&',
		trackData: '<',
		scrollFromLeft: '<'
	}
});

export default module.name;