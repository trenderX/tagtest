NavController.$inject = ['$state','User']
export default NavController;

function NavController ($state, User) {
  let ctrl = this
  // vm exposed
  ctrl.name = 'Nav'
  ctrl.logOut = logOut 
  // Life Hooks
  ctrl.$onInit = function() {
    console.log(`Nav Controller Loaded...`)
  }  

  function logOut () {
    User.logOut()
    .then(function(res) {
      if (!res.error) {
        $state.go('public.home')
      }
    })
  }

};
