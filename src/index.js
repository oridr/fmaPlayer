import 'styles/index.less';

import angular from 'angular';
import ngAnimate from 'angular-animate';

import services from './services';
import appMain from './components/appMain';

angular.module('app', [
	services,
	ngAnimate,
	appMain
]);