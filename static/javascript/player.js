$( document ).ready(function() {

	var socket = io();
	var playlistContainer = $(".playlist-container");

	socket.on('connect', function () {
		console.log("Connected to Socket Server");
	});

	socket.on('init', function (data) {
		initializePlaylist(data);
	});

	socket.on('song_change', function (data) {
		console.log('song_change', data);
		songChange(data.nowPlaying);
	});

	function initializePlaylist(initData) {
		var nowPlayingData = initData.nowPlaying;
		var historyData = initData.history;
		playlistContainer.html('');
		historyData.reverse();
		historyData.forEach(function(historyObj){
			createPlaylistItem(historyObj, playlistContainer, false);
		});
		createPlaylistItem(nowPlayingData, playlistContainer, false);
	}

	function songChange(nowPlayingData) {
		createPlaylistItem(nowPlayingData, playlistContainer, true);
	}


	var playlistItemTemplateSource   = $("#playlist-item-template").html();
	var playlistItemTemplate = Handlebars.compile(playlistItemTemplateSource);
	function createPlaylistItem(mediaData, playlistContainer, animated) {

		mediaData.imgSrc = '//img.youtube.com/vi/'+mediaData.cid+'/hqdefault.jpg';

		mediaData.time = convertDurationToTime(mediaData.duration);

		var playlistItem = $( playlistItemTemplate(mediaData) );

		// Inject
		playlistItem.prependTo( playlistContainer );

		// Animate
		if (animated) {
			playlistItem.hide();
			playlistItem.slideDown("slow");
		}

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
