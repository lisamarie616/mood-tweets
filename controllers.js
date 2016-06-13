moodApp.controller('HomeController', ['$q','twitterService', function($q, twitterService){
  var ctrl = this;
  ctrl.tweets = [];

  twitterService.initialize();

  ctrl.populateTweets = function(hashtag){
    twitterService.searchTweets(hashtag).then(function(data){
      ctrl.tweets = data;
    }, function(){
      this.rateLimitError = true;
    });
  }

  ctrl.showTweets = function(hashtag){
    twitterService.connectTwitter().then(function(){
      if (twitterService.isReady()){
        ctrl.populateTweets(hashtag);
      }
    })
  }
  

}])