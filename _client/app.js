// Styles
import 'normalize.css';
import 'angular-material/angular-material.css';
import 'toastr/build/toastr.min.css';

// Angular Dependencies
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAria from 'angular-aria';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import ngMaterial from 'angular-material';
import ngCookies from 'angular-cookies';
import ngInfiniteScroll from 'ng-infinite-scroll';

import AppComponent from './app.component';
import Common from './common';
import Components from './components';

angular.module('app', [
    // vendor 
    uiRouter,
    ngAria,
    ngAnimate,
    ngMessages,
    ngMaterial,
    ngCookies,
    ngInfiniteScroll,
    // app 
    Common,
    Components
  ])
  .config(($locationProvider, $mdThemingProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');

    $mdThemingProvider.theme('default')
    .primaryPalette('grey',{
      'default':'900',
    })
    .accentPalette('orange')
  })
  .component('app', AppComponent)
