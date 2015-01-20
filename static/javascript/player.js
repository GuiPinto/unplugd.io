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

	});



	function init(initData) {

		if (initData.nowPlaying) {
			updateNowPlaying(initData.nowPlaying);
		}

	}


	var songTemplateSource   = $("#song-template").html();
	var songTemplate = Handlebars.compile(songTemplateSource);
	function updateNowPlaying(nowPlayingData) {
		var nowPlayingWrapper = $(".now-playing .now-playing-wrapper");

		nowPlayingData.imgSrc = '//img.youtube.com/vi/'+nowPlayingData.cid+'/hqdefault.jpg';

		nowPlayingWrapper.html( songTemplate(nowPlayingData) );
	}


});
