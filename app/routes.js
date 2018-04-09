var users = require('./clients')

module.exports = function routes(app) {
    app.get('/', function(req, res) {
        res.redirect('/chat')
    })

    app.get('/favicon.ico', function(req,res) {
        res.status(204)
    })

    app.get('/start', function(req, res) {
        res.redirect('/chat')
    })

    app.get('/chat', function(req, res) {
        return res.render('chat', {
            available: users.clients.length
        })
    })
}