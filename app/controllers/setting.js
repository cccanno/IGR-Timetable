// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

if (Ti.App.Properties.getBool("gpsSwitch")) {
	$.gps.setBackgroundImage("/icons/checkOn.png");
} else {
	$.gps.setBackgroundImage("/icons/checkOff.png");
}

if (Ti.App.Properties.getBool("slideSwitch")) {
	$.slide.setBackgroundImage("/icons/checkOn.png");
} else {
	$.slide.setBackgroundImage("/icons/checkOff.png");
}


/* 現在地情報 */
function doGps() {
	if (Ti.App.Properties.getBool("gpsSwitch")) {
		$.gps.setBackgroundImage("/icons/checkOff.png");
		Ti.App.Properties.setBool("gpsSwitch", false);
	} else {
		$.gps.setBackgroundImage("/icons/checkOn.png");
		Ti.App.Properties.setBool("gpsSwitch", true);
		Alloy.Globals.getCurrentPosition();
	}
}

/* 発車時刻自動スライド */
function doSlide() {
	if (Ti.App.Properties.getBool("slideSwitch")) {
		$.slide.setBackgroundImage("/icons/checkOff.png");
		Ti.App.Properties.setBool("slideSwitch", false);
	} else {
		$.slide.setBackgroundImage("/icons/checkOn.png");
		Ti.App.Properties.setBool("slideSwitch", true);
	}
}

/* 運行情報 */
function showTravelInformation() {
	Ti.Platform.openURL("http://www.igr.jp/wp/operatinginfo");
}
