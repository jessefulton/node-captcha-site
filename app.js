if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

/**
 * Module dependencies.
 */
var express = require('express')
	, stylus = require('stylus')
	, http = require('http')
	//, redis = require('redis')
	, Canvas = require('canvas');


var Captcha = require('./lib/Captcha')
	, noiseProducer = require('./lib/noiseProducer')
	, textProducer = require('./lib/textProducer')
	, gimp = require('./lib/gimpyRenderer');


var app = express.createServer();

app.configure(function(){
  //app.db = redis.createClient();
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('case sensitive routes', true);
  //let's change this to a local dir? then rsync to media server or use nginx?
  app.set('screenshots', '/tmp');
  app.set('root', __dirname);
  app.set('outputdir', __dirname + "/public/_generated");
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
app.get('/', function (req, res) {
	res.render('index', { layout: true });
});

app.get('/generate', function (req, res, next) {
	console.log('matched captcha with queries');

	var text = req.query.text;
	var fontSize = req.query.size ? parseInt(req.query.size) : 64;
	var color = "#" + (req.query.color ? req.query.color : "000000");
	var canvas = new Canvas(400,200)
	var fontface = req.query.font ? req.query.font : "Times";

	if (text) {
	
		var captcha = new Captcha(canvas);
		captcha.init(text, fontSize, fontface); //, 300);
		//noiseProducer.snow(captcha);
		//textProducer.basic(captcha, {"text": text, "size": fontSize});
		
		captcha
			//.gimp(gimp.shadow)
			.text(textProducer.basic, {"text": text, "size": fontSize, "fillStyle": color, "font": fontface })
			//.noise(noiseProducer.snow, {"colors": [], "size": 10, "density": .75})
			.noise(noiseProducer.blob, {"fillStyle": color, "h": fontSize, "w": (fontSize * 1.5)})
			//.noise(noiseProducer.straightLines, {"color": color})
			.render();
		
		captcha.crop();
		
		captcha.canvas.toBuffer(function(err, buff) { 
			res.contentType("image/png");
			res.send(buff);
		});
	}
	else {
		next();
	}
});

app.get('/generate/:text/:size?/:color?/:font?', function (req, res, next) {
	console.log('matched captcha no query');

	var text = req.params.text;
	var fontSize = req.params.size ? parseInt(req.params.size) : 64;
	var color = "#" + (req.params.color ? req.params.color : "000000");
	var canvas = new Canvas(400,200)
	var fontface = req.params.font ? req.params.font : "Times";



	var captcha = new Captcha(canvas);
	captcha.init(text, fontSize, fontface); //, 300);
	//noiseProducer.snow(captcha);
	//textProducer.basic(captcha, {"text": text, "size": fontSize});
	
	captcha
		//.gimp(gimp.shadow)
		.text(textProducer.basic, {"text": text, "size": fontSize, "fillStyle": color, "font": fontface })
		//.noise(noiseProducer.snow, {"colors": [], "size": 10, "density": .75})
		.noise(noiseProducer.blob, {"fillStyle": color, "h": fontSize, "w": (fontSize * 1.5)})
		//.noise(noiseProducer.straightLines, {"color": color})
		.render();
	
	captcha.crop();
	
	captcha.canvas.toBuffer(function(err, buff) { 
		res.contentType("image/png");
		res.send(buff);
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