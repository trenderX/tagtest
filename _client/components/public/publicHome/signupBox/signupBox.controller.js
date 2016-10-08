SignupBoxController.$inject = []
export default SignupBoxController;

function SignupBoxController () {
  let ctrl = this
  // vm exposed
  ctrl.name = 'SignupBox'
  // Life Hooks
  ctrl.$onInit = function() {
    console.log(`SignupBox Controller Loaded...`)
  }  

};
