moodApp.factory('twitterService', ['$q', function($q){
  var authorizationResult = false;

  return {
    initialize: function(){
      OAuth.initialize('42Pg7QXC4bSjm7_Mly9g7mGvCU8', {
        // this is a public key, and therefore publishable on github
        cache: true
      });
      authorizationResult = OAuth.create("twitter");
    },
    isReady: function(){
      return authorizationResult;
    },

    connectTwitter: function(){
      var deferred = $q.defer();
      OAuth.popup("twitter", {
        cache: true
      }, function(error, result){
        if (!error){
          authorizationResult = result;
          deferred.resolve();
        }
      });
      return deferred.promise;
    },

    searchTweets: function(hashtag){
      var deferred = $q.defer();
      var url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23' + hashtag + '+-filter:retweets+AND+filter:images&count=20';
      var promise = authorizationResult.get(url).done(function(data){
        deferred.resolve(data.statuses);
      }).fail(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    }
  }
}]);