var path = require('path');
var express = require('express');

// routers declarations
var router = express.Router();
var usersRouter = require('./usersRouter');

// Middleware that checks if logged in and sets cookie to true
// Used so that Angular can check for this cookies existence to see if logged in or not
// Used only on production
// router.use(function(req, res, next) {
//   if (req.isAuthenticated()) {
//     res.cookie('isLoggedIn', true);
//   } else {
//     res.cookie('isLoggedIn', false);
//     req.logout();
//   }
//   next();
// });

// Set up our different api endpoints
router.use('/users', usersRouter);

var isProduction = process.env.NODE_ENV === 'production';
// serve our client assets
// asset folder in dev mode
var assetFolder = path.resolve(__dirname, '../../_client', 'assets')
// if production asset folder is copied to dist/app-bundle
if (isProduction) { var assetFolder = path.resolve(__dirname, '../../dist', 'app-bundle', 'assets') } 

router.use('/assets', express.static(assetFolder));

module.exports = router
