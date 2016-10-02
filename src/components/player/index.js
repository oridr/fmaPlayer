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

controller.$inject = ['$element', '$scope', '$window'];
function controller($element, $scope, $window) {
	"use strict";

	const $audio = $element.find('audio')[0];

	this.playing = false;
	this.currentTime = 0;
	this.totalTime = 0;
	this.artistName = 'Childish Gambino';
	this.trackName = 'Candler Road';

	this.backward = () => console.log('back');
	this.forward = () => console.log('forward');

	this.changePlayingStatus = (status = true) => this.playing = status;

	this.getCurrentTime = () => {
		if(!this.playing) {
			return;
		}

		this.currentTime = $audio.currentTime;

		$scope.$digest(); // update only the local scope, and it's descendants

		$window.requestAnimationFrame(this.getCurrentTime);
	};

	this.play = () => $audio.play().then(() => {
		$scope.$apply(() => this.changePlayingStatus(true));

		this.totalTime = $audio.duration;

		this.getCurrentTime();
	});

	this.pause = () => {
		$audio.pause();
		this.changePlayingStatus(false);
	};
}

module.component('player', {
	template: require('./template.html'),
	controller,
	controllerAs: 'playerCtrl'
});

export default module.name;