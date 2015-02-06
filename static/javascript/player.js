$( document ).ready(function() {

	var socket = io();
	var playlistContainer = $(".playlist-container");
	var el = {
		body: $("body"),
		player: $(".player-container audio"),
		playButton: $(".player-controls .play-button"),
		pauseButton: $(".player-controls .pause-button"),
		statusBar: $(".player-controls .status")
	};
	var player = el.player[0];

	socket.on('connect', function () {
		console.log("Connected to Socket Server");
	});

	socket.on('init', function (data) {
		initializePlaylist(data);
	});

	socket.on('song_change', function (data) {
		//console.log('song_change', data);
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

	if (addToHomescreen) {
		//addToHomescreen({
		//    detectHomescreen: true
		//});
	}

	// Initialize
	el.playButton.hide();
	el.pauseButton.hide();
	el.statusBar.text("Waiting");
	el.body.addClass('controls-open');

	// Play button
	el.playButton.click(function() {
		player.play();
	});

	// Pause button
	el.pauseButton.click(function() {
		player.pause();
		// Hide pause, show play
		el.pauseButton.hide();
		el.playButton.show();
	});

	// on-playing (hide modal)
	el.player.bind('playing', function(event) {
		el.statusBar.text("Playing");
		// Hide play, show pause
		el.playButton.hide();
		el.pauseButton.show();
		// Close controls
		el.body.removeClass('controls-open');
    });

	// on-loadeddata (show modal w/ play button)
	el.player.bind('loadeddata', function(event) {
		// Hide pause, show play, change statusbar
		el.pauseButton.hide();
		el.playButton.show();
		el.statusBar.text("Press play to start.");
		// Open controls
		el.body.addClass('controls-open');
    });

	// on-error/stalled (show modal)
	el.player.bind('waiting stalled pause error ended', function(event) {
		el.statusBar.text("Status: " + event.type);
		// Hide pause, show play
		el.pauseButton.hide();
		el.playButton.show();
		// Open controls
		el.body.addClass('controls-open');
    });

	el.player.bind('abort canplay canplaythrough \
		durationchange emptied ended error \
		interruptbegin interruptend loadeddata \
		loadedmetadata loadstart mozaudioavailable \
		pause play playing progress ratechange seeked \
		seeking stalled suspend \
		volumechange waiting',
	function(event) {
		var type = event.type;
		var dd = $(".log").text();
		$(".log").text( type + "\n" + dd);
    });


	$( ".playlist-container" ).on( "click", ".playlist-item", function() {
		if ($(this).is(":last-child")) {
			$(".log").show();
		}
	});


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
