
module.exports.initSocket = function (io, socket) {
	var socketId = socket.id;

	//io.set("transports", ["polling"]);
	//io.set("polling duration", 10);

	console.log("CONNECTED, socketId: ", socketId)

	socket.on('disconnect', function() {
		console.log('DISCONNECT, socketId:', socketId);
	});

    socket.on('join', function(publisherId){
        console.log('JOIN, publisherId:',publisherId);
        io.emit('much connect');
    });

    // Prepare initial data

	// Initialize conversation
    io.emit('hithere', {
    	clientId: socketId,
    	totalConnections: io.engine.clientsCount
   	});

};

module.exports.newSong = function (req, res, io) {
	console.log('newSONG!');

	io.emit('time', { newSong: "time" });

	return res.send("OK");
}

module.exports.player = function (req, res) {
	res.render('player');
}





