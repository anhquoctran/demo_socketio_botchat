var users = require('./clients')

module.exports = function routes(app) {
    app.get('/', function(req, res) {
        res.render('index', {
            title: "Demo chat"
        })
    })

    app.get('/favicon.ico', function(req,res) {
        res.status(204)
    })

    app.get('/start', function(req, res) {
        res.redirect('/chat')
    })

    app.get('/file/dl-content/:id', function(req, res) {
        if(!req.params.id) {
            return res.status(400).send({
                status: 400,
                message: "File Identify Code paramter is required"
            })
        } else {
            
        }
    })

    app.get('/chat', function(req, res) {
        return res.render('chat', {
            title: "Demo chat",
            count: users.clients.length == 0 ? 1 : users.clients.length,
            list: users.clients
        })
    })
}