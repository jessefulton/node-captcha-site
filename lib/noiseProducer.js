
module.exports.straightLines = function(canvas, options) {
	var maxY = canvas.height;
	var maxX = canvas.width;
	
	options = options ? options : {};
	var strokeWidth = options.width ? options.width : Math.ceil(maxY*.025);
	var strokeColor = options.color ? options.color : "#000000"
	var numLines = options.count ? options.count : 3;

	var context = canvas.getContext('2d');
	context.strokeStyle = strokeColor;
	context.lineWidth = strokeWidth;
	
	for (var i=0; i<numLines; i++) {
		var sy = (maxY/4) + Math.floor(Math.random() * (maxY/2));
		var dy = (maxY/4) + Math.floor(Math.random() * (maxY/2));
		var sx = Math.floor(Math.random() * (maxX/10));
		var dx = maxX - sx;
		//var sy = cy - Math.floor(Math.random() * (maxY/4 - 5));
		//var dy = maxY - sy;
		
		context.beginPath();
		context.moveTo(sx,sy);
		context.lineTo(dx,dy);
		context.closePath();
		context.stroke();
	
	}
	
	
};

module.exports.curvedLines = function(canvas, options) {

};

module.exports.snow = function(canvas, options) {
	options = options ? options : {};
	var opacity = options.opacity ? options.opacity : .2;


	var context = canvas.getContext('2d');
	
	for ( x = 0; x < canvas.width; x+=10 ) {  
		for ( y = 0; y < canvas.height; y+=10 ) {  
			var number = Math.floor( Math.random() * 60 );  
			context.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";  
			context.fillRect(x, y, 5, 5);  
		}
	}
};