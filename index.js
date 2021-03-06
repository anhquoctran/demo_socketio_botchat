var express= require("express")
var app = express()

var bodyparser = require('body-parser')
var morgan = require("morgan")

const PORT = 11000;
const ADDRESS = "0.0.0.0"
var server = require('http').createServer(app)
var io = require('socket.io').listen(server.listen(PORT, ADDRESS, function () {
    console.log('Application is running at port ' + PORT)
}));


app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.use('/public/',express.static(__dirname + '/public/'));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true, limit: '1mb' }))
app.use(function(req, res, next) {
	res.removeHeader('X-Powered-By')
	res.status(res.statusCode > 300 ? res.statusCode : 200)
	next()
})

app.use(morgan('dev'))

require('./app/chat')(io)
require('./app/routes')(app)