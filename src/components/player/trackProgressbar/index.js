import './styles.less';

import angular from 'angular';

const module = angular.module('trackProgressbarModule', []);

function controller() {
	this.backgroundSize = '0 100%';

	this.$onChanges = () => {
		const width = this.currentTime / this.totalTime * 100;

		this.backgroundSize = `${width}% 100%`;
	};

	this.pickTime = (e) => {
		const rect = e.target.getBoundingClientRect();
		const percentage = (e.clientX - rect.left) / rect.width;

		this.seek({ time: percentage * this.totalTime });
	};
}

module.component('trackProgressbar', {
	template: require('./template.html'),
	controller,
	controllerAs: 'trackProgressbarCtrl',
	bindings: {
		currentTime: '<',
		totalTime: '<',
		seek: '&'
	}
});

module.filter('trackTime', () => {
	const prepareValue = (num) => {
		const number = parseInt(num);

		if(isNaN(number)) {
			return '--';
		}

		const str = number.toString();
		return str.length < 2 ? `0${str}` : str;
	};

	return (t) => `${prepareValue(t / 60)}:${prepareValue(t % 60)}`;
});

export default module.name;