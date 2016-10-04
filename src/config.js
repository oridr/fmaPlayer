import angular from 'angular';

const module = angular.module('configModule', []);

module.constant('config', {
	fmaUrl: 'https://freemusicarchive.org/recent.json',
	imageLoadingUrl: '//res.cloudinary.com/dmc5off8m/image/fetch/w_500,h_500/',
	defaultBackground: 'http://res.cloudinary.com/dmc5off8m/image/upload/v1475591496/player_bg_dzc3sm.jpg'

});

export default module.name;