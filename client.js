var socket = require('socket.io-client');
var url = "http://localhost:11000"


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is Socket.io server URL? [' + url + ']', function (answer) {
    if (answer || answer != "" || answer != " ") {
        url = answer
        processConnectToUrl()
    }
})

function processConnectToUrl() {
    var io = socket(url)
    io.connect();
    io.on('connect', function () {

    });

    io.on('receiv', function (data) {

    });

    io.on('disconnect', function () {

    });
}