import angular from 'angular';

// Components
import CommomComponents from './components';

// Services
import SocketService from './services/socket.service';
import AuthService from './services/auth.service';

// Models
import UserModel from './models/user.model';
import TagModel from './models/tag.model';

const common = angular.module('app.common', [
  CommomComponents,
])
// Common Services
.service('SocketService', SocketService)
.service('AuthService', AuthService)
// Common Models
.factory('User', UserModel)
.factory('Tag', TagModel)
.name;

export default common;
