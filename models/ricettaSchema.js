const mongoose = require('mongoose')

const ricettaSchema = new mongoose.Schema(
    {
    title: {type: String, required: true},
    procedimento: String,
    ingredienti: String,
    immagine:  String 
    }, 
    {
        collection: 'ricette'
    }
)


module.exports = mongoose.model('ricetta', ricettaSchema)