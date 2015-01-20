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
          console.log("Song Change!", media);
     } else {
          console.log("same song..");
     }
}
setInterval(checkForSongChange, 500);
