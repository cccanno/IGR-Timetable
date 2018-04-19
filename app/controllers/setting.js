// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.gps.setValue(Ti.App.Properties.getBool("gpsSwitch"));
$.slide.setValue(Ti.App.Properties.getBool("slideSwitch"));

/* 現在地情報 */
function setGps(e) {
	Ti.App.Properties.setBool("gpsSwitch", e.value);

	if (e.value) {
		Alloy.Globals.getCurrentPosition();
	}
}

/* 発車時刻自動スライド */
function setAutoSlide(e) {
	Ti.App.Properties.setBool("slideSwitch", e.value);
}

/* 運行情報 */
function showTravelInformation() {
	if(Alloy.Globals.safariView.isSupported()){
		Alloy.Globals.safariView.open({
			url: 'http://www.igr.jp/wp/operatinginfo',
			entersReaderIfAvailable: false,
			title: 'IGR'
		});
	}
}
