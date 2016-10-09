import angular from 'angular';
import mainComponent from './main.component';

// Child Components
import Autocomplete from './autocomplete';

const mainModule = angular.module('app.main', [
  Autocomplete,
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
