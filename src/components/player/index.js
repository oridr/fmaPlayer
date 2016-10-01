import angular from 'angular';

const module = angular.module('playerModule', []);

controller.$inject = [];
function controller() {
	"use strict";

}

module.component('player', {
	template: require('./template.html'),
	controller,
	controllerAs: 'playerCtrl'
});

export default module.name;