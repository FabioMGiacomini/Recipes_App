const express = require('express')
const router = express.Router()
const Ricetta = require('../models/ricettaSchema')
const funzioniRicette = require('../controllers/ricettario')
  

router.get('/', async (req, res) => {
    try {
        const ricetteDaMostrare = await funzioniRicette.mostraRicette() 
        res.render('pages/index', { ricetteDaMostrare })
    } catch (error) {
        console.error(error)
    }
})  

router.get('/ricetta/:titolo', async (req, res) => {  
try {
        const ricerca = await funzioniRicette.singleRecipe(req.params.titolo) 
        res.render('pages/single-recipe', { ricerca }) 
    } catch (error) {
        console.error(error)
    } 
})

router.get('/inserisci-ricetta', (req, res) => {
    res.render('pages/form')
})

/* router.get('/elimina/:titolo', async (req, res) => {
    const nomeRicetta = req.params.titolo
    await funzioniRicette.eliminaRicetta(nomeRicetta) 
    res.redirect('/')
}) */

router.post('/nuovaricetta', async (req,res)=>{
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

router.get('/modifica/:titolo', async (req, res) => {
    const nomeRicetta = req.params.titolo 
    const mostraRicetta = await funzioniRicette.singleRecipe(nomeRicetta)
    res.render('pages/modificaform', { mostraRicetta })
})

router.post('/modificaricetta', async (req,res)=>{
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

router.get('/elimina/:titolo', async (req, res) => {
    try {
        const nomeRicetta = req.params.titolo 
        await funzioniRicette.deleteRecipe(nomeRicetta) 
        res.redirect('/')
    } catch (error) {
        console.error(error)
    }
})



/* router.all('*', (req, res) => {
    res.status(404).send('<h1 style="text-align:center;">Pagina non trovata</h1><h3 style="text-align:center;">Torna in <a href="/">home</a></h3>')
}) */


module.exports = router