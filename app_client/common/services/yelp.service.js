(function () {
    angular
        .module('wifinderApp')
        .service('yelp', yelp);

    yelp.$inject = ['$http'];
    function yelp($http) {

        var getLocations = function (term, location, tokenSecret, consumerSecret, consumerKey, token, signatureMethod,
                                     signature, timestamp, nonce) {
            return $http.get('/api.yelp.com/v2/search?term=' + term + '&location=' + location + '&%oauth_token_secret='
            + tokenSecret + '&oauth_consumer_secret=' + consumerSecret + '&oauth_consumer_key=' + consumerKey +
            '&oauth_token=' + token + '&oauth_signature_method=' + signatureMethod + '&oauth_signature=' + signature +
            '&%oauth_timestamp=' + timestamp + '&%oauth_nonce=' + nonce);
        };

        return {
            getLocations: getLocations
        };
    }
}());

