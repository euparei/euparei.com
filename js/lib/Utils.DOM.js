"use strict";

if (!Utils) { var Utils = {}; }

(function() {
	
	if (!Utils.DOM) { Utils.DOM = {}; }

	Utils.DOM.invisible = function(element) { Utils.$(element).style.visibility = 'hidden'; }
	Utils.DOM.visible = function(element) { Utils.$(element).style.visibility = 'initial'; }

	Utils.DOM.unhide = function(element) { Utils.$(element).style.display = 'initial'; }
	Utils.DOM.hide = function(element) { Utils.$(element).style.display = 'none'; }

})();