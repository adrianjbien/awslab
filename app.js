var lab1_1 = require("./lab/lab1_1").lab
var example_1 = require("./example_1").lab;
var lab1_2 = require("./lab/lab1_2").lab;
var lab1_3 = require("./lab/lab1_3").lab;
var lab3_2 = require("./lab/lab3_2").lab;

var PORT = 8080;


var urlMap = [
	{path: "/", action:__dirname + "/static/index.html"},	 
	{path: "/digest", action: lab1_1},	
	{path: "/example_1", action: example_1},
	{path: "/lab1_2", action: lab1_2},
	{path: "/lab1_3", action: lab1_3},
	{ path: "/lab1_3_view", action: __dirname + "/static/lab1_3.html" },
	{path: "/lab3_2", action: lab3_2},
	{ path: "/lab3_2_view", action: __dirname + "/static/lab3_2.html" },
	];

var service = require("./lib/service").http(urlMap);

service(PORT);

