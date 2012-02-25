
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

function getRand (min, max) {
    return (Math.random() * (max - min)) + min;
}
module.exports.blob = function(canvas, options) {
	context = canvas.getContext('2d');

	var fillStyle = options.fillStyle ? options.fillStyle : "black";
	/*
	var x = options.x
		, y = options.y
		, w = options.w
		, h = options.h;
	*/
	var w = options.w; //canvas.width/5;
	var h = options.h; //canvas.height/4;

	var x = (canvas.width/2)-w;
	var y = (canvas.height/2)+(h/2);

	context.save();
	context.fillStyle = fillStyle;

	context.setTransform(1,0,0,1,0,0);
	context.globalCompositeOperation = "xor";
	//context.lineWidth = 6;
	//context.strokeStyle = "#000";
	context.beginPath();
	context.moveTo(x, y);
	var curvePct = .4;
	var corners = [[x+w, y], [x+w, y-h], [x, y-h], [x,y]];
	for (var i=0; i<corners.length; i++) {
		var corner = corners[i];
		var nextX = corner[0], nextY = corner[1];
		var cp1x = nextX * (getRand((-1*curvePct), curvePct))
			, cp1y = nextX * (getRand((-1*curvePct), curvePct))
			, cp2x = nextX * (getRand((-1*curvePct), curvePct))
			, cp2y = nextX * (getRand((-1*curvePct), curvePct));
		context.bezierCurveTo(nextX-cp1x, nextY-cp1y, nextX-cp2x, nextY-cp2y, nextX, nextY);
	}
	//context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x+w, y);
	//context.bezierCurveTo(7, 490, 488, 7, 493, 490);
	//context.bezierCurveTo(7, 490, 488, 7, 493, 490);
	//context.bezierCurveTo(7, 490, 488, 7, x+w, y+h);
	context.fill(); //.stroke();
	context.restore();
}

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