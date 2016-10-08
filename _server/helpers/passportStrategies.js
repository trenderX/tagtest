var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var helpers = require('./helpers.js');
var moment = require('moment');

var User = require('../db/models/users.js');

// Serialize a user
passport.serializeUser(function (user, done) {
  // console.log('passport serializeUser:', user);
  done(null, { _id:user._id, email: user.email, first: user.first, last: user.last });
});

// Deserialize a user
passport.deserializeUser(function (user, done) {
  // lookup the db for the user then desarialize user 
  User.findOne({ '_id': user._id }, function (err, doc) {
    if (err) { 
      console.log(`DB error: ${err}`);
      return err;
    }
    return doc
  })
  .then(function (user) {
    done(null, user)
  })
  .catch(function (err) {
    console.log(`Passport deserializing err : ${err}`);
    done(err, null);
  });
});

passport.use('local-signup', new LocalStrategy(
  // We want to pass req.body so that we can get the additional fields at sign up, such as first name, last name
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  function (req, username, password, done) {
    

    User.findOne({ 'email': req.body.email }, function (err, doc) {
      if (err) { 
        return err;
      };
      user = doc;
      return doc;
    })        
    .then(function (user) {
      if (!user) {
        return helpers.generateHash(password); 
      } else {
        // user exist
        throw 'The user email provided already exist'
      }
    })
    // After hashing password, try to create
    .then(function (passHash) {
      if (passHash) {
        var newUser = {
          email: req.body.email,
          first: req.body.first,
          last: req.body.last,
          password: passHash,
        }

        var user = new User(newUser)
        return user.save(function(err) {
          if (err) { return err }
          return user
        })
      } else {
        throw 'Error Creating User'
      }
    })
    .then(function(user) {
      return done(false, true, {message:'User Created'})
    })
    .catch(function(err) {
      return done(err, false, {message: 'Error Creating User'})
    })
  }
));


passport.use('local-login', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password'},
  function (email, enteredPassword, done) {
    var user = null;
    User.findOne({ 'email': email }, function (err, doc) {
      if (err) { 
        return err;
      }
      return doc
    })
    .then(function (signedUser) {
      if (!signedUser) {
        throw 'User not found';
      } else {
        user = signedUser;
        return helpers.validPassword(enteredPassword, user.password);
      }
    })
    .then(function (isValid) {
      if (!isValid) {
        throw 'Invalid password';
      } else {
        //setting loged at time 
        user.save();
        done(false, user, { message: 'Successfully signed in' });
      }
    })
    .catch(function (err) {
      done(err, false, { message: 'Incorrect user details' });
    });
  }
));
