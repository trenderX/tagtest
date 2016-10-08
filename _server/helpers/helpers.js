var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
// email dependencies
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

//General Helpers
var helpers = {};

helpers.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

helpers.validPassword = function(enteredPassword, passwordHash) {
  return bcrypt.compareSync(enteredPassword, passwordHash);
};

helpers.sendEmail = function (message) {
  // nodemailer configuration
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      })
    }
  });

  return transporter.sendMail(message, function(err, res) {
    if (err) {
      console.log(err);
      return err;
    } else {
      return res;
    }
  });
};

module.exports = helpers;

  //Simple Message Example
  // var message = {
  //     to: 'smartinsantos@gmail.com', // list of receivers
  //     subject: 'Hello ✔', // Subject line
  //     generateTextFromHtml:true,
  //     html: '<b>HTML TEST with OAuth2 and everything!</b>' // html body
  // };

  //FULL Message Example
  //   var message = {

  //     // Comma separated list of recipients
  //     to: '"Receiver Name" <receiver@example.com>',

  //     // Subject of the message
  //     subject: 'Nodemailer is unicode friendly ✔', //

  //     // plaintext body
  //     text: 'Hello to myself!',

  //     // HTML body
  //     html: '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
  //         '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',

  //     // Apple Watch specific HTML body
  //     watchHtml: '<b>Hello</b> to myself',

  //     // An array of attachments
  //     attachments: [

  //         // String attachment
  //         {
  //             filename: 'notes.txt',
  //             content: 'Some notes about this e-mail',
  //             contentType: 'text/plain' // optional, would be detected from the filename
  //         },

  //         // Binary Buffer attachment
  //         {
  //             filename: 'image.png',
  //             content: new Buffer('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
  //                 '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
  //                 'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC', 'base64'),

  //             cid: 'note@example.com' // should be as unique as possible
  //         },

  //         // File Stream attachment
  //         {
  //             filename: 'nyan cat ✔.gif',
  //             path: __dirname + '/assets/nyan.gif',
  //             cid: 'nyan@example.com' // should be as unique as possible
  //         }
  //     ]
  // };
