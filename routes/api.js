exports.photo = function(req, res) {
        var serverPath = '/images/' + req.files.photo.name;

        require('fs').rename(
          req.files.photo.path,
          './public' + serverPath,
          function(error) {
                if(error) {
                  res.send({
                        error: 'Welp. Something went wrong'
                  });
                  return;
                }
                res.redirect('/');
        }
        );
};
