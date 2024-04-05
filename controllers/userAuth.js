const User = require('../models/userSchema')


/* function registerUser(data){
    return new Promise((resolve, reject) => {
          const newUser = new User(data)
          newUser.save()
          resolve(newUser) 
    })    
}
 */
function findUser(name){
    return new Promise((resolve, reject) => {
        const nomeUtente = User.findOne({ username: name })
        resolve(nomeUtente)
    })
}

module.exports = { 
   // registerUser,
    findUser 
}