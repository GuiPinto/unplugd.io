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

          $.ajax({
               url: "https://unplugd.herokuapp.com/songChange",
               dataType: 'jsonp',
               data: {
                    'now_playing': JSON.stringify(nowPlaying)
               }
          });
     }

}
setInterval(checkForSongChange, 500);
