import angular from 'angular';

import player from './player';

const module = angular.module('scAppModule', [
	player
]);

controller.$inject = [];
function controller() {
	"use strict";

}

module.component('scApp', {
	template: require('./scApp.html'),
	controller,
	controllerAs: 'scAppCtrl'
});

export default module.name;