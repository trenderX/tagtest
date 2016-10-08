import angular from 'angular';
import publicHomeComponent from './publicHome.component';

// Child Components
import LoginBox from './loginBox';
import SignupBox from './signupBox';

const publicHomeModule = angular
  .module('app.publicHome', [
    LoginBox,
    SignupBox,
  ])
  .component('publicHome', publicHomeComponent)
  .name;

export default publicHomeModule;
