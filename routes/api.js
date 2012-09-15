exports.photo = function(req, res) {
/*        var serverPath = '/images' + req.files.photo.path;

        require('fs').rename(
          req.files.photo.path,
          './public/photos' + serverPath,
*/
	  
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
