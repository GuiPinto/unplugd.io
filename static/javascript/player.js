$( document ).ready(function() {



	var socket = io();

	socket.on('connect', function () {
		console.log("Connected to Socket Server");
	});

	socket.on('time', function (time) {
		console.log(time);
	});

	socket.on('init', function (data) {
		console.log('init', data);
		init(data);
	});

	socket.on('song_change', function (data) {
		console.log('song_change', data);

		if (data.nowPlaying) {
			updateNowPlaying(data.nowPlaying);
		}

		if (initData.history) {
			updateHistory(initData.history);
		}

	});



	function init(initData) {

		if (initData.nowPlaying) {
			updateNowPlaying(initData.nowPlaying);
		}

		if (initData.history) {
			updateHistory(initData.history);
		}

	}


	var songTemplateSource   = $("#song-template").html();
	var songTemplate = Handlebars.compile(songTemplateSource);
	function updateNowPlaying(nowPlayingData) {
		var nowPlayingWrapper = $(".now-playing .now-playing-wrapper");

		nowPlayingData.imgSrc = '//img.youtube.com/vi/'+nowPlayingData.cid+'/hqdefault.jpg';

		nowPlayingData.time = convertDurationToTime(nowPlayingData.duration);

		nowPlayingWrapper.html( songTemplate(nowPlayingData) );
	}

	function updateHistory(historyData) {
		var historyWrapper = $(".play-history .history-wrapper");

		historyWrapper.html('');

		historyData.forEach(function(historyObj){

			historyObj.imgSrc = '//img.youtube.com/vi/'+historyObj.cid+'/hqdefault.jpg';

			historyObj.time = convertDurationToTime(historyObj.duration);

			historyWrapper.html(
				historyWrapper.html() +
				songTemplate(historyObj)
			);
		});

	}

	function convertDurationToTime(time) {
	    var sec_num = parseInt(time, 10);
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    var time    = minutes+':'+seconds;
	    return time;
	}



});
