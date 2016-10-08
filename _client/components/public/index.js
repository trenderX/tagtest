import angular from 'angular';
import publicComponent from './public.component';

// Child Components
import PublicHome from './publicHome';

const publicModule = angular.module('app.public', [
  PublicHome,
])
.component('public', publicComponent)
.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
      .state('public', {
        abstract:true,
        url: '/pub',
        component: 'public',
      })
      .state('public.home', {
        url: '/home',
        component: 'publicHome',
      })
    
    $urlRouterProvider.otherwise('/pub/home');
  })
.name;

export default publicModule;
