LoginBoxController.$inject = []
export default LoginBoxController;

function LoginBoxController () {
  let ctrl = this
  // vm exposed
  ctrl.name = 'LoginBox'
  // Life Hooks
  ctrl.$onInit = function() {
    console.log(`LoginBox Controller Loaded...`)
  }  

};
