const Ricetta = require('./ricettaSchema')

// GET all recipes
async function mostraRicette(){
  try {
    const ricetteDaMostrare = await Ricetta.find({})
    return ricetteDaMostrare
  } catch (error) {
    console.error(error)
  }
}

// find a single recipe by title
async function cercaRicetta(nome){
  try {
    const ricettaDaMostrare = await Ricetta.findOne({title: nome})
    return ricettaDaMostrare
  } catch (error) {
    console.error(error)
  }
}

// Create a new recipe
async function nuovaRicetta(obj) {
    try {
      const newRecipe = new Ricetta(obj)
      await newRecipe.save()
      return 
    } catch(error) {
      console.error(error)
    }  
  }

  // Edit a recipe by id
async function modificaRicetta(modobj){
  const filter = {_id: modobj.id}
  const update = {
    title: modobj.title,
    procedimento: modobj.procedimento,
    ingredienti: modobj.ingredienti,
    immagine: modobj.immagine,
  }
    try {
      const ricetteDaMostrare = await Ricetta.findOneAndUpdate(filter, update, {
        new: true
      });
      return ricetteDaMostrare
    } catch (error) {
      console.error(error)
    }
  }  

// Delete a recipe  
async function eliminaRicetta(nome){
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
  cercaRicetta,
  modificaRicetta,
  eliminaRicetta, 
}