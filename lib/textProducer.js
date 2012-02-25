
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

	console.log("Writing " + text);

	context.textAlign = "center";
	context.textBaseline = "middle";
	
	//FIXME: hack to adjust for descenders
//	context.translate(canvas.width/2, canvas.height/2); //fontSize-(.2*fontSize));
	context.fillText(text, canvas.width/2, canvas.height/2);
	
	if (cb) { cb(context); }
	context.restore();
};
