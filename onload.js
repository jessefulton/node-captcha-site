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

	context.translate(0, fontSize-(.2*fontSize)); //FIXME: hack to adjust for descenders
	context.fillText(text, 0, 0);
    
    //window.resizeTo(textWidth, fontSize);

    document.body.style.backgroundColor = 'red';
    document.body.style.margin = '0px';
    document.body.className = "done";
};


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