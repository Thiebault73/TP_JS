'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});
var data = fs.readFileSync("owid-covid-data.json");
var json = JSON.parse(data);

var fr = json.FRA;

app.get("/cases", function(req, res) {
	
	res.json(fr);
});

app.get("/totalCases", function(req, res) {
	var totalCases = [];
	for(let cases in fr) {
		totalCases.push(fr[cases].total_cases);
	}

	res.json(totalCases);
});

app.get("/newCases", function(req, res) {
	var tabNewCases = [];
	for(let newCases in fr) {
		tabNewCases.push(fr[newCases].new_cases);
	}
	res.json(tabNewCases);
});

app.get("/totalDeath", function(req, res) {
	var tabDeath = [];
	for(let death in fr) {
		tabDeath.push(fr[death].total_deaths);
	}
	res.json(tabDeath);
});

app.get("/newDeath", function(req, res) {
	var tabDeath = [];
	for(let death in fr) {
		tabDeath.push(fr[death].new_deaths);
	}
	res.json(tabDeath);
});


app.listen(1337);