var readline = require('readline'),
socket = require('socket.io-client')('http://52.230.15.28:11000/'),
util = require('util'),
color = require("ansi-color").set;


var userid = getRandId()
var nick = "user_" + userid
var rl = readline.createInterface(process.stdin, process.stdout);


// Set the username
rl.question("Please enter a nickname: [user_" + userid + "] ", function(name) {
	nick = name || "user_" + userid
	socket.emit('join', {
        user: userid,
        name: nick
    })
	rl.prompt(true)
});

// Handle input
rl.on('line', function (line) {
    // send chat message
    socket.emit('message', {
        user: userid,
        name: nick,
        message: line,
        time: new Date()
    })

    rl.prompt(true);
});

socket.io.on('connect_error', function(err) {
  // handle server error here
  console.log('Error connecting to server ' + err);
});

// Handle incoming messages
socket.on('receiv', function (data) {
    console_out(`[${data.user}] ${data.name}: ${data.message}`)
});

socket.on('left', function (data) {
    var header = data.name + " "
    var content =  header + "has left conversation"
    console_out(content)
})

socket.on('new', function (data) {
    var header = data.name
    var content = header + " has joined conversation"
    console_out(content)
})

socket.on('usernewname', function (data) {
    var header = "An user with ID " + data.user + " has changed name to "
    var content = header + data.name
    console_out(content)
})

// Output text
function console_out(msg) {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(msg);
	rl.prompt(true);
}

//get random ID
function getRandId() {
    return Math.floor(Math.random() * (9999999 - 999999 + 1)) + 999999;
}