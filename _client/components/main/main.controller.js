MainController.$inject = ['$state', 'AuthService', 'SocketService', 'Tag']
export default MainController;

function MainController ($state, AuthService, SocketService, Tag) {
  let ctrl = this
  // vm exposed
  ctrl.name = 'Main'
  ctrl.tags = []
  ctrl.seedTags = seedTags
  // Life Hooks
  ctrl.$onInit = function() {
    console.log(`Main Controller Loaded...`)
    if (!AuthService.isLoggedIn()) { $state.go('public.home') }
    getTags()
  }  

  function getTags() {
    Tag.getAll()
    .then(function(res) {
      if (!res.error) {
        ctrl.tags = res.data
      }
    })
  }

  function seedTags(number) {
    if (!number) {
      toastr.error('we need a number')
      return
    }

    let obj = {number:number}
    Tag.seedTags(obj)
    .then(function(res) {
      if (!res.error) {
      }
      console.log(res.data)
    })

  }
};
