import angular from 'angular';
import Nav from './nav';

const commonComponents = angular.module('app.commonComponents', [
  Nav,
])
.name;

export default commonComponents;
