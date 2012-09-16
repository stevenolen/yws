var express = require('express');
var Photo = require('../models/photo.js');

//takes a POST to /photo and creates a db doc with pointers
exports.photopost = function(req, res) {
	new Photo({wedid: req.body.wedid, path: req.files.photo.path}).save();
	res.redirect('/');
};

//takes a GET to /photo and returns a list of all photos?
//maybe instead this should only accept /photo/:wedid to limit the returned values
exports.photoget = function(req, res) {
	Photo.find(function(err, photos) {
	  res.send(photos);
})};
