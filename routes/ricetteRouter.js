const express = require('express')
const router = express.Router()
const Ricetta = require('../models/ricettaSchema')
const funzioniRicette = require('../controllers/ricetteController')
const { findUser } = require('../controllers/userAuth')
const { ensureAuth, ensureGuest } = require('../middleware/helpers')  

 
router.get('/', funzioniRicette.mostraRicette )  

router.get('/ricetta/:titolo', funzioniRicette.singleRecipe )

router.get('/inserisci-ricetta', ensureAuth, (req, res) => {
    res.render('pages/form')
})

router.post('/nuovaricetta', ensureAuth, funzioniRicette.newRecipe )

router.get('/modifica/:titolo', ensureAuth, funzioniRicette.updateTitle)

router.post('/modificaricetta', ensureAuth, funzioniRicette.updateRecipe )

router.get('/elimina/:titolo', ensureAuth, funzioniRicette.deleteRecipe )




module.exports = router