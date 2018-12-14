/*
*
*Router File
*
*/

//Get The Handlers
var handlers = require("./handler.js");

//Define a request router
var router = {
	"sample" : handlers.sample,
	"hello" : handlers.hello,
	"test" : handlers.test
}


//Export the module
module.exports = router;