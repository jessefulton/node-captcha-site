
var Captcha = function(canvas) {
	this.canvas = canvas;
	
	this._text = "";
	this.fontSize = 64;
	this.fontFace = "Times";
	
	
	var executionChain = [];
	
	this.init = function(text, fontSize, fontFace) {
		this._text = text;
		this.fontSize = fontSize;
		if (fontFace) {
			this.fontFace = fontFace;
		}
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
		this.canvas.width = textWidth;
		this.canvas.height = this.fontSize;		
		//context.restore();
	}
	
	this.render = function() {
		console.log(executionChain);
		executionChain.forEach(function(el, idx, arr) {
			el.call(el);
		});
	}
	
}

module.exports = Captcha;