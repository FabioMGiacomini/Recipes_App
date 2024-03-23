const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect( process.env.ricette_uri ) // here your key stored in config.env
        console.log(`Bravo! MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB