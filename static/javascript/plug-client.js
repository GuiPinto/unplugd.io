var prevMedia = null;
function checkForSongChange() {
     var history = API.getHistory();
     if (!history || history.length == 0) {
          console.log("Invalid History! ", history);
          return;
     }

     var media = history[0].media;

     if (prevMedia === null) prevMedia = media;

     if ( JSON.stringify(media) != JSON.stringify(prevMedia) ) {
          prevMedia = JSON.parse(JSON.stringify(media));
          var nowPlaying = history[0];
          console.log("Song Change!", nowPlaying);

          var songChangeData = [
               API.getHistory()[1],
               API.getHistory()[0]
          ];

          $.ajax({
               url: "https://unplugd.herokuapp.com/songChange",
               dataType: 'jsonp',
               data: {
                    'now_playing': encodeURIComponent(JSON.stringify(songChangeData))
               }
          });
     }

}
setInterval(checkForSongChange, 500);
