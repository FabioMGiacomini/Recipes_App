const Ricetta = require('../models/ricettaSchema') 

// @desc    GET all recipes  
const mostraRicette = async (req, res) => {
  const ricetteDaMostrare = await Ricetta.find({}) 
  try { 
      const utente = req.isAuthenticated() ? req.user.username : 'guest'
      res.render('pages/index', { utente, ricetteDaMostrare })   
  } catch (error) {
      console.error(error)
  }
}
   
// @desc    Find a single recipe by title
const singleRecipe = async (req, res) => {  
  try {
          const ricerca = await Ricetta.findOne({title: req.params.titolo}) 
          res.render('pages/single-recipe', { ricerca }) 
      } catch (error) {
          console.error(error)
      } 
  }

// @desc    Create new recipe
const newRecipe = async (req,res) => {
  try {
      const ricettaDaInserire = {
          title: req.body.titolo,
          procedimento: req.body.howto,  
          ingredienti: req.body.ingredienti, 
          immagine: req.body.urlimg
      }
     const newRicetta = new Ricetta(ricettaDaInserire)   
     const ricerca = await newRicetta.save()   
     res.render('pages/single-recipe', { ricerca }) 
      
  } catch (error) {
      console.log(error);
  }
}

/* 
** @desc    To update the recipe I have to find and return its title and id
*/
const updateTitle = async (req, res) => {
    const mostraRicetta = await Ricetta.findOne({title: req.params.titolo}) 
    res.render('pages/modificaform', { mostraRicetta })
}

/* @params   upsert: if true, and no documents found, insert a new document 
**           new: if true, return the modified document rather than the original
** @desc     update a recipe and goes to the recipe page right after
*/
const updateRecipe = async (req,res) => {
  const filter = { _id: req.body.idObj }
  const options = {
    upsert: true,
    new: true
  }
  const ricettaDaModificare = {
      title: req.body.titolo,
      procedimento: req.body.howto, 
      ingredienti: req.body.ingredienti,
      immagine: req.body.urlimg
  }
  try {
      const ricerca = await Ricetta.findByIdAndUpdate(filter, ricettaDaModificare, options)
      res.render('pages/single-recipe', { ricerca }) 
} catch (error) {
      console.error(error)
} 
}

/* 
** @desc     Delete a recipe and goes to homepage
*/

const deleteRecipe = async (req, res) => {
  try {
      const nomeRicetta = req.params.titolo 
      await Ricetta.deleteOne({ title: nomeRicetta }) 
      res.redirect('/')
  } catch (error) {
      console.error(error)
  }
}
  
module.exports = {  
  mostraRicette,
  singleRecipe, 
  updateTitle,
  updateRecipe,
  newRecipe,
  deleteRecipe,
}