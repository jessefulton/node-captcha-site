
var page = new WebPage;
page.viewportSize = { width: 400, height : 400 };
//page.content = '<html><head><body><canvas id="surface"></canvas><script src="' + phantom.libraryPath + '/onload.js" type="text/javascript"></script></body></html>';
page.content = '<html><head><body><canvas id="surface"></canvas></body></html>';
page.injectJs('onload.js');


/*
page.evaluate(function() {
    var el = document.getElementById('surface'),
        context = el.getContext('2d'),
        width = window.innerWidth,
        height = window.innerHeight,
        cx = width / 2,
        cy = height / 2,
        radius = width  / 2.3,
        imageData,
        pixels,
        hue, sat, value,
        i = 0, x, y, rx, ry, d,
        f, g, p, u, v, w, rgb;

    el.width = width;
    el.height = height;
    imageData = context.createImageData(width, height);
    pixels = imageData.data;

    for (y = 0; y < height; y = y + 1) {
        for (x = 0; x < width; x = x + 1, i = i + 4) {
            rx = x - cx;
            ry = y - cy;
            d = rx * rx + ry * ry;
            if (d < radius * radius) {
                hue = 6 * (Math.atan2(ry, rx) + Math.PI) / (2 * Math.PI);
                sat = Math.sqrt(d) / radius;
                g = Math.floor(hue);
                f = hue - g;
                u = 255 * (1 - sat);
                v = 255 * (1 - sat * f);
                w = 255 * (1 - sat * (1 - f));
                pixels[i] = [255, v, u, u, w, 255, 255][g];
                pixels[i + 1] = [w, 255, 255, v, u, u, w][g];
                pixels[i + 2] = [u, u, w, 255, 255, v, u][g];
                pixels[i + 3] = 255;
            }
        }
    }

    context.putImageData(imageData, 0, 0);
    document.body.style.backgroundColor = 'white';
    document.body.style.margin = '0px';
});
*/





/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};


waitFor(function() {
		console.log("checking...");
		// Check in the page if a specific element is now visible
		var cn = page.evaluate(function() {
			return document.body.className;
		});
		var mgn = page.evaluate(function() { return document.body.innerHTML; });
		console.log(mgn);
		console.log(cn);
		return cn == "done";
	}, function() {
		console.log("rendered.");
		page.render('captcha.png');
		phantom.exit();
	}, 5000
);        



/*
page.onLoadFinished = function (status) {
	page.render('captcha.png');
	phantom.exit();
};
*/