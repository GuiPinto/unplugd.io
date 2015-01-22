$( document ).ready(function() {

	var socket = io();

	socket.on('connect', function () {
		console.log("Connected to Socket Server");
	});

	socket.on('init', function (data) {
		console.log('init', data);
		init(data);
	});

	socket.on('song_change', function (data) {
		console.log('song_change', data);
		init(data);
	});

	function init(initData) {
		processPlaylist(initData.nowPlaying, initData.history)
	}

	function processPlaylist(nowPlayingData, historyData) {
		var playlistContainer = $(".playlist-container");

		playlistContainer.html('');

		createPlaylistItem(nowPlayingData, playlistContainer);

		historyData.forEach(function(historyObj){

			createPlaylistItem(historyObj, playlistContainer);

		});

	}


	var playlistItemTemplateSource   = $("#playlist-item-template").html();
	var playlistItemTemplate = Handlebars.compile(playlistItemTemplateSource);
	function createPlaylistItem(mediaData, playlistContainer) {

		mediaData.imgSrc = '//img.youtube.com/vi/'+mediaData.cid+'/hqdefault.jpg';

		mediaData.time = convertDurationToTime(mediaData.duration);

		var playlistItem = playlistItemTemplate(mediaData);

		// Inject
		playlistContainer.html( playlistContainer.html() + playlistItem );
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


/*
	var player;
      function onYouTubeIframeAPIReady() {
      	alert('ok');
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

	$(".history-wrapper").on("click", ".song-box", function() {
		console.log('click');
		console.log($("this").data('media'));
	});
*/


});
