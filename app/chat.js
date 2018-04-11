var object = require('./clients')
var fs = require('fs')
var path = require('path');
var appDir = path.dirname(require.main.filename);
var uuid4 = require('uuid/v4')

module.exports = function Chat(io) {

    var chat = io.on('connection', function(socket) {

        var userId;
        var name;
        socket.on('message', function(data) {
            userId = data.user
            name = data.name
            if(data.type == 'binary') {
                var buff = new Buffer(data.message)
                var id = uuid4() + "jpg"
                var pathToSave = path.join(appDir, "public", "files", )

                chat.emit('receiv', {
                    user: data.user,
                    message: data.message,
                    time: data.time,
                    name: data.name,
                    type: data.type,
                    binary_name: data.binary_name,
                    binary_url: ""
                })
            } else {
                chat.emit('receiv', {
                    user: data.user,
                    message: data.message,
                    time: data.time,
                    name: data.name,
                    type: data.type,
                    binary_name: null
                })
            }
            
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

            chat.emit('counter', {
                users: object.clients
            })
        })

        socket.on('join', function(client) {
                userId = client.user
                name = client.name
                object.clients.push(client)

                chat.emit('new', {
                    user: client.user,
                    name: client.name
                })

                chat.emit('counter', {
                    users: object.clients
                })
            
        })

        socket.on('changename', function(data) {
            object.clients.find(x => x.user == data.user).name = data.name
            chat.emit('usernewname', data)
            chat.emit('counter', {
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
}