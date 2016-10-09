import './autocomplete.css';
import template from './autocomplete.tmpl.html';
import controller from './autocomplete.controller';

const autocompleteComponent = {
  bindings: {
    tags:'<',
    result:'&'
  },
  require: {},
  template,
  controller
};

export default autocompleteComponent;
