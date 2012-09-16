exports.photo = function(req, res) {
	var newphoto = new PhotoModel({
		wedid: '345',
		path: req.files.photo.path,
        	timestamp: req.files.photo.lastmodifieddate});
	    newphoto.save(function(error) {
                if(error) {
                  res.send({
                        error: 'Welp. Something went wrong'
                  });
                  return;
                }
                console.log('saved');
		res.redirect('/');
        }
        );
};

exports.wedding = function(req, res) {
	var wedding = new WeddingModel();
	wedding.wedid = 0001;
	wedding.name = 'Nolen/Marchant';
	wedding.save(function(err) {
	  console.log('error check');
	  if(err) { throw err; }
	  console.log('saved');
	  db.disconnect();
}
);
};
	
