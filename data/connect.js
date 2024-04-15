const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect( process.env.ricette_uri ) 
        console.log(`Bravo! MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB