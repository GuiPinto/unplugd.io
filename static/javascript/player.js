$( document ).ready(function() {

	// Let us open a web socket
	var ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
	ws.onopen = function()
	{
		// Web Socket is connected, send data using send()
		ws.send("Message to send");
	};

	ws.onclose = function()
	{
		// websocket is closed.
		alert("Connection is closed...");
	};


	ws.onmessage = function (event) {
		console.log('MESSAGE:', event);
	};



});
