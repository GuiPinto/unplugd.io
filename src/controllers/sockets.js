var coreData = {};
var clockInterval = 2000;

module.exports.init = function (io, socket) {

	var socketId = socket.id;

	//io.set("transports", ["polling"]);
	//io.set("polling duration", 10);

	socket.on('disconnect', function() {
		console.log('DISCONNECT, socketId:', socket.id);
	});

    socket.on('join', function(publisherId){
        console.log('JOIN, publisherId:',publisherId);
        io.emit('much connect');
    });

    // Initialize conversation
    io.emit('hithere');

	var id = setInterval(function() {
		var dataToSend = JSON.stringify(new Date());
		console.log('sending ', dataToSend, 'to', id);
		io.emit('time', dataToSend);
	}, 1000)

};
