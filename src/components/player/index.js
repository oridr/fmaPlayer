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

controller.$inject = ['$element', '$scope'];
function controller($element, $scope) {
	"use strict";

	const $audio = $element.find('audio');
	const audioElement = $audio[0];

	this.playing = false;

	this.$onChanges = () => {
		this.currentTime = 0;
		this.totalTime = 0;

		this.playing && this.play();
	};

	this.$onDestroy = () => $audio.off();

	$audio
		.on('timeupdate', () => {
			this.currentTime = audioElement.currentTime;

			$scope.$digest(); // update only the local scope, and it's descendants
		})
		.on('playing', () => $scope.$applyAsync(() => {
			this.playing = true;
			this.totalTime = audioElement.duration;
		}))
		.on('ended', () => {
			$scope.$applyAsync(this.forward);
		});

	this.play = () => audioElement.play();

	this.pause = () => {
		audioElement.pause();

		this.playing = false;
	};

	this.seek = (time) => audioElement.currentTime = time;
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