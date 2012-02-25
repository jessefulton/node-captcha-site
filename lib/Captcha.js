
var Captcha = function(canvas) {
	this.canvas = canvas;
	
	this._text = "";
	this.fontSize = 64;
	this.fontFace = "Times";
	this.padding = 0;
	
	
	var executionChain = [];
	
	this.init = function(text, fontSize, fontFace, padding) {
		this._text = text;
		this.fontSize = fontSize;
		if (fontFace) {
			this.fontFace = fontFace;
		}
		this.padding = padding;
		this.adjustSize();
		return this;
	}
	
	this.saveContext = function() {}
	this.restoreContext = function() {}
	
	
	this.noise = function(noise, options) {
		var ctx = this.canvas;
		executionChain.push(function() {
			noise(ctx, options);
		});
		return this;
	}
	
	this.gimp = function(renderer, options) {
		var ctx = this.canvas;
		executionChain.push(function() {
			renderer(ctx, options);
		});
		return this;
	}
	
	this.text = function(textProducer, options) {
		var ctx = this.canvas;
		executionChain.push(function() {
			textProducer(ctx, options);
		});
		return this;	
	}
	
	this.adjustSize = function() {
		var context = this.canvas.getContext('2d');
		//context.save();
		context.font = this.fontSize + "px " + this.fontFace;
		var textWidth = context.measureText(this._text).width;
		this.canvas.width = (textWidth + (this.padding ? this.padding : 0)) * 2;
		this.canvas.height = (this.fontSize + (this.padding ? this.padding : 0)) * 4;
		//context.restore();
	}
	
	this.render = function() {
		console.log(executionChain);
		executionChain.forEach(function(el, idx, arr) {
			el.call(el);
		});
	}
	
	this.crop = function() {
		var context = this.canvas.getContext('2d');
		var imageData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
		var data = imageData.data;
		
		var maxX = 0
			, maxY = 0
			, minX = this.canvas.width
			, minY = this.canvas.height;
			

		for (var i=0; i<data.length; i+=4) {
        	var alpha = data[i + 3];
        	if (alpha != 0) {
        		//we have image data
        		var x = Math.floor((i/4) % imageData.width) + 1;
        		var y = Math.floor((i/4) / imageData.width) + 1;
        		
        		if (x < minX) { minX = x; }
        		if (x > maxX) { maxX = x; }
        		if (y < minY) { minY = y; }
        		if (y > maxY) { maxY = y; }
        	}
		}
		console.log(minX, maxX, minY, maxY);

		var croppedData = context.getImageData(minX, minY, (maxX-minX), (maxY-minY));
		this.canvas.width = maxX-minX;
		this.canvas.height = maxY-minY;
		
		context.putImageData(croppedData, 0, 0);


		//context.strokeRect (minX, minY, (maxX-minX), (maxY-minY));
		/*
		context.fillRect (minX, minY, 5, 5);
		context.fillRect (minX, maxY, 5, 5);
		context.fillRect (maxX, minY, 5, 5);
		context.fillRect (maxX, maxY, 5, 5);
		*/
	}
}

module.exports = Captcha;