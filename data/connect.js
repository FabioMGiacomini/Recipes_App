const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = mongoose.connect( process.env.ricette_uri ) 
        console.log(`Bravo! MongoDB Connected`);
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB