// web.js
var express = require("express");
var logfmt = require("logfmt");
var restler = require('restler');
var app = express();

app.use(logfmt.requestLogger());

app.all('/', function(request, response) {
    restler.get('http://reddit.com/.json').on('complete', function(reddit) {
        var titles = "<Response>";
        for(var i=0; i<5; i++) {
            titles += "<Sms>" + reddit.data.children[i].data.title + "</Sms>";
        }
        titles += "</Response>";
        response.send(titles);
    });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

