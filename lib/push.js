var request = require("request");

/**
 * Create a Push object
 * @constructor
 */
function Push(options) {
  if (!options) {
    throw new Error("No options were supplied to the Push constructor");
  } else if (!options.applicationId) {
    throw new Error("No applicationId supplied to the Push constructor");
  } else if (!options.restApiKey) {
    throw new Error("No restApiKey supplied to the Push constructor");
  }

  //Set authentication
  this.applicationId = options.applicationId;
  this.restApiKey = options.restApiKey;

  //Custom host and port
  this.host = options.host ? options.host : "api.parse.com";
  this.port = options.port ? options.port : 443;
 
  //Protocol
  this.protocol = options.protocol ? options.protocol : "https";

  //Path
  this.path = options.path ? options.path : "/1/";
  
  //Proxy
  this.proxy = options.proxy ? options.proxy : ""; 
}

/**
 * Send push notification to specified channels
 * @param {array} channels Array of channel names.
 * @param {object} data an object with the data needed to be send. Must be able to be JSON stringified
 * @param {function} callback A callback function that will receive the response of the request
 */
Push.prototype.sendToChannels = function (channels, data, callback) {

  //Create the payload
  var payload = {
    channels: channels,
    data:     data
  };

  //Send to channels
  this.makeRequest(payload, "push", function(error, body){
    console.log(error, body);
    if(callback) callback(error, body);
  });

};

/**
 * Make request to the Parse API
 * @param {object} jsonBody The payload as an object to be JSON stringified
 * @param {endpoint} endpoint The endpoint 
 * @param {function} callback A callback function that will receive the response of the request
 */
Push.prototype.makeRequest = function (jsonBody, endpoint, callback) {

  //Construct the URL
  var url = this.protocol + "://" + this.host + ":" + this.port + this.path + endpoint;
  
  //Now we can get the request options
  var options = {
    uri:     url,
    method:  "POST",
    json:    jsonBody,
    headers: {
      "X-Parse-Application-Id": this.applicationId,
      "X-Parse-REST-API-Key":   this.restApiKey
    }
  };
  
  var r = request;
  
  if (this.proxy.length > 0)
    r = r.defaults({'proxy': this.proxy});

  //Make the request
  r(options, function (error, response, body) {
    if (error) {
      callback(error);
    } else if (response.statusCode == 200) {
      callback(undefined, body);
    } else {
      callback(new Error("Error from Parse REST API"));
    }
  });

}

module.exports = Push;
