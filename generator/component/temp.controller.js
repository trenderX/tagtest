<%= upCaseName %>Controller.$inject = []
export default <%= upCaseName %>Controller;

function <%= upCaseName %>Controller () {
  let ctrl = this
  // vm exposed
  ctrl.name = '<%= upCaseName %>'
  // Life Hooks
  ctrl.$onInit = function() {
    console.log(`<%= upCaseName %> Controller Loaded...`)
  }  

};
