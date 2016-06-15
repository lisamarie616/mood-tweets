moodApp.controller('HomeController', ['$q','twitterService', '$location', '$anchorScroll', function($q, twitterService, $location, $anchorScroll){
  var ctrl = this;
  ctrl.tweets = [];

  ctrl.mapMood = {
    "stressed": "SunsetMoments",
    "sad": "puppiesoftwitter",
    "bored": "CatsOfTwitter",
    "uninspired": "quotes%20%23motivational",
    "anxious": "beach%20%23peaceful",
    "wolflike": "fullmoon%20-%23mooning",
    "patriotic": "usa%20%23flag",
    "adventurous": "waterfall%20%23travel"
  };

  ctrl.photoFilter = function(item){
    return item.entities.media;
  };

  twitterService.initialize();

  ctrl.populateTweets = function(hashtag){
    twitterService.searchTweets(hashtag).then(function(data){
      ctrl.tweets = data;
    });
  };

  ctrl.showTweets = function(mood){
    twitterService.connectTwitter().then(function(){
      if (twitterService.isReady()){
        ctrl.populateTweets(ctrl.mapMood[mood]);
      }
    });
  };

  ctrl.gotoTweets = function(){
    $location.hash('tweets');
    $anchorScroll.yOffset = 60;
    $anchorScroll();
  };

  ctrl.gotoTop = function(){
    $location.hash('top');
    $anchorScroll.yOffset = 60;
    $anchorScroll();
  };

}]);