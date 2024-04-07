const express = require('express')
const router = express.Router()
const Ricetta = require('../models/ricettaSchema')
const funzioniRicette = require('../controllers/ricettario')
const { findUser } = require('../controllers/userAuth')
const { ensureAuth, ensureGuest } = require('../middleware/helpers')  
// ensureauth garantisce che se inserisco 
// un percorso valido in url senza essere loggato mi manda al login

// qui non metto ensureAuth in modo da vedere le ricette anche come guest 
// se però provo a modificarle mi manda al login
router.get('/', async (req, res) => {
    try {
        const ricetteDaMostrare = await funzioniRicette.mostraRicette() 
        res.render('pages/index', { ricetteDaMostrare })     
    } catch (error) {
        console.error(error)
    }
})  

router.get('/ricetta/:titolo', ensureAuth, async (req, res) => {  
try {
        const ricerca = await funzioniRicette.singleRecipe(req.params.titolo) 
        res.render('pages/single-recipe', { ricerca }) 
    } catch (error) {
        console.error(error)
    } 
})

router.get('/inserisci-ricetta', ensureAuth, (req, res) => {
    res.render('pages/form')
})

router.post('/nuovaricetta', ensureAuth, async (req,res)=>{
    try {
        const ricettaDaInserire = {
            title: req.body.titolo,
            procedimento: req.body.howto,  
            ingredienti: req.body.ingredienti, 
            immagine: req.body.urlimg
        }
       const ricerca = await funzioniRicette.newRecipe(ricettaDaInserire)  
       res.render('pages/single-recipe', { ricerca }) 
        
    } catch (error) {
        
    }
})

router.get('/modifica/:titolo', ensureAuth, async (req, res) => {
    const nomeRicetta = req.params.titolo 
    const mostraRicetta = await funzioniRicette.singleRecipe(nomeRicetta)
    res.render('pages/modificaform', { mostraRicetta })
})

router.post('/modificaricetta', ensureAuth, async (req,res)=>{
    const ricettaDaModificare = {
        id:req.body.idObj,
        title: req.body.titolo,
        procedimento: req.body.howto, 
        ingredienti: req.body.ingredienti,
        immagine: req.body.urlimg
    }
    try {
        const ricerca = await funzioniRicette.updateRecipe(ricettaDaModificare)  
        res.render('pages/single-recipe', { ricerca }) 
  } catch (error) {
        console.error(error)
  } 
    
    
})

router.get('/elimina/:titolo', ensureAuth, async (req, res) => {
    try {
        const nomeRicetta = req.params.titolo 
        await funzioniRicette.deleteRecipe(nomeRicetta) 
        res.redirect('/')
    } catch (error) {
        console.error(error)
    }
})




module.exports = router