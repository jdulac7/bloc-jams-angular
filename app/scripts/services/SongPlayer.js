// Control Play Pause Functions
(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        /*
        * @desc Injected Fixtures to be able to access "getAlbum" function
        * @param {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        /*
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /*
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
           if (currentBuzzObject) {
               currentBuzzObject.stop();
               SongPlayer.currentSong.playing = null;
           }

           currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
           });

           SongPlayer.currentSong = song;
        };

        /*
        @function playSong
        @desc playSong Function to reduce code, play song, and change icon in album.html to play
        @param {Object} song
        */
        var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
        }

        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
        };


        /*
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        /*
        @function pauseSong
        @desc pause Song Function to reduce code, pause song, and change icon in album.html to pause
        @param {Object} song
        */
        var pauseSong = function(song) {
          currentBuzzObject.pause();
          song.playing = false;
        }



        // Play Current Song
        SongPlayer.play = function(song) {
          song = song || SongPlayer.currentSong;
          if (SongPlayer.currentSong !== song) {

         setSong(song);
         playSong(song);

    } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
              playSong(song);
          }
    }
};
      // Pause Current Song
      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        pauseSong(song);
};

      // go to previous song
      SongPlayer.previous = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex--;

         if (currentSongIndex < 0) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        //moves to the previous song and automatically plays it if index is greater than 0
        } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
         }
};

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();

 /*
two private attributes: SongPlayer.currentSong and currentBuzzObject,
one private function: setSong,
and two public methods: SongPlayer.play and SongPlayer.pause.
*/
