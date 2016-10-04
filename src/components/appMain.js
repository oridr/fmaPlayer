import angular from 'angular';

import player from './player';

const module = angular.module('appMainModule', [
	player
]);

controller.$inject = ['fmaService'];
function controller(fmaService) {
	let currentIndex = 0;
	let tracks;

	this.scrollFromLeft = true;

	fmaService.getTracks().then((_tracks) => {
		tracks = _tracks;

		this.trackData = tracks[currentIndex];
	});

	const updateTrackData = (step) => {
		currentIndex = (tracks.length + currentIndex + step) % tracks.length;

		this.scrollFromLeft = step === 1;
		this.trackData = tracks[currentIndex];
	};

	this.forward = () => updateTrackData(1);
	this.backward = () => updateTrackData(-1);
}

module.component('appMain', {
	template: require('./appMain.html'),
	controller,
	controllerAs: 'appMainCtrl'
});

export default module.name;