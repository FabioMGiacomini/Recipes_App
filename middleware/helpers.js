// se esco  con logout voglio tornare alla pagina principale e non voglio rientrare inserendo il percorso nella uri

module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/login') 
        } else {
            return next()
        }
    }
}