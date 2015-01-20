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
	});



	function init(initData) {

		updateNowPlaying(initData.nowPlaying);

	}

	function updateNowPlaying(nowPlayingData) {
		var nowPlaying = $(".now_playing");
		$(".title", nowPlaying).text(nowPlayingData.title);
		$(".author", nowPlaying).text(nowPlayingData.author);
		$(".duration", nowPlaying).text(nowPlayingData.duration + " seconds");
		$("img", nowPlaying).attr('src', '//img.youtube.com/vi/'+nowPlayingData.cid+'/hqdefault.jpg')
	}


});
