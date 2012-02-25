//TODO: inject canvas element and create image data urls rather than bogging down server

var getTextNodesIn = function(el) {
	var whitespace = /^\s*$/;
    return $(el).find("*").andSelf().contents().filter(function() {
        return (this.nodeType == 3) && !whitespace.test(this.nodeValue);
    });
};


getTextNodesIn($("#wrapper")).each(function() {
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


/*

var getTextNodesIn = function(node, includeWhitespaceNodes) {
    var textNodes = [], whitespace = /^\s*$/;

    function getTextNodes(node) {
    	if (!node) return;
        if (node.nodeType == 3) {
            if (includeWhitespaceNodes || !whitespace.test(node.nodeValue)) {
                textNodes.push(node);
            }
        } else {
        	try {
				for (var i = 0, len = node.childNodes.length; i < len; ++i) {
					getTextNodes(node.childNodes[i]);
				}
			} catch(e) {}
        }
    }

    getTextNodes(node);
    return textNodes;
}

getTextNodesIn(document.getElementById("wrapper"));

*/