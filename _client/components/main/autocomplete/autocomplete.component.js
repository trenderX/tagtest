import './autocomplete.css';
import template from './autocomplete.tmpl.html';
import controller from './autocomplete.controller';

const autocompleteComponent = {
  bindings: {
    callback:'<', // callback function that resolves in an array 
    key:'@',
    results:'&' // array of results
  },
  require: {
    parent:'^main'
  },
  template,
  controller
};

export default autocompleteComponent;
