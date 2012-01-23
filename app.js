if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

/**
 * Module dependencies.
 */
var express = require('express')
  , stylus = require('stylus')
  , http = require('http');

var app = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //let's change this to a local dir? then rsync to media server or use nginx?
  app.set('screenshots', '/tmp');
  app.set('root', __dirname);
  app.set('outputdir', __dirname + "/public/captcha");
  app.set('phantom', 'phantomjs');
  app.use(express.favicon());
  app.use(stylus.middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});


app.configure('development', function(){
	app.use(express.logger('dev'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});




/**
 * App routes.
 */
app.get('/captcha/:text', function (req, res) {
	var exec = require('child_process').exec
	  , script = __dirname + '/captcha.js'
	  , bin = 'phantomjs';
	
	var theText = (req.params.text);
	if (theText.lastIndexOf('.') != -1) {
		console.log(theText + " lastIndexOf = " + theText.lastIndexOf('.'));
		theText = theText.slice(0, theText.lastIndexOf('.'));
	}
	console.log('inside /captcha ' + theText);
	
	console.log(script);
	
	console.log(app.set('outputdir'));
	
	var filename = app.set('outputdir') + "/" + theText + ".png";
	console.log(filename);
	
	var cmd = [bin, script];
	console.log(cmd);
	cmd.push(theText);
	cmd.push(64);
	cmd.push(filename);
	cmd = cmd.join(' ');

	exec(cmd, function(err) {
	    if (err) {
	    	console.log(err);
	    	return next(err);
	    }
	    res.sendfile(filename);
	});

});


/**
 * Start it.
 */
var port = process.env.PORT || 3000;
app.listen(port, function () {
    var addr = app.address();
	console.log('	 app listening on http://' + addr.address + ':' + addr.port);
    console.log('	NODE_ENV = ' + process.env.NODE_ENV);
});
