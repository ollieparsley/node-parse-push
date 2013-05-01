var Push = require("../index.js");

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
