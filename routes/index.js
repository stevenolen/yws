
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html');
};

exports.display = function(req, res){
  res.render('display.html');
};

exports.view = function(req, res){
  res.render('view.html');
};

