import angular from 'angular';
import autocompleteComponent from './autocomplete.component';

const autocompleteModule = angular.module('app.autocomplete', [])
.component('autocomplete', autocompleteComponent)
.name;

export default autocompleteModule;
