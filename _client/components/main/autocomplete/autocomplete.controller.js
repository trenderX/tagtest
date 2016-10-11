AutocompleteController.$inject = ['Tag']
export default AutocompleteController;

function AutocompleteController (Tag) {
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
    if (inputVal.length === 0) {
      ctrl.results = []
      ctrl.parent.tags = []
    } else if (inputVal.length === 1) {
      getTags(inputVal)
      .then(function() {
        ctrl.results = getResults(ctrl.parent.tags, inputVal)
      })
    } else {
      ctrl.results = getResults(ctrl.parent.tags, inputVal)
    }  
  } 

// get tags
  function getTags(value) {
    let query = `value=${value}`
    return Tag.getAll(query)
    .then(function(res) {
      if (!res.error) {
        ctrl.parent.tags = res.data
      }
    })
  }

// calculate results
  function getResults (items, inputVal)  {
    
    let stringMatch = function(stringProp, word) {
      return stringProp.substring(0, word.length) === word
    }
    
    let results = _.filter(items, function(baseObj) {      
      let testStr = baseObj[`${ctrl.key}`].toLowerCase()
      return stringMatch(testStr, inputVal)
    })
    
    return results 
  }

};
