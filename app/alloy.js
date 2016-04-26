// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.currentPage = 0;
Alloy.Globals.Map = require('ti.map');
Alloy.Globals.latitude = 39.702053;
Alloy.Globals.longitude = 141.154484;

if (Ti.App.Properties.getBool("switch") == null) {
	Ti.App.Properties.setBool("switch", true);
}
