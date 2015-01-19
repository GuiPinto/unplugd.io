var coreData = {};
var clockInterval = 2000;

module.exports.init = function (ws) {

	console.log('init!', ws.id);
	var id = setInterval(function() {
		var dataToSend = JSON.stringify(new Date());
		console.log('sending ', dataToSend, 'to', id);
		ws.send(dataToSend, function() {  })
	}, 1000)

	console.log("websocket connection open")

	ws.on("close", function() {
		console.log("websocket connection close")
		clearInterval(id)
	})

	// Sent initial

};
