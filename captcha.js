if (phantom.args.length != 3) {
    console.log('script requires three arguments: word fontsize fileoutput');
    phantom.exit();
}

var text = phantom.args[0];
var fontSize = 64;
try {
	fontSize = parseInt(phantom.args[1]);
} catch(e) {}
var outFile = phantom.args[2];


var page = require('webpage').create();
page.onConsoleMessage = function(msg, line, source) {
    console.log('page logs ' + source + ':' + line + ' - ' + msg);
}
page.viewportSize = { width: 400, height : 400 };
//page.content = '<html><head><body><canvas id="surface"></canvas><script src="' + phantom.libraryPath + '/onload.js" type="text/javascript"></script></body></html>';
page.content = '<html><head><body><canvas id="surface"></canvas></body></html>';
page.injectJs('onload.js');

var dims = page.evaluate('function(){return dimensions("' + text.replace("\"", "\\\"") + '", '+fontSize+');}');

console.log(JSON.stringify(dims));
page.viewportSize = { width: dims.width, height : dims.height };

page.evaluate('function() {writeCaptcha("' + text.replace("\"", "\\\"") + '", '+fontSize+');}');


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
		page.render(outFile);
		phantom.exit();
	}, 5000
);        
