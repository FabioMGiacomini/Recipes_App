const User = require('../models/userSchema')

function findUser(name){
    return new Promise((resolve, reject) => {
        const nomeUtente = User.findOne({ username: name }).lean()
        resolve(nomeUtente)
    })
}

module.exports = {  
    findUser 
}