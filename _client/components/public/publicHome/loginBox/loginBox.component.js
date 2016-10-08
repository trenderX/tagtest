import './loginBox.css';
import template from './loginBox.tmpl.html';
import controller from './loginBox.controller';

const loginBoxComponent = {
  bindings: {},
  require: {
    parent:'^publicHome'
  },
  template,
  controller
};

export default loginBoxComponent;
