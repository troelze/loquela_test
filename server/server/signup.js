module.exports = function(){
  var express = require('express');
  var router = express.Router();
  var db = require('../db/queries.js');
  var helpers = require('./helpers');
  var crypto = require('crypto');
  const session = require('express-session');


  router.get('/', function(req, res){
    var context = {};
    if(helpers.notLoggedIn(req)) {
      res.render('signup', context);
    } else {
      context = {};
      context.username = req.session.user.username;
      res.render('logout', context);
    }
  });

  router.post('/', function(req, res) {
    //Gets all users from DB
    db.getUsers().then(function(content) {
      //If username does not exsist, add user info to database
      if(helpers.usernameCheck(content, req.body.username)) {
        //Hash user password, set as new password
        const hash = crypto.createHash('sha256');
        hash.update(req.body.passone);
        req.body.passone = (hash.digest('hex'));
        //Add user info to to database and redirect to survey page
        db.addUser(req.body).then(
            function(content2) {
              res.redirect('/survey');
            },
            function(err) {
              console.log(err);
              reject(err);
        });
      }
      //If username already exsists, return back to signup and display error
      else {
        var context = {};
        context.usernameError = "That Username Already Exists...";
        res.render("signup", context);
      }
    });
  });

  return router;
}();
