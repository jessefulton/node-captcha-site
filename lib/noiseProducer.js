
module.exports.straightLines = function(context, options, fn) {

	return context;
};

module.exports.curvedLines = function(context, options, fn) {

	return context;
};

module.exports.snow = function(canvas, options, fn) {

	console.log("INSIDE SNOW");
	console.log(arguments);

	var context = canvas.getContext('2d');
	
	var opacity = .2;
	for ( x = 0; x < canvas.width; x+=10 ) {  
		for ( y = 0; y < canvas.height; y+=10 ) {  
			var number = Math.floor( Math.random() * 60 );  
			context.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";  
			context.fillRect(x, y, 5, 5);  
		}
	}
};