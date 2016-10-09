//Uses Express defines router
var express = require('express');
var router = express.Router();
var moment=require('moment');
var url = require('url');

//Uses DB config and Schema
var db = require('../db/db');
var Tag = require('../db/models/tags');

router.get('/', function (req, res) {
  Tag.find({}, function (err, docs) {
    if (err) { 
      console.log('DB error:', err);
      res.status(401).json({ 'error': true, data: err });
    } else {
      res.status(200).json({ error: false, data: docs });
    }
  })
});

router.post('/seedTags', function (req, res) {
  
  var quantity = req.body.number

  if (quantity) {
    var tagArr = []
    
    for (i=0; i<=quantity; i++) {  
      var letters = Math.floor((Math.random() * 10) + 5)
      var tag = { value:createRandomWord(letters) }
      tagArr.push(tag)
    }
    
    Tag.collection.insert(tagArr, function(err, docs) {
      console.log('DB error:', err);
      if (err) { res.status(400).json({ error:true, data:err })}
      else {
        res.status(200).json({ error:false, message:`created ${docs.length} tags`, data:docs})
      }
    })
  }
  else {
    if (err) { res.status(400).json({ error:true, message:'You need to pass the number of tags', data:null })}

  }

  function createRandomWord(length) {
    var consonants = 'bcdfghjklmnpqrstvwxyz',
      vowels = 'aeiou',
      rand = function(limit) {
          return Math.floor(Math.random()*limit);
      },
      i, word='', length = parseInt(length,10),
      consonants = consonants.split(''),
      vowels = vowels.split('');
    for (i=0;i<length/2;i++) {
      var randConsonant = consonants[rand(consonants.length)],
          randVowel = vowels[rand(vowels.length)];
      word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
      word += i*2<length-1 ? randVowel : '';
    }
    return word;
  }
});



module.exports = router;
