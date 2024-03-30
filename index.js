const path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const connectDB = require('./data/connect')
const routeRicette = require('./routes/ricetteRouter') 

const app = express()

// load config
dotenv.config({ path: './.env' })
connectDB()



// view engine setup
app.set('view engine', 'ejs')  
app.set('views', path.join(__dirname, 'views'))  

app.use(express.urlencoded({extended: false}))
app.use(express.json())  

// bootstrap files
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap-icons/font')))
app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')))

// to import my style 
app.use(express.static(path.join(__dirname + '/public')))
 
app.use("/", routeRicette);  

 
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))