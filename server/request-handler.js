/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messages = require('./messages.json');
var _ = require('underscore');
var fs = require('fs');
var express = require('express');

module.exports.expressGet = function(request, response) {
  var newMessages = messages.results.slice();
  var orderedMessages = {results: newMessages.reverse()};
  response.status(200).send(JSON.stringify(orderedMessages));
};

module.exports.expressGetIndex = function(request, response) {
};

module.exports.expressPost = function(request, response) {

        messages.results.push(request.body);
        console.log(messages.results[messages.results.length-1]);
        fs.writeFile("./messages.json", JSON.stringify(messages));
  response.status(201).send();
};
module.exports.expressOptions = function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  next();
  // fs.writeFile("./messages.json")
}

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
  var dir = "/client/client";
  var extension = _.last(request.url.match(/\.[a-zA-Z]+/g)) || "";
  headers['Content-Type'] = "JSON";
  response.writeHead(statusCode, headers);
  console.log("Serving request type " + request.method + " for url " + request.url);
  var responseBody = '';

  if (request.method === "OPTIONS") {
    response.end(responseBody);
  }

  if(request.url === '/classes/messages') {
    if(request.method === "POST") {
        response.writeHead(201, headers);
        request.on('data', function (chunk) {
          var chunks = JSON.parse(chunk.toString());
          messages.results.push(chunks);
          console.log(messages.results[messages.results.length-1]);
          fs.writeFile("./messages.json", JSON.stringify(messages), function () {response.end(responseBody);});
      });

    } else if(request.method === "GET") {
        responseBody = JSON.stringify(messages);
        response.writeHead(200, headers);
        response.end(responseBody);
    }
  } else if (request.url === '/'){
      fs.readFile(".."+dir+"/index.html", function (err, data) {
        headers['Content-Type'] = "text/html";
        response.writeHead(200, headers);
        responseBody = data.toString();
        response.end(responseBody);
      });
  } else if (extension.slice(1) === "js" || extension.slice(1) === "css"){
      fs.readFile(".."+dir+request.url, function (err, data) {
        // console.log(data);
        var type = _.last(request.url.match(/\.[a-zA-Z]+/g)).slice(1);
        console.log(type)
        type = type === "js" ? "javascript" : type;
        headers['Content-Type'] = "text/"+type;
        response.writeHead(200, headers);
        responseBody = data.toString();
        response.end(responseBody);
      });
  }
  else { response.writeHead(404, headers); response.end(responseBody);}



};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

//
