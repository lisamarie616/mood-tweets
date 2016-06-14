moodApp.controller('HomeController', ['$q','twitterService', function($q, twitterService){
  var ctrl = this;
  ctrl.tweets = [];
  ctrl.mapMood = {
    "stressed": "SunsetMoments",
    "sad": "puppiesoftwitter",
    "bored": "CatsOfTwitter",
    "uninspired": "quotes%20%23motivational",
    "anxious": "beach%20%23peaceful",
    "wolflike": "fullmoon%20%23moon",
    "patriotic": "usa%20%23flag",
    "adventurous": "waterfall%20%23travel"
  }

  ctrl.photoFilter = function(item){
    return item.entities.media;
  }

  twitterService.initialize();

  ctrl.populateTweets = function(hashtag){
    twitterService.searchTweets(hashtag).then(function(data){
      ctrl.tweets = data;
    }, function(){
      this.rateLimitError = true;
    });
  }

  ctrl.showTweets = function(mood){
    twitterService.connectTwitter().then(function(){
      if (twitterService.isReady()){
        ctrl.populateTweets(ctrl.mapMood[mood]);
      }
    })
  }
  

}])