import './styles.less';

import angular from 'angular';

const module = angular.module('playerControlsModule', []);

module.component('playerControls', {
	template: require('./template.html'),
	controllerAs: 'playerControlsCtrl',
	bindings: {
		playing: '<',
		backward: '&',
		forward: '&',
		play: '&',
		pause: '&'
	}
});

export default module.name;