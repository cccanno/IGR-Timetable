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
Alloy.Globals.halfDisplayWidth = Ti.Platform.displayCaps.platformWidth * 0.5;

/* GPS ＆ スライド 機能 初期状態は OFF */
if (Ti.App.Properties.getBool("gpsSwitch") == null) {
  Ti.App.Properties.setBool("gpsSwitch", false);
}
if (Ti.App.Properties.getBool("slideSwitch") == null) {
  Ti.App.Properties.setBool("slideSwitch", false);
}

/* 現在地取得 */
Alloy.Globals.getCurrentPosition = function() {
  if (!Ti.App.Properties.getBool("gpsSwitch")) {
    return;
  }
  if (!Ti.Network.online) {
    Ti.API.debug("オフライン");
    return;
  }
  Ti.Geolocation.getCurrentPosition(function(e) {
    if (!e.success || e.error) {
      // Ti.UI.createAlertDialog({title: "エラー", message: "位置情報の取得に失敗しました"}).show();
      Ti.API.debug("現在地取得失敗");
      return;
    }
    Alloy.Globals.latitude = e.coords.latitude;
    Alloy.Globals.longitude = e.coords.longitude;
  });
};

/* 現在地からそれぞれの駅の距離を求める */
Alloy.Globals.getDistance = function(lat, lng) {
  function radians(deg) {
    return deg * Math.PI / 180;
  }
  var distance =  6378.14 * Math.acos(Math.cos(radians(Alloy.Globals.latitude))*
                                      Math.cos(radians(lat))*
                                      Math.cos(radians(lng)-radians(Alloy.Globals.longitude))+
                                      Math.sin(radians(Alloy.Globals.latitude))*
                                      Math.sin(radians(lat)));
  return distance;
};

Alloy.Globals.getCurrentPosition();
