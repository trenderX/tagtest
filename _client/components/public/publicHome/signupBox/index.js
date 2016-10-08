import angular from 'angular';
import signupBoxComponent from './signupBox.component';

const signupBoxModule = angular.module('app.signupBox', [])
.component('signupBox', signupBoxComponent)
.name;

export default signupBoxModule;
