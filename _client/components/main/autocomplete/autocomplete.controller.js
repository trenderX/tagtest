AutocompleteController.$inject = []
export default AutocompleteController;

function AutocompleteController () {
  let ctrl = this
  // vm exposed
  ctrl.name = 'Autocomplete'
  ctrl.inputVal = ''
  ctrl.inputValChange = inputValChange
  // Life Hooks
  ctrl.$onInit = function() {
    console.log(`Autocomplete Controller Loaded...`)
  }

  ctrl.$onChanges = function(argument) {
    //triggers when an element is added to the array
  } 

  function inputValChange(value) {
    console.log(value)
  } 

};
