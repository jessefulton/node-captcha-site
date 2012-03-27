function getRand (min, max) {
    return (Math.random() * (max - min)) + min;
}

module.exports.basic = function(canvas, options, cb) {
	var context = canvas.getContext('2d');
	console.log(arguments);
	options = options ? options : {};
	var text = options.text ? options.text : "";
	var fontSize = options.size ? options.size : 64;
	var fontFace = options.font ? options.font : "Times";
	var fillStyle = options.fillStyle ? options.fillStyle : "black";


	context.save();

	context.font = fontSize + "px " + fontFace;
	context.fillStyle = fillStyle;
	
	//context.textAlign = "center";

	//console.log("Writing " + text);

	context.textAlign = "left";
	context.textBaseline = "middle";
	
	//FIXME: hack to adjust for descenders
	//context.translate(canvas.width/2, canvas.height/2);
	//fontSize-(.2*fontSize));
	//context.fillText(text, canvas.width/2, canvas.height/2);
	
	context.translate(10, canvas.height/2); 
	
	for (var x = 0; x < text.length; x++)
	{
		context.save();
		var c = text.charAt(x);
		var metrics = context.measureText(c);
		var w = metrics.width;
	
		context.transform (1, getRand(-.5,.5), getRand(-.5,.5), 1, 0, 0);
		context.fillText (c, 0, 0) ;
	
		context.restore();
		//context.setTransform (1, 0, 0, 1, 0, 0);
		context.translate(w, 0);
	}
	
	
	
	if (cb) { cb(context); }
	context.restore();
};
