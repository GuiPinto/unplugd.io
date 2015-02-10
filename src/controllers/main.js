var Media = require('../models').Media;
var MediaController = require('./media');
var url = require('url');

var totalConnections = 0;
var totalListeners = 0;

module.exports.initSocket = function (io, socket) {
	var socketId = socket.id;

	totalConnections++;
	totalListeners++;

	console.log("CONNECTED, socketId: ", socketId)

	socket.on('disconnect', function() {
		console.log('DISCONNECT, socketId:', socketId);
		totalListeners--;
	});

	// Initialize conversation
	MediaController.generateInitialData(function(initData) {
	    socket.emit('init', initData);
	});

};


module.exports.songChange = function (req, res, io) {
	var params = url.parse(req.url, true).query;

	var songData = JSON.parse(decodeURIComponent(params.now_playing));

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

module.exports.broadcastListernerCount = function (io) {
	var listernerCount = {
		totalConnections: totalConnections,
		totalListeners: totalListeners
	};
	console.log('Listerner Count:',totalListeners,'Total Connections:', totalConnections);
	io.emit('stats', listernerCount);
}
