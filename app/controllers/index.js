function openUpTimeTable() {
  var upWin = Alloy.createController("up").getView();
  upWin.open();
}

function openDownTimeTable() {
  var downWin = Alloy.createController("down").getView();
  downWin.open();
}

function openServicePage() {
  Ti.Platform.openURL("http://www.igr.jp/wp/operatinginfo");
}

$.indexWin.open();
