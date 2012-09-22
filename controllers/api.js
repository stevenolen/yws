var express = require('express');
var hat = require('hat');
var uuid = require('node-uuid');
var gm = require('gm');
var Photo = require('../models/photo.js');
var Wedding = require('../models/wedding.js');

//takes a POST to /photo and creates a db doc with pointers
exports.photopost = function(req,res) {
	var photoudid = uuid.v4();
        var randsizes = Array(200,225,250,275,300,325,350,375)
	var basePath = './public/photos/';
	var origPath = basePath + 'orig/' + photoudid;
	var scalePath = basePath + 'scale/' + photoudid;
        require('fs').rename(req.files.photo.path, origPath, function(err) {
          if(err) { console.log({ error: 'FILE NOT PLACED CORRECTLY' }); return; }});
	var randsize = randsizes[Math.floor(Math.random()*randsizes.length)];
	gm(origPath).resize(randsize).write(scalePath, function(err){
		if (err) console.log("Error: " + err);
	
});
	new Photo({wedding: 123, udid: photoudid, timestamp: req.files.photo.lastModifiedDate}).save();
 	      	console.log("photo "+photoudid+" uploaded"+randsize);
        	res.redirect('/');

};


//takes a GET to /photo/:wedding
exports.photoget = function(req, res) {
	Photo.find({'wedding':req.params.wedding},'udid timestamp', function(err, photo) {
	if (err) return handleError(err);
	res.send(photo)
})};

//takes a POST to /wedding and instantiates a new wedding.
exports.weddingpost = function(req, res) {
	var weddingid = hat(10,10);
	var passcode = hat(10,10);
	new Wedding({wedding: weddingid, name: req.body.weddingname, passcode: passcode}).save();
	console.log(JSON.stringify(req.body.weddingname))
	res.redirect('/');
};

//takes a GET to /wedding and returns a list of all weddings (with their ids)
exports.weddingget = function(req, res) {
	Wedding.find('wedding name', function(err, wedding) {
	if (err) return handleError(err);
	res.send(wedding)
})}; 
