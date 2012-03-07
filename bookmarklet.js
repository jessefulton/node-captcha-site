(function() {

	//TODO: inject canvas element and create image data urls rather than bogging down server
	
	//TODO: check for jquery and inject it if needed (noconflict?)
	if (typeof(window.jQuery) != 'function') {
		console.log('no jquery');
		var s=document.createElement('script');
		s.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
		document.getElementsByTagName('body')[0].appendChild(s);
	}
	else {
		console.log('already had jquery');
	}

	var doIt = function() {	
		var getTextNodesIn = function(el) {
			var whitespace = /^\s*$/;
			return $(el).find("*").andSelf().contents().filter(function() {
				return (this.nodeType == 3) && !whitespace.test(this.nodeValue);
			});
		};
		
		try {	
			getTextNodesIn($(document.body)).each(function() {
				var fontSize = $(this.parentNode).css("font-size");
				var rgbString = $(this.parentNode).css("color");
				
				var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
				// parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
				
				delete (parts[0]);
				for (var i = 1; i <= 3; ++i) {
					parts[i] = parseInt(parts[i]).toString(16);
					if (parts[i].length == 1) parts[i] = '0' + parts[i];
				} 
				var color = parts.join('').toUpperCase(); // "#0070FF"
				
				$(this).replaceWith(this.nodeValue.replace(/([a-z0-9]+)/gi, '<img src="http://0.0.0.0:5100/generate/$1/' + fontSize + '/' + color + '" />'));
			});
		}
		catch(e) {
			//handle exception
		}
	};
	
	var check = window.setInterval(function() {
		console.log('inside "check"');
		if (typeof(window.jQuery) == 'function') {
			window.clearInterval(check);
			doIt();
		}
	}, 250);
	
})();