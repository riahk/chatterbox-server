var express = require('express');
var handler = require('./request-handler.js');
var bodyParser = require('body-parser');

var app = express();
var dir = "../client/client";
app.use(express.static(dir));
app.use(bodyParser.json());
app.use(handler.expressOptions);
 app.get('/classes/messages', handler.expressGet);
app.post('/classes/messages', handler.expressPost);

var server = app.listen(3000,'127.0.0.1', function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Chatterbox is listening at http://%s:%s', host, port);
})

