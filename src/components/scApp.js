import angular from 'angular';

import player from './player';
import fmaService from '../services/fmaService';

const module = angular.module('scAppModule', [
	player,
	fmaService
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

module.component('scApp', {
	template: require('./scApp.html'),
	controller,
	controllerAs: 'scAppCtrl'
});

export default module.name;