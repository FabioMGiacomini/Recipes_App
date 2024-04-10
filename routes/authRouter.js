const express = require('express');
const router = express.Router()
const passport = require('passport')
const User = require('../models/userSchema')
const { ensureAuth, ensureGuest } = require('../middleware/helpers')

router.get('/login', ensureGuest, (req, res, next) => {
    res.render('pages/login')
})

router.get('/signup', (req, res, next) => {
    res.render('pages/signup')
})

// passport function
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
  /login-success (homepage), if failure, send to /login-failure
*/
router.post('/login', passport.authenticate('local', {failureRedirect:'/login'}), function (req, res) {
   // If this function gets called, authentication was successful.
   // `req.user` contains the authenticated user.
   res.redirect('/')
})
  
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

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
      if (error) {return next(error)}
  })
  res.redirect('/')
})


module.exports = router