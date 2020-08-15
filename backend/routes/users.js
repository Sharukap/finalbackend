var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

var User = require('../models/students');
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {

  if(!req.session.students) {
	var authHeader = req.headers.authorization;
    
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
  
    User.findOne({username: username})
    .then((students) => {
      if (students === null) {
        var err = new Error('User ' + username + ' does not exist!');
        err.status = 403;
        return next(err);
      }
	    
      else if (students.password !== password) {
        var err = new Error('Your password is incorrect!');
        err.status = 403;
        return next(err);
      }
	    
      else if (students.username === username && students.password === password) {
        req.session.students = 'authenticated';
        res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		const admin = true;
		if(students.accounttype === admin) {
			res.json({approved:true,type:"admin"});
		}
	      
		else {
			res.json({approved:true,type:"student"});
		}
      }
    })
    .catch((err) => next(err));
  
  }

  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
	
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
