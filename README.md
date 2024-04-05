# A Recipes App that works with NodeJS and MongoDB

## Description

<p>You can do any CRUD (create, read, update, delete) operation. The app follows the MVC schema to have a cleaner structure</p><p>Signup or login to enter the app</p><p>Auth system available, realized with passport module and strategies</p>

## How to start

The only thing you need is an account on MongoDB Atlas (it's free) and a username and password to start. To sign in go here https://account.mongodb.com/account/login

<h3>Create a database and a user on MongoDB. </h3>
<p>Once you have your credentials on MongoDB, create a new .env file in the same folder of index.js with this string</p>
<p><code>ricette_uri = "mongodb+srv://USERNAME:PASSWORD@clusternodejs.hbaowix.mongodb.net/DB_NAME?retryWrites=true&w=majority"</code></p>
<p>and write your user name and password and the db name in it </p>

There's no need to create a collection, the schema model creates that for you to avoid errors.

### Front Page

<p>The front end is rendered with the template engine <a href="https://github.com/mde/ejs/tree/main">EJS</a>. </p>

<p>The views folder contains pages and partials to create the site and to manage functions and parameters</p>
