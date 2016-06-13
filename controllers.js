moodApp.controller('HomeController', ['$q','twitterService', function($q, twitterService){
  var ctrl = this;
  ctrl.tweets = [];
  ctrl.mapMood = {
    "happy": "cats",
    "sad": "puppies"
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