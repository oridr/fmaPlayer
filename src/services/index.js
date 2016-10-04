import angular from 'angular';

import fmaService from './fmaService';

const module = angular.module('services', []);

module.factory('fmaService', fmaService);

export default module.name;
