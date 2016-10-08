import './signupBox.css';
import template from './signupBox.tmpl.html';
import controller from './signupBox.controller';

const signupBoxComponent = {
  bindings: {},
  require: {
    parent:'^publicHome'
  },
  template,
  controller
};

export default signupBoxComponent;
