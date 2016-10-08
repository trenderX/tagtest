import angular from 'angular';
import navComponent from './nav.component';

const navModule = angular.module('app.nav', [])
.component('nav', navComponent)
.name;

export default navModule;
