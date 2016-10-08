import angular from 'angular';
import <%= name %>Component from './<%= name %>.component';

const <%= name %>Module = angular.module('<%= moduleName %>', [])
.component('<%= name %>', <%= name %>Component)
.name;

export default <%= name %>Module;
