import angular from 'angular';
import Public from './public';
import Main from './main';

const components = angular.module('app.components', [
  Public,
  Main,
])
.name;

export default components;
