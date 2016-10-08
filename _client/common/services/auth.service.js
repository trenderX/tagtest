AuthService.$inject = ['$state', '$cookies'];
export default AuthService;

function AuthService($state, $cookies) {

  const service = {
      isLoggedIn,
      userId  
  };

  function isLoggedIn() {
    const cookie = $cookies.get('isLoggedIn');
    return cookie === 'true';
  };
  
  function userId() {
    let id = $cookies.get('userId');
    if (id) {
      id = id.slice(3,id.length-1)
    }
    return id
  }
    
  return service;
}
