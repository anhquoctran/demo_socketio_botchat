var object = require('./clients')
var fs = require('fs')
var path = require('path');
var appDir = path.dirname(require.main.filename);
var uuid4 = require('uuid/v4')

module.exports = function Chat(io) {

    var chat = io.on('connection', function(socket) {
        var bot_session_id = getRandId()

        var userId

        var name

        socket.on('message', function(data) {
            userId = data.user
            name = data.name

            socket.emit('receiv', {
                user: data.user,
                message: data.message,
                time: data.time,
                name: data.name,
                type: data.type,
            })

            socket.emit('receiv', {
                user: bot_session_id,
                message: "hi, i am bot :)",
                time: data.time,
                name: "autobot_" + bot_session_id,
                type: "text",
            })
            
        })

        socket.on("end", function() {
            socket.disconnect(0)
        })

        socket.on('disconnect', function() {
            object.clients.splice(object.clients.indexOf(userId))
            chat.emit('left', {
                user: userId,
                name: name
            })

            socket.emit('counter', {
                users: object.clients
            })
        })

        socket.on('join', function(client) {
            userId = client.user
            name = client.name
            object.clients.push(client)

            socket.emit('new', {
                user: client.user,
                name: client.name
            })
            
            socket.emit('receiv', {
                user: bot_session_id,
                message: "Hi, I am bot :)",
                time: new Date(),
                name: "autobot_" + bot_session_id,
                type: "text",
            })
        })

        socket.on('changename', function(data) {
            object.clients.find(x => x.user == data.user).name = data.name
            socket.emit('usernewname', data)
            socket.emit('counter', {
                users: object.clients
            })
        })

        socket.on('stats', function() {
            socket.emit('stats_count', {
                total: object.clients.length,
                clients: object.clients
            })
        })
    })

    function getRandId() {
        return Math.floor(Math.random() * (9999999 - 999999 + 1)) + 999999;
    }
}