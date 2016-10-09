AutocompleteController.$inject = []
export default AutocompleteController;

function AutocompleteController () {
  let ctrl = this
  // vm exposed
  ctrl.name = 'Autocomplete'
  // Life Hooks
  ctrl.$onInit = function() {
    console.log(`Autocomplete Controller Loaded...`)
  }  

};
