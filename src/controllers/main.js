var Media = require('../models').Media;
var MediaController = require('./media');

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
	MediaController.generateInitialData(function(initData) {
	    io.emit('init', initData);
	});

};


module.exports.songChange = function (req, res, io) {
	var songData = req.body;

	MediaController.processSongUpdate(
		songData,
		function() {

			MediaController.generateInitialData(function(initData) {

				io.emit('song_change', initData);

				return res.send(initData);

			});
		}
	);

}

module.exports.player = function (req, res) {
	res.render('player');
}




