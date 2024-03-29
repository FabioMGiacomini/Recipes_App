const Ricetta = require('../models/ricettaSchema')

// GET all recipes  
const mostraRicette = async (req, res) => {
  try {
    const ricetteDaMostrare = await Ricetta.find({}) 
    res.render('pages/index', { ricetteDaMostrare })
  } catch (error) {
    console.error(error)
  }
}   

// GET and return a single recipe 
const singleRecipe = async (nome) => {
  try {
    const ricerca = await Ricetta.findOne({title: nome})
    console.log(ricerca);
    return ricerca
  } catch (error) {
    console.error(error)
  }
}

// find a single recipe by title
const cercaRicetta = async (nome) => {
  try {
    const ricettaDaMostrare = await Ricetta.findOne({title: nome})
    console.log(ricettaDaMostrare)
    return ricettaDaMostrare
  } catch (error) {
    console.error(error)
  }
}

// Create a new recipe
const nuovaRicetta = async (obj) => {
    try {
      const newRecipe = new Ricetta(obj)
      await newRecipe.save()
      return 
    } catch(error) {
      console.error(error)
    }  
  }

  // Edit a recipe by id
const modificaRicetta = async (modobj) => {
  const filter = {_id: modobj.id}
  const update = {
    title: modobj.title,
    procedimento: modobj.procedimento,
    ingredienti: modobj.ingredienti,
    immagine: modobj.immagine,
  }
    try {
      const ricetteDaMostrare =  Ricetta.findByIdAndUpdate(filter, update)
      return ricetteDaMostrare
    } catch (error) {
      console.error(error)
    }
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
  nuovaRicetta, 
  mostraRicette,
  singleRecipe,
  cercaRicetta,
  modificaRicetta,
  eliminaRicetta, 
}