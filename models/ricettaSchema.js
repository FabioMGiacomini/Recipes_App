const mongoose = require('mongoose')

const ricettaSchema = new mongoose.Schema(
    {
    title: String,
    procedimento: String,
    ingredienti: String,
    immagine:  String 
    }, 
    {
        collection: 'ricette'
    }
)


module.exports = mongoose.model('ricetta', ricettaSchema)