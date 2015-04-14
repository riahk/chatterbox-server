/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messages = require('./messages.json');
var fs = require('fs');

module.exports.requestHandler = function(request, response) {

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "JSON";
  response.writeHead(statusCode, headers);
  console.log("Serving request type " + request.method + " for url " + request.url);
  var responseBody = '';
  if(request.url === '/classes/room1') {
    if(request.method === "POST") {
        response.writeHead(201, headers);
        request.on('data', function (chunk) {
        var chunks = JSON.parse(chunk.toString());
        messages.results.push(chunks);
        console.log(messages.results[messages.results.length-1]);
        fs.writeFile("./messages.json", JSON.stringify(messages));
      });

    } else if(request.method === "GET") {
        responseBody = JSON.stringify(messages);
        response.writeHead(200, headers);
    }
  } else { response.writeHead(404, headers); }



  response.end(responseBody);
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandlerMessages = function(request, response) {

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "JSON";
  response.writeHead(statusCode, headers);
  console.log("Serving request type " + request.method + " for url " + request.url);
  var responseBody = '';
  if(request.url === '/classes/messages') {
    if(request.method === "POST") {
        response.writeHead(201, headers);
        request.on('data', function (chunk) {
        var chunks = JSON.parse(chunk.toString());
        messages.results.push(chunks);
        console.log(messages.results[messages.results.length-1]);
        fs.writeFile("./messages.json", JSON.stringify(messages));
      });

    } else if(request.method === "GET") {
        responseBody = JSON.stringify(messages);
        response.writeHead(200, headers);
    }
  } else { response.writeHead(404, headers); }



  response.end(responseBody);
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

//
