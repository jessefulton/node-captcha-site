
module.exports.shadow = function(canvas, options, fn) {
	console.log("INSIDE SHADOW");
	console.log(arguments);


	var context = canvas.getContext('2d');
	console.log(arguments);

	//context.save();
	context.shadowOffsetX = 14;
	context.shadowOffsetY = 6;
	context.shadowColor = "rgba(255,0,0,.5)";
	
	
	//fn(context, options);
	if (fn) {
		fn.call(context);
	}
	//context.restore();

};
