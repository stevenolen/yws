//connect to imap server and check for new messages
var util = require('util'),
    ImapConnection = require('imap').ImapConnection,
    MailParser = require('mailparser').MailParser,
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync('./controllers/email_config.json', 'utf-8'));

//imap connection info.
exports.check = function () { //why hello app.js, nice to see you.
var imap = new ImapConnection({
    username: config.username,
    password: config.password,
    host: config.imap.host,
    port: config.imap.port,
    secure: config.imap.secure
    });
//openinbox, fetch ALL unseen   
    function openInbox(cb) {
    imap.connect(function(err) {
      imap.openBox('INBOX', false, cb);
    });
  }
  openInbox(function(err, mailbox) {
        imap.on('mail', function() {
        console.log("A new message arrived via email, parsing it now");
  

	imap.search([ 'UNSEEN', ['SINCE', 'August 20, 2012'] ], function(err, results) {
     		      	      //**********************************
			      var fetch = imap.fetch(results, {
			          markSeen: true,
			          request: {
			          body: "full",
 			          headers: false
			          }
 			      });
     			      //**********************************

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	fetch.on('message', function(msg) {
          var parser = new MailParser({ streamAttachments: true });
          parser.on('attachment', function(attachment) {
                var output = fs.createWriteStream('./public/photos/email/'+attachment.generatedFileName);
                        attachment.stream.pipe(output);

                        output.on('close', function () {
                        var request = require('request');
                        var r = request.post('http://dev.technolengy.com:3000/photo')
                        var form = r.form()
                        form.append('photo', fs.createReadStream('./public/photos/email/'+attachment.generatedFileName))
                        });
                        });
          msg.on('data', function(chunk){
             parser.write(chunk.toString());
          });

          msg.on('end', function(){
             parser.end();
          });
        });
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//GTFO of IMAP server so we can check again in like 30 seconds.
      //fetch.on('end', function() {
       // console.log('Done fetching all messages!');
       // imap.logout();
      //});
    }); //end of imap.search
   }); //end of imap.on('mail)
  }); //end of openInbox function
//end imap junk
};
