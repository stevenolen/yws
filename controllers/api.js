var express = require('express');
var Photo = require('../models/photo.js');

exports.photo = function(req, res) {
	new Photo({wedid: req.body.wedid, path: req.files.photo.path}).save();
	res.redirect('/');
};
