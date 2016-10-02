import './styles.less';

import angular from 'angular';

const module = angular.module('trackDetailsModule', []);

module.component('trackDetails', {
	template: require('./template.html'),
	controllerAs: 'trackDetailsCtrl',
	bindings: {
		artistName: '<',
		trackName: '<'
	}
});

export default module.name;