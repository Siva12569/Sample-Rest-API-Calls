/*
*
*Handler File
*
*/


//Define handler
var handlers = {};

//hello handler
handlers.hello = function(data,callback){
	callback(200,{"hello":"Hello Handler"});
}

//hello handler
handlers.sample = function(data,callback){
	callback(200,{"sample":"sample json file"});
}

//hello handler
handlers.test = function(data,callback){
	callback(200,{"test":"test json object"});
}

//Not Found Handler
handlers.notFound = function(data,callback){
	callback(404);
}

//Export the module
module.exports = handlers;