
module.exports.shadow = function(canvas, options, fn) {
	options = options ? options : {};
	var x = options.x ? options.x : 5;
	var y = options.x ? options.y : 5;
	var color = options.color ? options.color : "rgba(0,0,0,.25)";

	var context = canvas.getContext('2d');

	//context.save();
	context.shadowOffsetX = x;
	context.shadowOffsetY = y;
	context.shadowColor = color;
	
	
	//fn(context, options);
	if (fn) {
		fn.call(context);
	}
	//context.restore();

};
