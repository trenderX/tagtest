var isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) { require('dotenv').load() }

var path = require('path');
var express = require('express');
var httpProxy = require('http-proxy');
// add db config file
var db = require('./db/db');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// passport.js authentification
var passport = require('passport');
require('./helpers/passportStrategies');
//  generate unique ids
var uuid = require('node-uuid');
//  display messages in dev mode
var morgan = require('morgan');

//parse body request, cookies
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// serve favicon
var favicon = require('serve-favicon');

//amazon web services
var aws = require('aws-sdk');
// Set up AWS to use our authorization keys
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
// Set the region in which our S3 bucket is located
aws.config.region = process.env.AWS_REGION;

var app = express();
app.use(favicon(__dirname + '/favicon.ico'))
// Use morgan to log requests to our express server to the console
app.use(morgan('dev'));
// Parse incoming request bodies as JSON
app.use(bodyParser.json());
// Parse incoming cookies
app.use(cookieParser());
//create and use sessionId
app.use(session({
  name: 'boiler-es6',
  secret: process.env.SESSION_SECRET || 'noSecret!',
  store: new MongoStore({ url: process.env.MONGOLAB_URI || 'mongodb://localhost/boiler-es6'}),
  resave: false, // Whether or not to save the session back to the store if no modification happened
  rolling: true, // Resets expiry date after each request
  saveUninitialized: false, // Save new sessions that havent been modified
  genid: function() { // Each session id will be based on uuid v4
    return uuid.v4();
  }
}));

// Set up passport so that we can use it to test authentication status
// As well as use it for authentication
app.use(passport.initialize());
app.use(passport.session());

// -- PROXY CONFIG --
var proxy = httpProxy.createProxyServer();

proxy.on('error', function(e) {
  console.log('ˁᵒ͡ˑ̉ᵒˀ Could not connect to proxy, please try again...');
});

var port = process.env.PORT || 3000;
//hot reload on dev server
var distPath = path.resolve(__dirname, '..', 'dist');
if (!isProduction) {
  // Any requests to localhost:3000/app-bundle is proxied
  // to webpack-dev-server
  app.all(['/app-bundle/*', '*.hot-update.json'], function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:3001'
    });
  });
}

// -- ROOT END POINTS -- 
app.use(express.static(distPath));

// -- API END POINTS -- 
var apiRouter = require('./routes/apiRouter');
// Mount our main api router
app.use('/api', apiRouter);

// -- LAST END POINT --
app.get('/*', function(req, res) {
  res.sendFile(path.join(distPath, 'index.html'));
});

// -- SOCKET CONFIG --
// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling

var io = require('socket.io').listen(app.listen(port,function(){
  console.log('ˁᵒ͡ˑ̉ᵒˀ Server running on port ' + port); 
}));
// app.listen(port);
io.sockets.on('connection', function (socket) {
  console.log('ˁᵒ͡ˑ̉ᵒˀ socket.io client connected');
  io.sockets.emit('connected', {message: 'Connected to Socket Server'});
});

// Make io accessible to end points 
app.use(function(req,res,next) {
    req.io = io;
    next();
});
