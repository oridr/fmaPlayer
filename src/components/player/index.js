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

controller.$inject = ['$scope'];
function controller($scope) {
	"use strict";

	const audio = new Audio();
	const $audio = angular.element(audio);

	this.playing = false;

	this.$onChanges = () => {
		this.currentTime = 0;
		this.totalTime = 0;

		this.trackData && (audio.src = this.trackData.audioUrl);
	};

	this.$onDestroy = () => $audio.off();

	$audio
		.on('durationchange', () => {
			this.totalTime = audio.duration;

			$scope.$digest(); // update only the local scope, and it's descendants
		})
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
		});

	this.play = () => audio.play();

	this.pause = () => {
		audio.pause();

		audio.autoplay = false;

		this.playing = false;
	};

	this.seek = (time) => audio.currentTime = time;
}

module.component('player', {
	template: require('./template.html'),
	controller,
	controllerAs: 'playerCtrl',
	bindings: {
		forward: '&',
		backward: '&',
		trackData: '<'
	}
});

export default module.name;