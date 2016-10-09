//Uses Express defines router
var express = require('express');
var router = express.Router();
var moment=require('moment');
var passport = require('passport');
var auth = require('../helpers/auth.js');
var helpers = require('../helpers/helpers.js');
var uuid = require('node-uuid');
var url = require('url');

//Uses DB config and Schema
var db = require('../db/db');
var Users = require('../db/models/users');

//*****ADD Auth.requireAuth as MIDDLEWARE FOR PRODUCTION******//

router.get('/', function (req, res) {
  Users.find({}, { password:0 }, function (err, docs) {
    if (err) { 
      console.log(`DB error: ${err}`);
      res.status(401).json({ 'error':true, data:err });
    } else {
      res.status(200).json({ error:false, data:docs });
    }
  })
});

// Get user info by id
router.get('/:id', function (req, res) {
  Users.findOne({'_id':req.params.id}, { password:0 })
  .populate('team', 'name')
  .populate('member_of', 'name')
  .exec()
  .then(function(doc){
    if (doc) {
      res.status(200).json({ error:false, data:doc });
    }
  })
  .catch(function(err){
    res.status(401).json({ error:true, data:err });      
  })
});

// Authenticates a user for sign-up 
router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
   if (err) {
      console.log(`Passport err: ${err}`);
      res.status(500).json({ created: false, error: true, message:err, data:null });
      return;
    }
    if (!user) {
      console.log(`Passport err: ${err}`);
      res.status(401).json({ created: false,error: true, message:err, data:null });
      return;
    }else{
      res.status(201).json({ created: true, message:info.message, data:null });      
    }
  })(req, res, next);
});

// Authenticates a user for login
router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) {
      console.log(`Passport err: ${err}`);
      res.status(401).json({ loggedIn: false, error: true, message:err, data:null });
      return;
    }
    if (!user) {
      res.status(401).json({ loggedIn: false, error: true, message:err, data:null });
      return;
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(401).json({ loggedIn: false, error: true, message:err, data:null});
      }
      res.cookie('isLoggedIn', true);
      res.cookie('userId', user._id);
      
      var userData = {
        _id: user._id,
        email: user.email,
        logged: user.logged,
      }

      res.status(200).json({ loggedIn: true, error:false, message:info.message, data:userData});
    });
  })(req, res, next);
});

// Signs a user out, have it as a post so that people cant be tricked into going to the link
router.post('/logout',  function (req, res) {
  req.logout();
  res.clearCookie('isLoggedIn');
  res.clearCookie('userId');
  res.status(200).json({ error:false, message:'logged Out', data:null });
});

// Update user info by id
router.put('/:userId', function (req, res) {
  var user = req.body;
  //if password is provided we don't want to overight it
  if (user.password) { delete user.password }

  Users.findByIdAndUpdate({ '_id' : req.params.userId }, { $set : user }, { new : true }, function(err, doc) {
    if (err) { 
      console.log(`DB error: ${err}`);  
      res.status(401).json({ error:true, data:err });
    } else {
      res.status(200).json({ error:false, message:'User Edited', data:doc });
    };
  });
});

module.exports = router;
