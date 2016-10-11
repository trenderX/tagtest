TagModel.$inject = ['$http'];
export default TagModel;

function TagModel($http) {

  const model = {
      getAll,
      // getOne,
      // edit,
      seedTags,
  };

  function getAll(query) {
    return $http.get(`/api/tags?${query}`)  
    .then(function(res) {
      return res.data
    })
    .catch(function(err) {
      console.log('tags Api Err:', err);
      return err.data
    })
  }

  // function getOne(userId) {
  //   return $http.get(`/api/tags/${userId}`)
  //   .then(function(res) {
  //     return res.data
  //   })
  //   .catch(function(err) {
  //     console.log(`tags Api Err: ${err}`);
  //     return err.data
  //   })
  // }

  // function edit(userData) {
  //   return $http.put(`/api/tags/${userData._id}`, userData)
  //   .then(function(res) {
  //     return res.data
  //   })
  //   .catch(function(err) {
  //     console.log(`tags Api Err: ${err}`);
  //     return err.data
  //   });
  // };

  function seedTags(objInfo) {
    return $http.post('/api/tags/seedTags', objInfo)  
    .then(function(res) {
      return res.data
    })
    .catch(function(err) {
      console.log('tags Api Err:', err);
      return err.data
    })
  }
 
  return model;
}
