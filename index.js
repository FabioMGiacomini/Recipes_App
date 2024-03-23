const path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const connectDB = require('./data/connect')
const routeRicette = require('./routes/ricetteRouter') 

// load config
dotenv.config({ path: './config.env' })
connectDB()

const app = express()

app.set('view engine', 'ejs')  
app.set('views', path.join(__dirname, 'views'))  

app.use(express.urlencoded({extended: false}))
app.use(express.json())  

// bootstrap files
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap-icons/font')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))

// to import my style 
app.use(express.static(path.join(__dirname + '/public')))
 
app.use("/", routeRicette);  

 

app.listen(3000, console.log(`Server runngin on port 3000`))