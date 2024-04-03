const express = require('express');
const router = express.Router()
const passport = require('passport')
const User = require('../models/userSchema')
const manageUsers = require('../controllers/userAuth')

router.get('/login', (req, res, next) => {
    res.render('pages/login')
})

router.get('/signup', (req, res, next) => {
    res.render('pages/signup')
})

/* router.post('/signup', async (req, res, next) => {
    const newUser = { 
        username: req.body.username,
        password : req.body.password
    }
    try {
        const registerNU = await manageUsers.registerUser(newUser) 
        res.send('utente registrato')
    } catch (error) {
        console.error(error)
        res.send('utente esistente')
    }
}) */

router.post('/signup', function (req, res) {
    User.register(
      new User({ 
        email: req.body.email, 
        username: req.body.username 
      }), req.body.password, function (err, msg) {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successful" });
        }
      }
    )
  })
/*
  Login routes -- This is where we will use the 'local'
  passport authenciation strategy. If success, send to
  /login-success, if failure, send to /login-failure
*/
router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login-failure', 
    successRedirect: '/login-success'
  }), (err, req, res, next) => {
    if (err) next(err);
  });
  
  router.get('/login-failure', (req, res, next) => {
    console.log(req.session);
    res.send('Login Attempt Failed.');
  });
  
  router.get('/login-success', (req, res, next) => {
    console.log(req.session);
    res.send('Login Attempt was successful.');
  });
/*
  Protected Route -- Look in the account controller for
  how we ensure a user is logged in before proceeding.
  We call 'isAuthenticated' to check if the request is 
  authenticated or not. 
*/
router.get('/profile', function(req, res) {
    console.log(req.session)
    if (req.isAuthenticated()) {
      res.json({ message: 'You made it to the secured profile' })
    } else {
      res.json({ message: 'You are not authenticated' })
    }
  })

module.exports = router