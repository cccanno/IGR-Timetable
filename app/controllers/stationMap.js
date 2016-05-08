// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function moveCurrentPosition() {
	$.mapView.region = {
		latitude: Alloy.Globals.latitude,
		longitude: Alloy.Globals.longitude
	}
}

var morioka = Alloy.Globals.Map.createAnnotation({
	latitude: 39.701317,
	longitude: 141.136021,
	title: "盛岡駅",
	subtitle: "もりおかえき",
	pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid:1
});

var aoyama = Alloy.Globals.Map.createAnnotation({
  latitude: 39.724675,
  longitude: 141.118271,
  title: "青山駅",
  subtitle: "あおやまえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 2
});

var kuriyagawa = Alloy.Globals.Map.createAnnotation({
  latitude: 39.744673,
  longitude: 141.12913,
  title: "厨川駅",
  subtitle: "くりやがわえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 3
});

var sugo = Alloy.Globals.Map.createAnnotation({
  latitude: 39.783724,
  longitude: 141.148987,
  title: "巣子駅",
  subtitle: "すごえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 4
});

var takizawa = Alloy.Globals.Map.createAnnotation({
  latitude: 39.798806,
  longitude: 141.149737,
  title: "滝沢駅",
  subtitle: "たきざわえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 5
});

var sibutami = Alloy.Globals.Map.createAnnotation({
  latitude: 39.834552,
  longitude: 141.154068,
  title: "渋民駅",
  subtitle: "しぶたみえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 6
});

var kouma = Alloy.Globals.Map.createAnnotation({
  latitude: 39.874214,
  longitude: 141.173647,
  title: "好摩駅",
  subtitle: "こうまえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 7
});

var kawaguti = Alloy.Globals.Map.createAnnotation({
  latitude: 39.918877,
  longitude: 141.199309,
  title: "岩手川口駅",
  subtitle: "いわてかわぐちえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 8
});

var numakunai = Alloy.Globals.Map.createAnnotation({
  latitude: 39.960345,
  longitude: 141.217333,
  title: "いわて沼宮内駅",
  subtitle: "いわてぬまくないえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 9
});

var midou = Alloy.Globals.Map.createAnnotation({
  latitude: 40.00434,
  longitude: 141.23694,
  title: "御堂駅",
  subtitle: "みどうえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 10
});

var okunakayama = Alloy.Globals.Map.createAnnotation({
  latitude: 40.066332,
  longitude: 141.22841,
  title: "奥中山高原駅",
  subtitle: "おくなかやまこうげんえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 11
});

var kotunagi = Alloy.Globals.Map.createAnnotation({
  latitude: 40.122771,
  longitude: 141.260182,
  title: "小繋駅",
  subtitle: "こつなぎえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 12
});

var kozuya = Alloy.Globals.Map.createAnnotation({
  latitude: 40.171211,
  longitude: 141.308009,
  title: "小鳥谷駅",
  subtitle: "こづやえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 13
});

var itinohe = Alloy.Globals.Map.createAnnotation({
  latitude: 40.210012,
  longitude: 141.297286,
  title: "一戸駅",
  subtitle: "いちのへえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 14
});

var ninohe = Alloy.Globals.Map.createAnnotation({
  latitude: 40.259728,
  longitude: 141.286034,
  title: "二戸駅",
  subtitle: "にのへえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 15
});

var tomai = Alloy.Globals.Map.createAnnotation({
  latitude: 40.285586,
  longitude: 141.290782,
  title: "斗米駅",
  subtitle: "とまいえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 16
});

var kintaiti = Alloy.Globals.Map.createAnnotation({
  latitude: 40.323138,
  longitude: 141.303612,
  title: "金田一温泉駅",
  subtitle: "きんたいちおんせんえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 17
});

var metoki = Alloy.Globals.Map.createAnnotation({
  latitude: 40.351967,
  longitude: 141.289556,
  title: "目時駅",
  subtitle: "めときえき",
  pincolor: Alloy.Globals.Map.ANNOTATION_RED,
	myid: 18
});

$.mapView.annotations = [
	morioka,
	aoyama,
	kuriyagawa,
	sugo,
	takizawa,
	sibutami,
	kouma,
	kawaguti,
	numakunai,
	midou,
	okunakayama,
	kotunagi,
	kozuya,
	itinohe,
	ninohe,
	tomai,
	kintaiti,
	metoki
];
