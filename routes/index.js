
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html');
};

exports.display = function(req, res){
  res.render('display.html');
};

exports.admin = function(req, res){
  res.render('admin.html');
};

exports.auto = function(req, res){
  res.render('auto.html');
};
