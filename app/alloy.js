Alloy.Globals.currentPage = 0;
// Alloy.Globals.Map = require('ti.map');
Alloy.Globals.latitude = 39.702053;
Alloy.Globals.longitude = 141.154484;
Alloy.Globals.halfDisplayWidth = Ti.Platform.displayCaps.platformWidth * 0.5;

if (OS_ANDROID) {
  if (Ti.Platform.displayCaps.dpi > 160) {
    Alloy.Globals.androidDpiWidthUnits = Ti.Platform.displayCaps.dpi / 160;
    Alloy.Globals.halfDisplayWidth = Ti.Platform.displayCaps.platformWidth / Alloy.Globals.androidDpiWidthUnits * 0.5;
  } else {
    Alloy.Globals.androidDpiWidthUnits = 1;
  }
}

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
