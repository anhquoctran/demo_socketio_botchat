var object = require('./clients')


module.exports = function Chat(io) {

    var chat = io.on('connection', function(socket) {

        var userId;
        var name;
        socket.on('message', function(data) {
            userId = data.user
            name = data.name
            chat.emit('receiv', {
                user: data.user,
                message: data.message,
                time: data.time,
                name: data.name
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
        })

        socket.on('join', function(client) {
                userId = client.user
                name = client.name
                object.clients.push(client)

                chat.emit('new', {
                    user: client.user,
                    name: client.name
                })
            
        })

        socket.on('changename', function(data) {
            object.clients.find(x => x.user == data.user).name = data.name
            chat.emit('usernewname', data)
        })

        socket.on('stats', function() {
            socket.emit('stats_count', {
                total: object.clients.length,
                clients: object.clients
            })
        })
    })
}