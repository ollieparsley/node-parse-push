#node-parse-push

Library for using ParsePush - https://www.parse.com/docs/push_guide

##Install

    npm install parse-push

Or check out from source

    git clone git@github.com:hootware/node-parse-push.git
    cd node-parse-push
    npm link

##Usage

Send data to a number of channels

```JavaScript
var Push = require("parse-push");

//Create new push instance
var push = new Push({
  applicationId: "MyApplicationId",
  restApiKey:    "MyRestApiKey"
});

//Now send to some channels
push.sendToChannels(["channel1","channel2","channel3"], {"foo":"bar"}, function(error, data){
  if (error) {
    console.error("Oh no it went wrong!: " + error.message);
  } else {
    console.log("It went well! ", data);
  }
});
```

