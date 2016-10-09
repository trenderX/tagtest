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

  function inputValChange(inputVal) {
    ctrl.results = getResults(inputVal)
  } 

  function getResults (inputVal)  {
    
    let containsString = function(stringProp, word) {
      return stringProp.indexOf(word) >= 0 
    }
    
    let results = _.filter(ctrl.base, function(baseObj) {
      let testStr = baseObj[`${ctrl.key}`].toLowerCase()
      return containsString(testStr, inputVal)
    })
    
    return results 
  }

};
