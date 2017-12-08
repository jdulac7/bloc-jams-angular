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

        // Play Current Song
        SongPlayer.play = function(song) {
          if (currentSong !== song) {

         setSong(song);
         currentBuzzObject.play();
         song.playing = true;
    } else if (currentSong === song) {
          if (currentBuzzObject.isPaused()) {
              currentBuzzObject.play();
              song.playing = true;
          }
    }
};
      // Pause Current Song
      SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
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
