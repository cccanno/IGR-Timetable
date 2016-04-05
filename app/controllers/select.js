// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.lineName.setText(args.lineName);

var listItems = [];
for (var i = 0; i < args.stations.length; i++) {
	var listItem = {
		template: "selectTemplate",
		name: {
			text: args.stations[i]
		}
	};
	listItems.push(listItem);
}
$.listSection.setItems(listItems);

function focusStationList(e) {
	Alloy.Globals.currentPage = e.itemIndex;
	$.selectWin.close();
}

function openMap() {
	var mapWin = Alloy.createController("map").getView();
	mapWin.open();
}

function closeWin() {
	$.selectWin.close();
}
