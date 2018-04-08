module.exports = function routes(app) {
    app.get('/', function(req, res) {
        res.render('index')
    })

    app.get('/favicon.ico', function(req,res) {
        res.status(204)
    })

    app.get('/start', function(req, res) {
        res.render('start')
    })

    app.get('/chat', function(req, res) {
        return res.render('chat')
    })
}