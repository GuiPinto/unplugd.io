$( document ).ready(function() {



	var socket = io();

	socket.on('connect', function () {
		console.log("Connected to Socket Server");
	});

	socket.on('time', function (time) {
		console.log(time);
	});



});
