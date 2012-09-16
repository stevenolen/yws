exports.photo = function(req, res) {
        var serverPath = '/images' + req.files.photo.path;

        require('fs').rename(
          req.files.photo.path,
          './public/photos' + serverPath,

	  
        function(error) {
                if(error) {
                  res.send({
                        error: 'Welp. Something went wrong'
                  });
                  return;
                }
                console.log(JSON.stringify(req.files.photo));
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
	
