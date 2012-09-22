var socketio = require('socket.io')

module.exports.listen = function(server){
    io = socketio.listen(server)

    montage = io.of('/montage')
    montage.on('connection', function(socket){
        console.log("new connection: " + socket.id);
	montage.on('disconnect'), function() {
		console.log("disconnected");
	}
	});

return io
    }
