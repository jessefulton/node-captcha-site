if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

/**
 * Module dependencies.
 */
var express = require('express')
	, stylus = require('stylus')
	, http = require('http')
	, redis = require('redis')
	, Canvas = require('canvas');

var app = express.createServer();

app.configure(function(){
  app.db = redis.createClient();
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('case sensitive routes', true);
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



app.get('/captcha/:text/:size?', function (req, res) {
	var text = req.params.text;
	var fontSize = req.params.size ? parseInt(req.params.size) : 64;

	var canvas = new Canvas(400,200)
		, context = canvas.getContext('2d');
  
	var font = fontSize + "px Times";
	//TODO: calculate font size
	context.font = font;
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.lineWidth = 4;

	context.translate(0, fontSize-(.2*fontSize)); //FIXME: hack to adjust for descenders
	context.fillText(text, 0, 0);
	
	canvas.toBuffer(function(err, buff) { 
		res.contentType("image/png");
		res.send(buff);
	});
	
});

/**
 * App routes.
 */
app.get('/phantom_captcha/:text/:size?', function (req, res) {


	var exec = require('child_process').exec
	  , script = __dirname + '/phantom_captcha.js'
	  , bin = 'phantomjs';
	
	var theText = req.params.text;
	var theSize = req.params.size ? req.params.size : 64;
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
	cmd.push(theSize);
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
    app.set("basedomain", 'http://' + addr.address + ':' + addr.port);
	console.log('    app listening on ' + app.set("basedomain"));
    console.log('    NODE_ENV = ' + process.env.NODE_ENV);
});
