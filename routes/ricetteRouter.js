const express = require('express')
const router = express.Router()
const Ricetta = require('../models/ricettaSchema')
const funzioniRicette = require('../models/ricettario')

const multer = require('multer');
//const storage = multer({dest: 'v2/public/uploads/'}) 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'v2/public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
    const libro = await funzioniRicette.mostraRicette()
    res.render('pages/index', { libro })
})

router.get('/ricetta/:titolo', async (req, res) => {
    const nomeRicetta = req.params.titolo 
    const mostraRicetta = await funzioniRicette.cercaRicetta(nomeRicetta)
    res.send(mostraRicetta)
  })

router.get('/inserisci-ricetta', (req, res) => {
    res.render('pages/imageForm')
})

router.get('/inserisci-ricetta-senza-immagine', (req, res) => {
    res.render('pages/form')
})

router.get('/elimina/:titolo', async (req, res) => {
    const nomeRicetta = req.params.titolo
    await funzioniRicette.eliminaRicetta(nomeRicetta) 
    res.redirect('/')
})

router.post('/nuovaricettafoto', upload.single('avatar'), async (req,res)=>{
    const ricettaDaInserire = {
        title: req.body.titolo,
        procedimento: req.body.howto, // è l'attributo name del form che va inserito
        ingredienti: req.body.ingredienti, 
        immagine: req.file.originalname, 
    }
    //console.log(req.body, img, req.file.path)
    await funzioniRicette.nuovaRicetta(ricettaDaInserire) 
    res.redirect('/')
})

router.post('/nuovaricetta', async (req,res)=>{
    const ricettaDaInserire = {
        title: req.body.titolo,
        procedimento: req.body.howto, // è l'attributo name del form che va inserito
        ingredienti: req.body.ingredienti, 
    }
    await funzioniRicette.nuovaRicetta(ricettaDaInserire) 
    res.redirect('/')
})

router.get('/modifica/:titolo', async (req, res) => {
    const nomeRicetta = req.params.titolo 
    const mostraRicetta = await funzioniRicette.cercaRicetta(nomeRicetta)
    res.render('pages/modificaform', { mostraRicetta })
})

router.post('/modificaricetta', upload.single('avatar'), async (req,res)=>{
    const ricettaDaModificare = {
        id:req.body.idObj,
        title: req.body.titolo,
        procedimento: req.body.howto, 
        ingredienti: req.body.ingredienti,
        immagine: req.file.originalname 
    }
    await funzioniRicette.modificaRicetta(ricettaDaModificare) 
    res.redirect('/')
})

router.all('*', (req, res) => {
    res.send('<h2>Pagina non trovata</h2><p>Torna in <a href="/">home</a></p>')
})


module.exports = router