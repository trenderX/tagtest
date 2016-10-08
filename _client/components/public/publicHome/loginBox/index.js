import angular from 'angular';
import loginBoxComponent from './loginBox.component';

const loginBoxModule = angular.module('app.loginBox', [])
.component('loginBox', loginBoxComponent)
.name;

export default loginBoxModule;
