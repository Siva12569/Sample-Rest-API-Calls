/*
*
*Primary File For Api
*
*/

//Dependencies
var http =require("http");
var https = require("https");
var fs = require("fs");
var url = require("url");
var config = require("./config");
var StringDecoder = require("string_decoder").StringDecoder;
var router = require("./router.js");
var handlers = require("./handler.js");

//The server should response to all http requests with a string
var httpServer = http.createServer(function(req,res){
	unifiedFunction(req,res);
});

//The server should response to all https requests with a string
var httpsServerObject = {
	"key" : fs.readFileSync("./https/key.pem"),
	"cert" : fs.readFileSync("./https/cert.pem")
}

var httpsServer = https.createServer(httpsServerObject,function(req,res){
	unifiedFunction(req,res);
});

//http server listen port
httpServer.listen(config.httpPort,function(){
	console.log("Http server listening on port is :"+config.httpPort);
});


//https server listen port
httpsServer.listen(config.httpsPort,function(){
	console.log("Https server listening on port is :"+config.httpsPort);
});



//Define generic function for all environments
var unifiedFunction = function(req,res){

	//Get The Url and parse it
	var parsedUrl = url.parse(req.url,true);

	//Get the path
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');

	//Get the query string as an object
	var queryStringObject = parsedUrl.query;

	//Get the HTTP method
	var method =req.method.toLowerCase();

	//Get the header as an object
	var headers = req.headers;

	//Get The payload if any
	var decoder = new StringDecoder("utf-8");
	var buffer = "";


	req.on("data",function(data){
		buffer += decoder.write(data); 
	});

		req.on("end",function(){
		buffer += decoder.end();

		//choose the handler this request should go to.if one is not found
		var chosenHandler = typeof(router[trimmedPath]) !="undefined" ? router[trimmedPath] : handlers.notFound;

		//construct the data object to send to the handler
		var data = {
			'trimmedPath' : trimmedPath,
			'queryStringObject' : queryStringObject,
			'method' : method,
			'headers' : handlers,
			'payload' : buffer

		}

		//Route the request to the handler to the handler specified in the router
		chosenHandler(data,function(statusCode,payload){
			//Use the status code called back by the handler,or default to 200

			statusCode= typeof(statusCode) == "number" ? statusCode : 200;

			// Use the payload called back by the handler, or default to empty object
			payload = typeof(payload) == "object" ? payload : {};


			//convert the payload to a string
			var payloadStrng = JSON.stringify(payload);

			//Return the response
			res.setHeader("content-Type","application/json");
			res.writeHead(statusCode);
			res.end(payloadStrng);



			//Log the request path
			console.log("Returning this response :",statusCode,payloadStrng);
	

		});
	});
}

