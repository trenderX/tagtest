PublicHomeController.$inject = ['$state','$cookies', 'User', 'AuthService'];
export default PublicHomeController;

function PublicHomeController($state, $cookies, User, AuthService) {
  let ctrl = this 
  // vm exposed
  ctrl.message = 'What are you developing today?'
  ctrl.login = false
  ctrl.signup = false
  ctrl.loginUser = loginUser
  ctrl.signupUser = signupUser
  ctrl.user = {
    email:'',
    password: '',
    first:'',
    last:'',
  }
  ctrl.clearUser = clearUser  
  
  // Life Hooks
  ctrl.$onInit = function() {
    console.log('PublicHome Controller Loaded...')
    if (AuthService.isLoggedIn()) { $state.go('main') }
  }

  function loginUser(user) { 
    let lcEmail = angular.lowercase(user.email)
    user.email = lcEmail

    User.logIn(user)
    .then(function(res) {
      if (res.loggedIn) {
        const userData = res.data        
          $state.go('main', { userId: userData._id })
      } else {
        throw res.message 
      }
    })
    .catch(function(err) {
      console.log(err)
      toastr.error(err)
    })
  }

  function signupUser(user) {
    User.signUp(user)
    .then(function(res) {
      if (res.created) {
        loginUser(user)
        toastr.success('Welcome! ', user.first)
        return user
      } else {
        throw res.message
      }
    })
    .catch(function(err) {
      toastr.error(err) 
    })
  }

  function clearUser() {
    ctrl.user = {
      email:'',
      password: '',
      first:'',
      last:'',
    }
  }

};
