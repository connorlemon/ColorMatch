var express = 	require('express'),
	app		=	express(),
	bodyParser = require("body-parser"),
	Howl = require('howler');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.render("index");
});

app.listen(process.env.PORT || 3000, function(){
	console.log("The Color Match server has started");
});