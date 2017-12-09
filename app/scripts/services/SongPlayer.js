// Control Play Pause Functions
(function() {
    function SongPlayer() {
        var SongPlayer = {};

        var currentSong = null;
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
               currentSong.playing = null;
           }

           currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
           });

           currentSong = song;
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
          if (currentSong !== song) {

         setSong(song);
         playSong(song);

    } else if (currentSong === song) {
          if (currentBuzzObject.isPaused()) {
              playSong(song);
          }
    }
};
      // Pause Current Song
      SongPlayer.pause = function(song) {
      pauseSong(song);
};

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
 })();

 /*
two private attributes: currentSong and currentBuzzObject,
one private function: setSong,
and two public methods: SongPlayer.play and SongPlayer.pause.
*/
