/*
*
* Configuration file for project
* Contains all the environment variables
*
*/

//Define environment object
var environment = {};

//create staging environment ,it is default environment
environment.staging = {
	"httpPort" : 3000,
	"httpsPort" : 3001,
	"envName" : "staging"
}

//create production enviornment 
environment.production = {
	"httpPort" : 5000,
	"httpsPort" : 5001,
	"envName" : "production"
}

//Get the current environment 
var currentEnvironment = typeof(process.env.NODE_ENV) == "string" ? process.env.NODE_ENV.toLowerCase() : "";

//Export current Environment
var environmentExport = typeof(environment[currentEnvironment]) == "object" ? environment[currentEnvironment] : environment.staging;

//Define module
module.exports = environmentExport;