/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRand (min, max) {
    return (Math.random() * (max - min)) + min;
}

function writeCaptcha(text, fontSize){
	var el = document.getElementById('surface'),
        context = el.getContext('2d'),
        width = window.innerWidth,
        height = window.innerHeight;

	if (!fontSize) { fontSize = 32; }


/*
When the canvas element is created, and subsequently whenever the width and height attributes are set (whether to a new value or to the previous value), the bitmap and any associated contexts must be cleared back to their initial state and reinitialized with the newly specified coordinate space dimensions.
*/

    el.width = width;
    el.height = height;

	var font = fontSize + "px Times";
	//TODO: calculate font size
	context.font = font;
    //context.textAlign = "center";
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.lineWidth = 4;
    
    
    var metrics = context.measureText(text);
    
    var textWidth = metrics.width;
    //el.width = textWidth;

//	context.translate(0, fontSize-(.2*fontSize)); //FIXME: hack to adjust for descenders
//	context.setTransform (1, -0.2, 0, 1, 0, 0);
//	context.fillText(text, 0, 0);
//    context.setTransform(1,0,0,1,0,0);
    //window.resizeTo(textWidth, fontSize);

	context.save();
	
	context.font = '20px arial,sans-serif' ;
	context.fillStyle = 'black' ;
	context.setTransform (1, -0.2, 0, 1, 0, 0);
	context.fillText ('your text', 100, 100) ;
	context.setTransform (1, 0.2, 0.6, 2, 0, 0);
	context.fillText ('number 2', 100, 100) ;
	context.setTransform (1, 0, 0, 1, 0, 0);
	
	context.translate(40, 50);
	var str = "words";
	for (var x = 0; x < str.length; x++)
	{
		context.save();
		var c = str.charAt(x);
		var metrics = context.measureText(c);
		var w = metrics.width;
		console.log(w);
	
		context.transform (1, getRand(-.5,.5), getRand(-.5,.5), 1, 0, 0);
		context.fillText (c, 0, 0) ;
	
		context.restore();
		//context.setTransform (1, 0, 0, 1, 0, 0);
		context.translate(w, 0);
	}
	
	context.restore();
	
	context.globalCompositeOperation = "xor";
	addShape(context, 120, 120, 10, 10);




    document.body.style.backgroundColor = 'white';
    document.body.style.margin = '0px';
    document.body.className = "done";
};


function addShape(context, x, y, w, h) {
	context.save();
	//context.lineWidth = 6;
	//context.strokeStyle = "#000";
	context.beginPath();
	context.moveTo(x, y);
	var curvePct = .5;
	var corners = [[x+w, y], [x+w, y-h], [x, y-h], [x,y]];
	for (var i=0; i<corners.length; i++) {
		var corner = corners[i];
		var nextX = corner[0], nextY = corner[1];
		var cp1x = nextX * (getRand((-1*curvePct), curvePct))
			, cp1y = nextX * (getRand((-1*curvePct), curvePct))
			, cp2x = nextX * (getRand((-1*curvePct), curvePct))
			, cp2y = nextX * (getRand((-1*curvePct), curvePct));
		context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nextX, nextY);
	}
	//context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x+w, y);
	//context.bezierCurveTo(7, 490, 488, 7, 493, 490);
	//context.bezierCurveTo(7, 490, 488, 7, 493, 490);
	//context.bezierCurveTo(7, 490, 488, 7, x+w, y+h);
	context.fill(); //.stroke();
	context.restore();
}

function dimensions(text, fontSize) {
	var el = document.getElementById('surface'),
        context = el.getContext('2d');

	context.save();

	var font = fontSize + "px Times";
	//TODO: calculate font size
	context.font = font;
    //context.textAlign = "center";
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.lineWidth = 4;
    var metrics = context.measureText(text);
    context.restore();
    return {"width": metrics.width, "height": fontSize};
    
}