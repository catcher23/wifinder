var mongoose = require('mongoose');
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: {type: String, required: true},
    createdOn: {type: Date, "default": Date.now}
});

var locationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    rating: {type: Number, "default": 0, min: 0, max: 5},
    facilities: [String],
    coords: {type: [Number], index: '2dsphere', required: true},
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

locationSchema.methods.findLocation = function (parameters, callback) {
    var httpMethod = 'GET',
        url = 'http://api.yelp.com/v2/search';

    var required_parameters = {
        oauth_consumer_key: process.env.CONSUMER_KEY,
        oauth_token: process.env.TOKEN,
        oauth_nonce: n(),
        oauth_timestamp: n().toString().substr(0, 10),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0'
    };

    var parameters = _.assign(parameters, required_parameters),
        consumerSecret = process.env.CONSUMER_SECRET,
        tokenSecret = process.env.TOKEN_SECRET;

    var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, {encodeSignature: false});

    parameters.oauth_signature = signature;

    var paramURL = qs.stringify(parameters);
    var apiURL = url + '?' + paramURL;

    request(apiURL, function(error, response, body){
        return callback(error, response, body);
    });
};

mongoose.model('Location', locationSchema);

