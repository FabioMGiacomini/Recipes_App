const path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv').config({ path: './.env' })
const connectDB = require('./data/connect')
const routeRicette = require('./routes/ricetteRouter') 
const authRouter = require('./routes/authRouter')
const User = require('./models/userSchema')

connectDB()

const app = express()
 
// view engine setup
app.set('view engine', 'ejs')  
app.set('views', path.join(__dirname, 'views'))  

app.use(express.urlencoded({extended: false}))
app.use(express.json())  

app.use(session({
    secret: 'foo',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoose.connection.client.s.url })
  }));

/*
  Setup the local passport strategy, add the serialize and 
  deserialize functions that only saves the ID from the user
  by default.
*/
const strategy = new LocalStrategy(User.authenticate())
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

// bootstrap files
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap-icons/font')))
app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')))

app.use(express.static(path.join(__dirname + '/public')))

app.use("/", authRouter)
app.use("/", routeRicette);  

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))