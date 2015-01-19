var coreData = {};
var clockInterval = 2000;

module.exports.index = function (req, res) {
	return res.render('ads');
};

module.exports.initSocket = function (io, socket) {
	var socketId = socket.id;

	console.log('initSocket()');

	//  io.set("transports", ["xhr-polling"]);
	//  io.set("polling duration", 10);

	if (!coreData[socketId])
		coreData[socketId] = {
			publisherId: null,
			adClock: null
		};

	var data = coreData[socketId];

	socket.on('disconnect', function() {
		console.log('DISCONNECT, socketId:', socket.id);

		// Clear clocks
		clearTimeout(data.adClock);

		// Delete coreData Obj
		delete coreData[socketId];

	});

    socket.on('join', function(publisherId){
        console.log('JOIN, publisherId:',publisherId);
        io.emit('much connect');

        data.publisherId = publisherId;

        // Initialize adclock
		data.adClock = setInterval(function() {
			serveAd(data, io, socket);
		}, clockInterval);

    });

    // Initialize conversation
    io.emit('hithere');

};

function serveAd(coreData, io, socket) {
    console.log('serveAd()', socket.id);
    //io.emit('newsub', Math.random());

    if (Math.random() > 0.5) {

	    io.emit('display_ad', {
	    	type: 'img',
	    	src: 'https://cdn0.gamesports.net/storage/24000/24673.jpg'
	    });

    } else {
        io.emit('display_ad', {
	    	type: 'img',
	    	src: 'http://source.ncix.com/eblast/Weekly-eblast-20140326/banner00.jpg?1'
	    });
    }



    //console.log('coreData', coreData);

}
