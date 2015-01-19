$( document ).ready(function() {



	var socket = io();

	socket.on('connect', function () {
		console.log("Connected to Socket Server");
	});

	socket.on('display_ad', function (ad) {
		displayAd(ad);
	});

	socket.on('display_alert', function (alert) {
		displayAlert(alert);
	});

	$(document).ready(function() {

		var channel = 'test';

		if(channel) {

			socket.on('hithere', function () {
				console.log("Joining channel");
				socket.emit('join', channel);
			});

			socket.on('much connect', function () {
				console.log("Connected to channel socket");
			});

		}
	});


	function displayAd(ad) {
		console.log('displayAd', ad);

		var displayMode = $(".display-modes ." + ad.type);
		$(".display-modes .mode").not(displayMode).hide();
		displayMode.show();

		switch(ad.type) {
			case 'img':
				$("img", displayMode).attr('src', ad.src);
			break;
			case 'text':
				displayMode.addClass('open');
				$("span", displayMode).text(ad.text);
			break;
		}

	}

	var alertQueue = [];
	var alertQueueProcessing = false;
	function displayAlert(alert) {
		console.log('displayAlert', alert);

		alertQueue.push(alert);

		if (!alertQueueProcessing) {
			alertQueueProcessing = true;
			processAlertQueue();
		}
	}

	var alertOpenTime = 5000;
	var alertTimeBetween = 1000;
	function processAlertQueue() {

		if (alertQueue.length == 0) return;

		var alert = alertQueue.pop();

		var alertBox = $(".display-modes .alert");
		var alertText = $("span", alertBox);

		alertText.text(alert.text);
		alertBox.addClass('open');

		setTimeout(function() {
			alertBox.removeClass('open');

			if (alertQueue.length > 0) {

				setTimeout(processAlertQueue, alertTimeBetween);

			} else {
				alertQueueProcessing = false;
			}
		}, alertOpenTime);

	}



});
