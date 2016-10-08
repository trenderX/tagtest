import angular from 'angular';
import mainComponent from './main.component';

const mainModule = angular.module('app.main', [
])
.component('main', mainComponent)
.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
      .state('main', {
        url: '/main',
        component: 'main',
      })

    $urlRouterProvider.otherwise('/pub/home');
  })
.name;

export default mainModule;
