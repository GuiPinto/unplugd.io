$( document ).ready(function() {

	var playlistContainer = $(".playlist-container");
	var el = {
		body: $("body"),
		player: $(".player-container audio"),
		playButton: $(".player-controls .play-button"),
		playlistContainer: $(".playlist-container"),
		//pauseButton: $(".player-controls .pause-button"),
		statusBar: $(".player-controls .status"),
		onlineCount: $(".header-bar .online")
	};
	var player = el.player[0];

	var socket = io();
	socket.on('init', initializePlaylist);
	socket.on('song_change', songChange);
	socket.on('stats', updateStats);

	function initializePlaylist(initData) {
		var nowPlayingData = initData.nowPlaying;
		var historyData = initData.history;
		playlistContainer.html('');
		historyData.reverse();
		historyData.forEach(function(historyObj){
			createPlaylistItem(historyObj, playlistContainer, false);
		});
		createPlaylistItem(nowPlayingData, playlistContainer, false);
		setTimeout(swapBrokenImages, 1000);
	}

	function songChange(songChangeData) {
		createPlaylistItem(songChangeData.nowPlayingData, playlistContainer, true);
		swapBrokenImages();
	}

	function updateStats(stats) {
		if (!stats) return;
		if (stats.totalListeners) {
			var plural = stats.totalListeners == 1 ? '' : 's';
			el.onlineCount.text(stats.totalListeners + ' Listener' + plural + ' Online');
			el.onlineCount.fadeIn('slow');
		}
	}

	var playlistItemTemplateSource   = $("#playlist-item-template").html();
	var playlistItemTemplate = Handlebars.compile(playlistItemTemplateSource);
	function createPlaylistItem(mediaData, playlistContainer, animated) {

		mediaData.imgSrc = '//img.youtube.com/vi/'+mediaData.cid+'/sddefault.jpg';

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

	function swapBrokenImages() {
		$(".playlist-item .backdrop img").each(function() {
			var w = $(this)[0].naturalWidth,
				h = $(this)[0].naturalHeight;
			if ((w == 120 && h == 90) || (w == 0 && h ==0)) {
				var rndImg = "/images/swappables/" + (Math.floor(Math.random() * 5) + 1) + ".jpg";
				$(this).attr('src', rndImg).addClass('swapped');
			}
		});
	}

	// Initialize
	el.playButton.hide();
	el.statusBar.text("Connecting to server..");
	el.body.addClass('controls-open');

	// Play button
	el.playButton.click(function(e) {
		player.play();
		e.stopPropagation();
	});

	// Pause (playlist-tap)
	el.playlistContainer.click(function() {
		el.statusBar.text("Paused");
		el.playButton.show();
		// Open controls-open
		el.body.addClass('controls-open');
		player.pause();
	});

	// on-playing (hide modal)
	el.player.bind('playing', function(event) {
		el.statusBar.text("Playing");
		// Close controls
		el.body.removeClass('controls-open');
    });

	// on-loadeddata (show modal w/ play button)
	el.player.bind('loadeddata', function(event) {
		el.statusBar.text("Press play to start.");
		// Hide pause, show play, change statusbar
		el.playButton.show();
		// Open controls
		el.body.addClass('controls-open');
    });

	// on-error/stalled (show modal)
	el.player.bind('waiting stalled error ended', function(event) {
		var type = event.type;
		if (type == 'waiting')
			el.statusBar.text("Loading..");
		else
			el.statusBar.text("Error - Stream " + type);
		// Hide pause, show play
		el.playButton.show();
		// Open controls-open
		el.body.addClass('controls-open');
    });

	el.player.bind('abort canplay canplaythrough \
		durationchange emptied ended error \
		interruptbegin interruptend loadeddata \
		loadedmetadata loadstart mozaudioavailable \
		pause play playing progress ratechange seeked \
		seeking stalled suspend volumechange waiting',
	function(event) {
		var log = $(".log").text();
		$(".log").text( event.type + "\n" + log);
    });
	$( ".playlist-container" ).on( "click", ".playlist-item", function() {
		if ($(this).is(":last-child")) $(".log").show();
	});

	$(document).on("touchmove", function(evt) {
		if (el.body.hasClass('controls-open'))
			evt.preventDefault()
	});

});
