websharper = function() {};
websharper.internal = function() {};

websharper.internal.callback = function(data) {};

websharper.location =
	function () {
		eval("var r = " + window.websharperBridge.location() + ";");
		return r;
	};
	
websharper.alert =
	function (text) {
		window.websharperBridge.alert(text);
	};