### 2024-04-15

new branch: I want to change how ricettario.js and ricetteRouter.js work

Now the router file contains just the routes of the functions. All the logic is in controller file

### 2024-04-06

/ is homepage now

you can view the homepage without login but if you want to modify something you are redirect to login page, the same to insert a new recipe

### 2024-04-05

ensureauth garantisce che se inserisco un percorso valido in url senza essere loggato mi manda al login. non lo metto alla funzione che visualizza la home per consentire a guest di vedere senza modificare. se guest prova a modificarle mi manda al login

auth system completed, it works

all pages under new path: /cucina

login page is the new homepage

signup page available

### 2024-04-01

NEW BRANCH

authFunctions to develop authorization system

NEW FEATURE

auth module to login with user and password, passport module; session and username and email and pasword stored on mongo

NEW PAGES

login.ejs - signup.ejs

NEW FILES

userAuth - userSchema - authRouter -

### 2024-03-30

MODIFIED

all functions in ricettario are promises now, all in ricetteRouter are try-catch

### 2024-03-29

NEW

link go to the recipe and back home in every recipe and in homepage

MODIFIED

Ricettario.j: new way to manage function with Promise.

RicetteRouter: try catch in every function

### 2024-03-28

NEW

page created, single-recipe.ejs

ricettario.js new function singleRecipe

MODIFIED

riecettario.js - ricetteRouter.js

### 2024-03-27

##### Add

New branch created newRouterMode, to change the way the router manages functions. I want the controller get full control over functions and renders pages directly
