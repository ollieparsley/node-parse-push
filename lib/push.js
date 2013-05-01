var request = require("request");

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
  this.path = options.path ? options.path : "/1/push";

}

Message.prototype.sendToChannels = function (channels, data, callback) {

  //Create the payload
  var payload = {
    channels: channels,
    data:     data
  };

  //Construct the URL
  var url = this.protocol + "://" + this.host + ":" + this.port + this.path;
  
  //Now we can get the request options
  var options = {
    uri:     url,
    method:  "POST",
    json:    payload,
    headers: {
      "X-Parse-Application-Id": this.applicationId,
      "X-Parse-REST-API-Key":   this.restApiKey
    }
  };
  
  //Make the request
  request(options, function (error, response, body) {



    if (!error && response.statusCode == 200) {
      console.log(body.id) // Print the shortened url.
    }
  });

  
  
  /*curl -X POST \
  -H "X-Parse-Application-Id: TrFHR8DGUPUbSxy6HD4ppNt27nBkrJTnLPCvafVa" \
  -H "X-Parse-REST-API-Key: 27vjZ81LhKHJ79ORy4kyuNOPXW2MiWxLi7SaYFrg" \
  -H "Content-Type: application/json" \
  -d '{
        "channels": [
          "Giants",
          "Mets"
        ],
        "data": {
          "alert": "The Giants won against the Mets 2-3."
        }
      }' \
  https://api.parse.com/1/push*/






};

module.exports = Push;
