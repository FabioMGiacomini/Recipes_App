const Ricetta = require('../models/ricettaSchema')

// GET all recipes  
function mostraRicette() {
  return new Promise((resolve, reject) => {
    const allRecipes = Ricetta.find({})
    resolve(allRecipes)
  })
}   

// @desc Find a single recipe by title
function singleRecipe(nome) {
  return new Promise((resolve, reject) => {
    const ricettaSingola = Ricetta.findOne({ title: nome })
    resolve(ricettaSingola)
  })
}

// @desc Create new recipe
function newRecipe(obj) {
  return new Promise((resolve, reject) => {
    const saveRecipe = new Ricetta(obj)
    saveRecipe.save()
    resolve(saveRecipe)
  })
}


/* @params   upsert: if true, and no documents found, insert a new document 
**           new: if true, return the modified document rather than the original
** @desc     update a recipe and goes to the recipe page right after
*/
  function updateRecipe(modobj) {
  const filter = { _id: modobj.id }
  const update = {
    title: modobj.title,
    procedimento: modobj.procedimento,
    ingredienti: modobj.ingredienti,
    immagine: modobj.immagine,
  }
  const options = {
    upsert: true,
    new: true
  }
  return new Promise((resolve,reject)=>{
    const ricetteDaMostrare = Ricetta.findByIdAndUpdate(filter, update, options)
    resolve(ricetteDaMostrare)
  })
  
}  

// Delete a recipe  
const eliminaRicetta = async (nome) => {
  try {
    const ricettaDaEliminare = await Ricetta.deleteOne({title: nome})
    
    if (ricettaDaEliminare.deletedCount===0) {
      return messaggio = 'nessuna ricetta eliminata'
    } else if(ricettaDaEliminare.deletedCount===1){ 
      return messaggio = `ricetta ${nome} eliminata`
    }
    return
  } catch (error) {
    console.error(error)
  }
}  
  
module.exports = {  
  mostraRicette,
  singleRecipe, 
  updateRecipe,
  eliminaRicetta, 
  newRecipe,
}