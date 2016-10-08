MainController.$inject = ['$state', 'AuthService', 'SocketService']
export default MainController;

function MainController ($state, AuthService, SocketService) {
  let ctrl = this
  // vm exposed
  ctrl.name = 'Main'
  // Life Hooks
  ctrl.$onInit = function() {
    console.log(`Main Controller Loaded...`)
    if (!AuthService.isLoggedIn()) { $state.go('public.home') }
    
    SocketService.on('connected', function(res){
      toastr.success(res.message)
    });
  }  
};
