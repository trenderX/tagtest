import './autocomplete.css';
import template from './autocomplete.tmpl.html';
import controller from './autocomplete.controller';

const autocompleteComponent = {
  bindings: {
    base:'<', //array of passed objects
    key:'@',
    results:'&' // array of results
  },
  require: {},
  template,
  controller
};

export default autocompleteComponent;
