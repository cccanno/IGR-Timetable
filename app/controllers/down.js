// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var currentTime;
var hour, minutes;
var scrollItemIndex;
var onSetValue = false;

var date = new Date();
hour = String(date.getHours());
minutes = String(date.getMinutes());
currentTime = Number(hour + minutes);
Ti.API.debug("現在時刻レート：" + currentTime);

var stations = [
	"盛岡駅",
	"青山駅",
	"厨川駅",
	"巣子駅",
	"滝沢駅",
	"渋民駅",
	"好摩駅",
	"岩手川口駅",
	"いわて沼宮内駅",
	"御堂駅",
	"奥中山高原駅",
	"小繋駅",
	"小鳥谷駅",
	"一戸駅",
	"二戸駅",
	"斗米駅",
	"金田一温泉駅",
	"目時駅"
];

var moriokaData = [
	{template: "moriokaTemplate", time: {text: "5:07"}, lastStation: {text: "[花]大館"}, rate: 507},
	{template: "moriokaTemplate", time: {text: "5:47"}, lastStation: {text: "いわて沼宮内"}, rate: 547},
	{template: "moriokaTemplate", time: {text: "6:10"}, lastStation: {text: "いわて沼宮内"}, rate: 610},
	{template: "moriokaTemplate", time: {text: "6:44"}, lastStation: {text: "八戸"}, rate: 644},
	{template: "moriokaTemplate", time: {text: "6:55"}, lastStation: {text: "[花]大館"}, rate: 655},
	{template: "moriokaTemplate", time: {text: "7:25"}, lastStation: {text: "滝沢"}, rate: 725},
	{template: "moriokaTemplate", time: {text: "7:32"}, lastStation: {text: "二戸"}, rate: 732},
	{template: "moriokaTemplate", time: {text: "7:53"}, lastStation: {text: "いわて沼宮内"}, rate: 753},
	{template: "moriokaTemplate", time: {text: "8:13"}, lastStation: {text: "滝沢"}, rate: 813},
	{template: "moriokaTemplate", time: {text: "8:40"}, lastStation: {text: "いわて沼宮内"}, rate: 840},
	{template: "moriokaTemplate", time: {text: "9:10"}, lastStation: {text: "八戸"}, rate: 910},
	{template: "moriokaTemplate", time: {text: "9:35"}, lastStation: {text: "[花]大館"}, rate: 935},
	{template: "moriokaTemplate", time: {text: "10:20"}, lastStation: {text: "八戸"}, rate: 1020},
	{template: "moriokaTemplate", time: {text: "10:35"}, lastStation: {text: "滝沢"}, rate: 1035},
	{template: "moriokaTemplate", time: {text: "11:05"}, lastStation: {text: "いわて沼宮内"}, rate: 1105},
	{template: "moriokaTemplate", time: {text: "11:19"}, lastStation: {text: "滝沢"}, rate: 1119},
	{template: "moriokaTemplate", time: {text: "11:57"}, lastStation: {text: "八戸"}, rate: 1157},
	{template: "moriokaTemplate", time: {text: "12:40"}, lastStation: {text: "好摩"}, rate: 1240},
	{template: "moriokaTemplate", time: {text: "13:12"}, lastStation: {text: "八戸"}, rate: 1312},
	{template: "moriokaTemplate", time: {text: "13:30"}, lastStation: {text: "いわて沼宮内"}, rate: 1330},
	{template: "moriokaTemplate", time: {text: "13:48"}, lastStation: {text: "[花]大館"}, rate: 1348},
	{template: "moriokaTemplate", time: {text: "14:06"}, lastStation: {text: "八戸"}, rate: 1406},
	{template: "moriokaTemplate", time: {text: "14:42"}, lastStation: {text: "滝沢"}, rate: 1442},
	{template: "moriokaTemplate", time: {text: "15:22"}, lastStation: {text: "八戸"}, rate: 1522},
	{template: "moriokaTemplate", time: {text: "15:49"}, lastStation: {text: "いわて沼宮内"}, rate: 1549},
	{template: "moriokaTemplate", time: {text: "16:06"}, lastStation: {text: "[花]大館"}, rate: 1606},
	{template: "moriokaTemplate", time: {text: "16:22"}, lastStation: {text: "金田一温泉"}, rate: 1622},
	{template: "moriokaTemplate", time: {text: "17:04"}, lastStation: {text: "八戸"}, rate: 1704},
	{template: "moriokaTemplate", time: {text: "17:28"}, lastStation: {text: "いわて沼宮内"}, rate: 1728},
	{template: "moriokaTemplate", time: {text: "17:51"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1751},
	{template: "moriokaTemplate", time: {text: "18:03"}, lastStation: {text: "[花]大館"}, rate: 1803},
	{template: "moriokaTemplate", time: {text: "18:15"}, lastStation: {text: "八戸"}, rate: 1815},
	{template: "moriokaTemplate", time: {text: "18:56"}, lastStation: {text: "いわて沼宮内"}, rate: 1856},
	{template: "moriokaTemplate", time: {text: "19:09"}, lastStation: {text: "八戸"}, rate: 1909},
	{template: "moriokaTemplate", time: {text: "19:20"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1920},
	{template: "moriokaTemplate", time: {text: "19:40"}, lastStation: {text: "いわて沼宮内"}, rate: 1940},
	{template: "moriokaTemplate", time: {text: "20:00"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2000},
	{template: "moriokaTemplate", time: {text: "20:18"}, lastStation: {text: "八戸"}, rate: 2018},
	{template: "moriokaTemplate", time: {text: "20:40"}, lastStation: {text: "[花]荒屋新町"}, rate: 2040},
	{template: "moriokaTemplate", time: {text: "21:10"}, lastStation: {text: "いわて沼宮内"}, rate: 2110},
	{template: "moriokaTemplate", time: {text: "21:44"}, lastStation: {text: "八戸"}, rate: 2144},
	{template: "moriokaTemplate", time: {text: "22:35"}, lastStation: {text: "滝沢"}, rate: 2235},
	{template: "moriokaTemplate", time: {text: "22:57"}, lastStation: {text: "いわて沼宮内"}, rate: 2257},
	{template: "moriokaTemplate", time: {text: "23:20"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2320}
];
$.moriokaListSection.setItems(moriokaData);

var aoyamaData = [
	{template: "aoyamaTemplate", time: {text: "5:11"}, lastStation: {text: "[花]大館"}, rate: 511},
	{template: "aoyamaTemplate", time: {text: "5:51"}, lastStation: {text: "いわて沼宮内"}, rate: 551},
	{template: "aoyamaTemplate", time: {text: "6:14"}, lastStation: {text: "いわて沼宮内"}, rate: 614},
	{template: "aoyamaTemplate", time: {text: "6:48"}, lastStation: {text: "八戸"}, rate: 648},
	{template: "aoyamaTemplate", time: {text: "6:59"}, lastStation: {text: "[花]大館"}, rate: 659},
	{template: "aoyamaTemplate", time: {text: "7:29"}, lastStation: {text: "滝沢"}, rate: 729},
	{template: "aoyamaTemplate", time: {text: "7:36"}, lastStation: {text: "二戸"}, rate: 736},
	{template: "aoyamaTemplate", time: {text: "7:57"}, lastStation: {text: "いわて沼宮内"}, rate: 757},
	{template: "aoyamaTemplate", time: {text: "8:17"}, lastStation: {text: "滝沢"}, rate: 817},
	{template: "aoyamaTemplate", time: {text: "8:44"}, lastStation: {text: "いわて沼宮内"}, rate: 844},
	{template: "aoyamaTemplate", time: {text: "9:14"}, lastStation: {text: "八戸"}, rate: 914},
	{template: "aoyamaTemplate", time: {text: "9:39"}, lastStation: {text: "[花]大館"}, rate: 939},
	{template: "aoyamaTemplate", time: {text: "10:24"}, lastStation: {text: "八戸"}, rate: 1024},
	{template: "aoyamaTemplate", time: {text: "10:39"}, lastStation: {text: "滝沢"}, rate: 1039},
	{template: "aoyamaTemplate", time: {text: "11:09"}, lastStation: {text: "いわて沼宮内"}, rate: 1109},
	{template: "aoyamaTemplate", time: {text: "11:23"}, lastStation: {text: "滝沢"}, rate: 1123},
	{template: "aoyamaTemplate", time: {text: "12:01"}, lastStation: {text: "八戸"}, rate: 1201},
	{template: "aoyamaTemplate", time: {text: "12:44"}, lastStation: {text: "好摩"}, rate: 1244},
	{template: "aoyamaTemplate", time: {text: "13:16"}, lastStation: {text: "八戸"}, rate: 1316},
	{template: "aoyamaTemplate", time: {text: "13:34"}, lastStation: {text: "いわて沼宮内"}, rate: 1334},
	{template: "aoyamaTemplate", time: {text: "13:52"}, lastStation: {text: "[花]大館"}, rate: 1352},
	{template: "aoyamaTemplate", time: {text: "14:10"}, lastStation: {text: "八戸"}, rate: 1410},
	{template: "aoyamaTemplate", time: {text: "14:46"}, lastStation: {text: "滝沢"}, rate: 1446},
	{template: "aoyamaTemplate", time: {text: "15:26"}, lastStation: {text: "八戸"}, rate: 1526},
	{template: "aoyamaTemplate", time: {text: "15:53"}, lastStation: {text: "いわて沼宮内"}, rate: 1553},
	{template: "aoyamaTemplate", time: {text: "16:10"}, lastStation: {text: "[花]大館"}, rate: 1610},
	{template: "aoyamaTemplate", time: {text: "16:26"}, lastStation: {text: "金田一温泉"}, rate: 1626},
	{template: "aoyamaTemplate", time: {text: "17:08"}, lastStation: {text: "八戸"}, rate: 1708},
	{template: "aoyamaTemplate", time: {text: "17:32"}, lastStation: {text: "いわて沼宮内"}, rate: 1732},
	{template: "aoyamaTemplate", time: {text: "17:55"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1755},
	{template: "aoyamaTemplate", time: {text: "18:07"}, lastStation: {text: "[花]大館"}, rate: 1807},
	{template: "aoyamaTemplate", time: {text: "18:19"}, lastStation: {text: "八戸"}, rate: 1819},
	{template: "aoyamaTemplate", time: {text: "19:00"}, lastStation: {text: "いわて沼宮内"}, rate: 1900},
	{template: "aoyamaTemplate", time: {text: "19:13"}, lastStation: {text: "八戸"}, rate: 1913},
	{template: "aoyamaTemplate", time: {text: "19:24"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1924},
	{template: "aoyamaTemplate", time: {text: "19:44"}, lastStation: {text: "いわて沼宮内"}, rate: 1944},
	{template: "aoyamaTemplate", time: {text: "20:04"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2004},
	{template: "aoyamaTemplate", time: {text: "20:22"}, lastStation: {text: "八戸"}, rate: 2022},
	{template: "aoyamaTemplate", time: {text: "20:44"}, lastStation: {text: "[花]荒屋新町"}, rate: 2044},
	{template: "aoyamaTemplate", time: {text: "21:14"}, lastStation: {text: "いわて沼宮内"}, rate: 2114},
	{template: "aoyamaTemplate", time: {text: "21:49"}, lastStation: {text: "八戸"}, rate: 2149},
	{template: "aoyamaTemplate", time: {text: "22:39"}, lastStation: {text: "滝沢"}, rate: 2239},
	{template: "aoyamaTemplate", time: {text: "23:01"}, lastStation: {text: "いわて沼宮内"}, rate: 2301},
	{template: "aoyamaTemplate", time: {text: "23:24"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2324}
];
$.aoyamaListSection.setItems(aoyamaData);

var kuriyagawaData = [
	{template: "kuriyagawaTemplate", time: {text: "5:14"}, lastStation: {text: "[花]大館"}, rate: 514},
	{template: "kuriyagawaTemplate", time: {text: "5:54"}, lastStation: {text: "いわて沼宮内"}, rate: 554},
	{template: "kuriyagawaTemplate", time: {text: "6:18"}, lastStation: {text: "いわて沼宮内"}, rate: 618},
	{template: "kuriyagawaTemplate", time: {text: "6:52"}, lastStation: {text: "八戸"}, rate: 652},
	{template: "kuriyagawaTemplate", time: {text: "7:03"}, lastStation: {text: "[花]大館"}, rate: 703},
	{template: "kuriyagawaTemplate", time: {text: "7:32"}, lastStation: {text: "滝沢"}, rate: 732},
	{template: "kuriyagawaTemplate", time: {text: "7:39"}, lastStation: {text: "二戸"}, rate: 739},
	{template: "kuriyagawaTemplate", time: {text: "8:00"}, lastStation: {text: "いわて沼宮内"}, rate: 800},
	{template: "kuriyagawaTemplate", time: {text: "8:20"}, lastStation: {text: "滝沢"}, rate: 820},
	{template: "kuriyagawaTemplate", time: {text: "8:47"}, lastStation: {text: "いわて沼宮内"}, rate: 847},
	{template: "kuriyagawaTemplate", time: {text: "9:17"}, lastStation: {text: "八戸"}, rate: 917},
	{template: "kuriyagawaTemplate", time: {text: "9:42"}, lastStation: {text: "[花]大館"}, rate: 942},
	{template: "kuriyagawaTemplate", time: {text: "10:27"}, lastStation: {text: "八戸"}, rate: 1027},
	{template: "kuriyagawaTemplate", time: {text: "10:42"}, lastStation: {text: "滝沢"}, rate: 1042},
	{template: "kuriyagawaTemplate", time: {text: "11:12"}, lastStation: {text: "いわて沼宮内"}, rate: 1112},
	{template: "kuriyagawaTemplate", time: {text: "11:26"}, lastStation: {text: "滝沢"}, rate: 1126},
	{template: "kuriyagawaTemplate", time: {text: "12:04"}, lastStation: {text: "八戸"}, rate: 1204},
	{template: "kuriyagawaTemplate", time: {text: "12:47"}, lastStation: {text: "好摩"}, rate: 1247},
	{template: "kuriyagawaTemplate", time: {text: "13:19"}, lastStation: {text: "八戸"}, rate: 1319},
	{template: "kuriyagawaTemplate", time: {text: "13:37"}, lastStation: {text: "いわて沼宮内"}, rate: 1337},
	{template: "kuriyagawaTemplate", time: {text: "13:55"}, lastStation: {text: "[花]大館"}, rate: 1355},
	{template: "kuriyagawaTemplate", time: {text: "14:13"}, lastStation: {text: "八戸"}, rate: 1413},
	{template: "kuriyagawaTemplate", time: {text: "14:49"}, lastStation: {text: "滝沢"}, rate: 1449},
	{template: "kuriyagawaTemplate", time: {text: "15:29"}, lastStation: {text: "八戸"}, rate: 1529},
	{template: "kuriyagawaTemplate", time: {text: "15:56"}, lastStation: {text: "いわて沼宮内"}, rate: 1556},
	{template: "kuriyagawaTemplate", time: {text: "16:13"}, lastStation: {text: "[花]大館"}, rate: 1613},
	{template: "kuriyagawaTemplate", time: {text: "16:29"}, lastStation: {text: "金田一温泉"}, rate: 1629},
	{template: "kuriyagawaTemplate", time: {text: "17:11"}, lastStation: {text: "八戸"}, rate: 1711},
	{template: "kuriyagawaTemplate", time: {text: "17:35"}, lastStation: {text: "いわて沼宮内"}, rate: 1735},
	{template: "kuriyagawaTemplate", time: {text: "17:58"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1758},
	{template: "kuriyagawaTemplate", time: {text: "18:11"}, lastStation: {text: "[花]大館"}, rate: 1811},
	{template: "kuriyagawaTemplate", time: {text: "18:22"}, lastStation: {text: "八戸"}, rate: 1822},
	{template: "kuriyagawaTemplate", time: {text: "19:04"}, lastStation: {text: "いわて沼宮内"}, rate: 1904},
	{template: "kuriyagawaTemplate", time: {text: "19:16"}, lastStation: {text: "八戸"}, rate: 1916},
	{template: "kuriyagawaTemplate", time: {text: "19:28"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1928},
	{template: "kuriyagawaTemplate", time: {text: "19:47"}, lastStation: {text: "いわて沼宮内"}, rate: 1947},
	{template: "kuriyagawaTemplate", time: {text: "20:08"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2008},
	{template: "kuriyagawaTemplate", time: {text: "20:26"}, lastStation: {text: "八戸"}, rate: 2026},
	{template: "kuriyagawaTemplate", time: {text: "20:48"}, lastStation: {text: "[花]荒屋新町"}, rate: 2048},
	{template: "kuriyagawaTemplate", time: {text: "21:17"}, lastStation: {text: "いわて沼宮内"}, rate: 2117},
	{template: "kuriyagawaTemplate", time: {text: "21:53"}, lastStation: {text: "八戸"}, rate: 2153},
	{template: "kuriyagawaTemplate", time: {text: "22:42"}, lastStation: {text: "滝沢"}, rate: 2242},
	{template: "kuriyagawaTemplate", time: {text: "23:04"}, lastStation: {text: "いわて沼宮内"}, rate: 2304},
	{template: "kuriyagawaTemplate", time: {text: "23:27"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2327}
];
$.kuriyagawaListSection.setItems(kuriyagawaData);

var sugoData = [
	{template: "sugoTemplate", time: {text: "5:19"}, lastStation: {text: "[花]大館"}, rate: 519},
	{template: "sugoTemplate", time: {text: "5:59"}, lastStation: {text: "いわて沼宮内"}, rate: 559},
	{template: "sugoTemplate", time: {text: "6:22"}, lastStation: {text: "いわて沼宮内"}, rate: 622},
	{template: "sugoTemplate", time: {text: "6:56"}, lastStation: {text: "八戸"}, rate: 656},
	{template: "sugoTemplate", time: {text: "7:08"}, lastStation: {text: "[花]大館"}, rate: 708},
	{template: "sugoTemplate", time: {text: "7:37"}, lastStation: {text: "滝沢"}, rate: 737},
	{template: "sugoTemplate", time: {text: "7:44"}, lastStation: {text: "二戸"}, rate: 744},
	{template: "sugoTemplate", time: {text: "8:05"}, lastStation: {text: "いわて沼宮内"}, rate: 805},
	{template: "sugoTemplate", time: {text: "8:25"}, lastStation: {text: "滝沢"}, rate: 825},
	{template: "sugoTemplate", time: {text: "8:52"}, lastStation: {text: "いわて沼宮内"}, rate: 852},
	{template: "sugoTemplate", time: {text: "9:22"}, lastStation: {text: "八戸"}, rate: 922},
	{template: "sugoTemplate", time: {text: "9:47"}, lastStation: {text: "[花]大館"}, rate: 947},
	{template: "sugoTemplate", time: {text: "10:32"}, lastStation: {text: "八戸"}, rate: 1032},
	{template: "sugoTemplate", time: {text: "10:47"}, lastStation: {text: "滝沢"}, rate: 1047},
	{template: "sugoTemplate", time: {text: "11:17"}, lastStation: {text: "いわて沼宮内"}, rate: 1117},
	{template: "sugoTemplate", time: {text: "11:31"}, lastStation: {text: "滝沢"}, rate: 1131},
	{template: "sugoTemplate", time: {text: "12:09"}, lastStation: {text: "八戸"}, rate: 1209},
	{template: "sugoTemplate", time: {text: "12:52"}, lastStation: {text: "好摩"}, rate: 1252},
	{template: "sugoTemplate", time: {text: "13:24"}, lastStation: {text: "八戸"}, rate: 1324},
	{template: "sugoTemplate", time: {text: "13:42"}, lastStation: {text: "いわて沼宮内"}, rate: 1342},
	{template: "sugoTemplate", time: {text: "14:00"}, lastStation: {text: "[花]大館"}, rate: 1400},
	{template: "sugoTemplate", time: {text: "14:18"}, lastStation: {text: "八戸"}, rate: 1418},
	{template: "sugoTemplate", time: {text: "14:54"}, lastStation: {text: "滝沢"}, rate: 1454},
	{template: "sugoTemplate", time: {text: "15:34"}, lastStation: {text: "八戸"}, rate: 1534},
	{template: "sugoTemplate", time: {text: "16:01"}, lastStation: {text: "いわて沼宮内"}, rate: 1601},
	{template: "sugoTemplate", time: {text: "16:18"}, lastStation: {text: "[花]大館"}, rate: 1618},
	{template: "sugoTemplate", time: {text: "16:34"}, lastStation: {text: "金田一温泉"}, rate: 1634},
	{template: "sugoTemplate", time: {text: "17:16"}, lastStation: {text: "八戸"}, rate: 1716},
	{template: "sugoTemplate", time: {text: "17:40"}, lastStation: {text: "いわて沼宮内"}, rate: 1740},
	{template: "sugoTemplate", time: {text: "18:03"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1603},
	{template: "sugoTemplate", time: {text: "18:16"}, lastStation: {text: "[花]大館"}, rate: 1816},
	{template: "sugoTemplate", time: {text: "18:27"}, lastStation: {text: "八戸"}, rate: 1827},
	{template: "sugoTemplate", time: {text: "19:08"}, lastStation: {text: "いわて沼宮内"}, rate: 1908},
	{template: "sugoTemplate", time: {text: "19:21"}, lastStation: {text: "八戸"}, rate: 1921},
	{template: "sugoTemplate", time: {text: "19:33"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1933},
	{template: "sugoTemplate", time: {text: "19:52"}, lastStation: {text: "いわて沼宮内"}, rate: 1952},
	{template: "sugoTemplate", time: {text: "20:13"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2013},
	{template: "sugoTemplate", time: {text: "20:30"}, lastStation: {text: "八戸"}, rate: 2030},
	{template: "sugoTemplate", time: {text: "20:53"}, lastStation: {text: "[花]荒屋新町"}, rate: 2053},
	{template: "sugoTemplate", time: {text: "21:22"}, lastStation: {text: "いわて沼宮内"}, rate: 2122},
	{template: "sugoTemplate", time: {text: "21:57"}, lastStation: {text: "八戸"}, rate: 2157},
	{template: "sugoTemplate", time: {text: "22:47"}, lastStation: {text: "滝沢"}, rate: 2247},
	{template: "sugoTemplate", time: {text: "23:09"}, lastStation: {text: "いわて沼宮内"}, rate: 2309},
	{template: "sugoTemplate", time: {text: "23:32"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2332}
];
$.sugoListSection.setItems(sugoData);

var takizawaData = [
	{template: "takizawaTemplate", time: {text: "5:22"}, lastStation: {text: "[花]大館"}, rate: 522},
	{template: "takizawaTemplate", time: {text: "6:02"}, lastStation: {text: "いわて沼宮内"}, rate: 602},
	{template: "takizawaTemplate", time: {text: "6:25"}, lastStation: {text: "いわて沼宮内"}, rate: 625},
	{template: "takizawaTemplate", time: {text: "6:59"}, lastStation: {text: "八戸"}, rate: 659},
	{template: "takizawaTemplate", time: {text: "7:12"}, lastStation: {text: "[花]大館"}, rate: 712},
	{template: "takizawaTemplate", time: {text: "7:47"}, lastStation: {text: "二戸"}, rate: 747},
	{template: "takizawaTemplate", time: {text: "8:08"}, lastStation: {text: "いわて沼宮内"}, rate: 808},
	{template: "takizawaTemplate", time: {text: "8:55"}, lastStation: {text: "いわて沼宮内"}, rate: 855},
	{template: "takizawaTemplate", time: {text: "9:25"}, lastStation: {text: "八戸"}, rate: 925},
	{template: "takizawaTemplate", time: {text: "9:50"}, lastStation: {text: "[花]大館"}, rate: 950},
	{template: "takizawaTemplate", time: {text: "10:35"}, lastStation: {text: "八戸"}, rate: 1035},
	{template: "takizawaTemplate", time: {text: "11:20"}, lastStation: {text: "いわて沼宮内"}, rate: 1120},
	{template: "takizawaTemplate", time: {text: "12:12"}, lastStation: {text: "八戸"}, rate: 1212},
	{template: "takizawaTemplate", time: {text: "12:55"}, lastStation: {text: "好摩"}, rate: 1255},
	{template: "takizawaTemplate", time: {text: "13:27"}, lastStation: {text: "八戸"}, rate: 1327},
	{template: "takizawaTemplate", time: {text: "13:45"}, lastStation: {text: "いわて沼宮内"}, rate: 1345},
	{template: "takizawaTemplate", time: {text: "14:03"}, lastStation: {text: "[花]大館"}, rate: 1403},
	{template: "takizawaTemplate", time: {text: "14:21"}, lastStation: {text: "八戸"}, rate: 1421},
	{template: "takizawaTemplate", time: {text: "15:37"}, lastStation: {text: "八戸"}, rate: 1537},
	{template: "takizawaTemplate", time: {text: "16:04"}, lastStation: {text: "いわて沼宮内"}, rate: 1604},
	{template: "takizawaTemplate", time: {text: "16:21"}, lastStation: {text: "[花]大館"}, rate: 1621},
	{template: "takizawaTemplate", time: {text: "16:37"}, lastStation: {text: "金田一温泉"}, rate: 1637},
	{template: "takizawaTemplate", time: {text: "17:19"}, lastStation: {text: "八戸"}, rate: 1719},
	{template: "takizawaTemplate", time: {text: "17:43"}, lastStation: {text: "いわて沼宮内"}, rate: 1743},
	{template: "takizawaTemplate", time: {text: "18:07"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1807},
	{template: "takizawaTemplate", time: {text: "18:19"}, lastStation: {text: "[花]大館"}, rate: 1819},
	{template: "takizawaTemplate", time: {text: "18:30"}, lastStation: {text: "八戸"}, rate: 1830},
	{template: "takizawaTemplate", time: {text: "19:11"}, lastStation: {text: "いわて沼宮内"}, rate: 1911},
	{template: "takizawaTemplate", time: {text: "19:24"}, lastStation: {text: "八戸"}, rate: 1924},
	{template: "takizawaTemplate", time: {text: "19:36"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1936},
	{template: "takizawaTemplate", time: {text: "19:55"}, lastStation: {text: "いわて沼宮内"}, rate: 1955},
	{template: "takizawaTemplate", time: {text: "20:34"}, lastStation: {text: "八戸"}, rate: 2034},
	{template: "takizawaTemplate", time: {text: "20:56"}, lastStation: {text: "[花]荒屋新町"}, rate: 2056},
	{template: "takizawaTemplate", time: {text: "21:25"}, lastStation: {text: "いわて沼宮内"}, rate: 2125},
	{template: "takizawaTemplate", time: {text: "22:01"}, lastStation: {text: "八戸"}, rate: 2201},
	{template: "takizawaTemplate", time: {text: "23:12"}, lastStation: {text: "いわて沼宮内"}, rate: 2312}
];
$.takizawaListSection.setItems(takizawaData);

var sibutamiData = [
	{template: "sibutamiTemplate", time: {text: "5:27"}, lastStation: {text: "[花]大館"}, rate: 527},
	{template: "sibutamiTemplate", time: {text: "6:06"}, lastStation: {text: "いわて沼宮内"}, rate: 606},
	{template: "sibutamiTemplate", time: {text: "6:30"}, lastStation: {text: "いわて沼宮内"}, rate: 630},
	{template: "sibutamiTemplate", time: {text: "7:04"}, lastStation: {text: "八戸"}, rate: 704},
	{template: "sibutamiTemplate", time: {text: "7:17"}, lastStation: {text: "[花]大館"}, rate: 717},
	{template: "sibutamiTemplate", time: {text: "7:51"}, lastStation: {text: "二戸"}, rate: 751},
	{template: "sibutamiTemplate", time: {text: "8:12"}, lastStation: {text: "いわて沼宮内"}, rate: 812},
	{template: "sibutamiTemplate", time: {text: "8:59"}, lastStation: {text: "いわて沼宮内"}, rate: 859},
	{template: "sibutamiTemplate", time: {text: "9:29"}, lastStation: {text: "八戸"}, rate: 929},
	{template: "sibutamiTemplate", time: {text: "9:55"}, lastStation: {text: "[花]大館"}, rate: 955},
	{template: "sibutamiTemplate", time: {text: "10:39"}, lastStation: {text: "八戸"}, rate: 1039},
	{template: "sibutamiTemplate", time: {text: "11:24"}, lastStation: {text: "いわて沼宮内"}, rate: 1124},
	{template: "sibutamiTemplate", time: {text: "12:16"}, lastStation: {text: "八戸"}, rate: 1216},
	{template: "sibutamiTemplate", time: {text: "12:59"}, lastStation: {text: "好摩"}, rate: 1259},
	{template: "sibutamiTemplate", time: {text: "13:31"}, lastStation: {text: "八戸"}, rate: 1331},
	{template: "sibutamiTemplate", time: {text: "13:49"}, lastStation: {text: "いわて沼宮内"}, rate: 1349},
	{template: "sibutamiTemplate", time: {text: "14:08"}, lastStation: {text: "[花]大館"}, rate: 1408},
	{template: "sibutamiTemplate", time: {text: "14:25"}, lastStation: {text: "八戸"}, rate: 1425},
	{template: "sibutamiTemplate", time: {text: "15:41"}, lastStation: {text: "八戸"}, rate: 1541},
	{template: "sibutamiTemplate", time: {text: "16:08"}, lastStation: {text: "いわて沼宮内"}, rate: 1608},
	{template: "sibutamiTemplate", time: {text: "16:26"}, lastStation: {text: "[花]大館"}, rate: 1626},
	{template: "sibutamiTemplate", time: {text: "16:41"}, lastStation: {text: "金田一温泉"}, rate: 1641},
	{template: "sibutamiTemplate", time: {text: "17:23"}, lastStation: {text: "八戸"}, rate: 1723},
	{template: "sibutamiTemplate", time: {text: "17:47"}, lastStation: {text: "いわて沼宮内"}, rate: 1747},
	{template: "sibutamiTemplate", time: {text: "18:11"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1811},
	{template: "sibutamiTemplate", time: {text: "18:24"}, lastStation: {text: "[花]大館"}, rate: 1824},
	{template: "sibutamiTemplate", time: {text: "18:35"}, lastStation: {text: "八戸"}, rate: 1835},
	{template: "sibutamiTemplate", time: {text: "19:15"}, lastStation: {text: "いわて沼宮内"}, rate: 1915},
	{template: "sibutamiTemplate", time: {text: "19:28"}, lastStation: {text: "八戸"}, rate: 1928},
	{template: "sibutamiTemplate", time: {text: "19:41"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1941},
	{template: "sibutamiTemplate", time: {text: "19:59"}, lastStation: {text: "いわて沼宮内"}, rate: 1959},
	{template: "sibutamiTemplate", time: {text: "20:38"}, lastStation: {text: "八戸"}, rate: 2038},
	{template: "sibutamiTemplate", time: {text: "21:02"}, lastStation: {text: "[花]荒屋新町"}, rate: 2102},
	{template: "sibutamiTemplate", time: {text: "21:29"}, lastStation: {text: "いわて沼宮内"}, rate: 2129},
	{template: "sibutamiTemplate", time: {text: "22:05"}, lastStation: {text: "八戸"}, rate: 2205},
	{template: "sibutamiTemplate", time: {text: "23:16"}, lastStation: {text: "いわて沼宮内"}, rate: 2316}
];
$.sibutamiListSection.setItems(sibutamiData);

var koumaData = [
	{template: "koumaTemplate", time: {text: "5:32"}, lastStation: {text: "[花]大館"}, rate: 532},
	{template: "koumaTemplate", time: {text: "6:10"}, lastStation: {text: "いわて沼宮内"}, rate: 610},
	{template: "koumaTemplate", time: {text: "6:34"}, lastStation: {text: "いわて沼宮内"}, rate: 634},
	{template: "koumaTemplate", time: {text: "7:08"}, lastStation: {text: "八戸"}, rate: 708},
	{template: "koumaTemplate", time: {text: "7:24"}, lastStation: {text: "[花]大館"}, rate: 724},
	{template: "koumaTemplate", time: {text: "7:55"}, lastStation: {text: "二戸"}, rate: 755},
	{template: "koumaTemplate", time: {text: "8:17"}, lastStation: {text: "いわて沼宮内"}, rate: 817},
	{template: "koumaTemplate", time: {text: "9:03"}, lastStation: {text: "いわて沼宮内"}, rate: 903},
	{template: "koumaTemplate", time: {text: "9:33"}, lastStation: {text: "八戸"}, rate: 933},
	{template: "koumaTemplate", time: {text: "10:00"}, lastStation: {text: "[花]大館"}, rate: 1000},
	{template: "koumaTemplate", time: {text: "10:43"}, lastStation: {text: "八戸"}, rate: 1043},
	{template: "koumaTemplate", time: {text: "11:28"}, lastStation: {text: "いわて沼宮内"}, rate: 1128},
	{template: "koumaTemplate", time: {text: "12:21"}, lastStation: {text: "八戸"}, rate: 1221},
	{template: "koumaTemplate", time: {text: "13:36"}, lastStation: {text: "八戸"}, rate: 1336},
	{template: "koumaTemplate", time: {text: "13:53"}, lastStation: {text: "いわて沼宮内"}, rate: 1353},
	{template: "koumaTemplate", time: {text: "14:14"}, lastStation: {text: "[花]大館"}, rate: 1414},
	{template: "koumaTemplate", time: {text: "14:30"}, lastStation: {text: "八戸"}, rate: 1430},
	{template: "koumaTemplate", time: {text: "15:46"}, lastStation: {text: "八戸"}, rate: 1546},
	{template: "koumaTemplate", time: {text: "16:12"}, lastStation: {text: "いわて沼宮内"}, rate: 1612},
	{template: "koumaTemplate", time: {text: "16:31"}, lastStation: {text: "[花]大館"}, rate: 1631},
	{template: "koumaTemplate", time: {text: "16:45"}, lastStation: {text: "金田一温泉"}, rate: 1645},
	{template: "koumaTemplate", time: {text: "17:27"}, lastStation: {text: "八戸"}, rate: 1727},
	{template: "koumaTemplate", time: {text: "17:51"}, lastStation: {text: "いわて沼宮内"}, rate: 1751},
	{template: "koumaTemplate", time: {text: "18:16"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1816},
	{template: "koumaTemplate", time: {text: "18:30"}, lastStation: {text: "[花]大館"}, rate: 1830},
	{template: "koumaTemplate", time: {text: "18:39"}, lastStation: {text: "八戸"}, rate: 1839},
	{template: "koumaTemplate", time: {text: "19:20"}, lastStation: {text: "いわて沼宮内"}, rate: 1920},
	{template: "koumaTemplate", time: {text: "19:32"}, lastStation: {text: "八戸"}, rate: 1932},
	{template: "koumaTemplate", time: {text: "19:47"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1947},
	{template: "koumaTemplate", time: {text: "20:03"}, lastStation: {text: "いわて沼宮内"}, rate: 2003},
	{template: "koumaTemplate", time: {text: "20:43"}, lastStation: {text: "八戸"}, rate: 2043},
	{template: "koumaTemplate", time: {text: "21:07"}, lastStation: {text: "[花]荒屋新町"}, rate: 2107},
	{template: "koumaTemplate", time: {text: "21:33"}, lastStation: {text: "いわて沼宮内"}, rate: 2133},
	{template: "koumaTemplate", time: {text: "22:10"}, lastStation: {text: "八戸"}, rate: 2210},
	{template: "koumaTemplate", time: {text: "23:21"}, lastStation: {text: "いわて沼宮内"}, rate: 2321}
];
$.koumaListSection.setItems(koumaData);

var kawagutiData = [
	{template: "kawagutiTemplate", time: {text: "6:15"}, lastStation: {text: "いわて沼宮内"}, rate: 615},
	{template: "kawagutiTemplate", time: {text: "6:39"}, lastStation: {text: "いわて沼宮内"}, rate: 639},
	{template: "kawagutiTemplate", time: {text: "7:13"}, lastStation: {text: "八戸"}, rate: 713},
	{template: "kawagutiTemplate", time: {text: "8:00"}, lastStation: {text: "二戸"}, rate: 800},
	{template: "kawagutiTemplate", time: {text: "8:22"}, lastStation: {text: "いわて沼宮内"}, rate: 822},
	{template: "kawagutiTemplate", time: {text: "9:08"}, lastStation: {text: "いわて沼宮内"}, rate: 908},
	{template: "kawagutiTemplate", time: {text: "9:38"}, lastStation: {text: "八戸"}, rate: 938},
	{template: "kawagutiTemplate", time: {text: "10:48"}, lastStation: {text: "八戸"}, rate: 1048},
	{template: "kawagutiTemplate", time: {text: "11:33"}, lastStation: {text: "いわて沼宮内"}, rate: 1133},
	{template: "kawagutiTemplate", time: {text: "12:26"}, lastStation: {text: "八戸"}, rate: 1226},
	{template: "kawagutiTemplate", time: {text: "13:41"}, lastStation: {text: "八戸"}, rate: 1341},
	{template: "kawagutiTemplate", time: {text: "13:58"}, lastStation: {text: "いわて沼宮内"}, rate: 1358},
	{template: "kawagutiTemplate", time: {text: "14:35"}, lastStation: {text: "八戸"}, rate: 1435},
	{template: "kawagutiTemplate", time: {text: "15:51"}, lastStation: {text: "八戸"}, rate: 1551},
	{template: "kawagutiTemplate", time: {text: "16:17"}, lastStation: {text: "いわて沼宮内"}, rate: 1617},
	{template: "kawagutiTemplate", time: {text: "16:50"}, lastStation: {text: "金田一温泉"}, rate: 1650},
	{template: "kawagutiTemplate", time: {text: "17:32"}, lastStation: {text: "八戸"}, rate: 1732},
	{template: "kawagutiTemplate", time: {text: "17:56"}, lastStation: {text: "いわて沼宮内"}, rate: 1756},
	{template: "kawagutiTemplate", time: {text: "18:21"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1821},
	{template: "kawagutiTemplate", time: {text: "18:44"}, lastStation: {text: "八戸"}, rate: 1844},
	{template: "kawagutiTemplate", time: {text: "19:25"}, lastStation: {text: "いわて沼宮内"}, rate: 1925},
	{template: "kawagutiTemplate", time: {text: "19:37"}, lastStation: {text: "八戸"}, rate: 1937},
	{template: "kawagutiTemplate", time: {text: "20:08"}, lastStation: {text: "いわて沼宮内"}, rate: 2008},
	{template: "kawagutiTemplate", time: {text: "20:48"}, lastStation: {text: "八戸"}, rate: 2048},
	{template: "kawagutiTemplate", time: {text: "21:38"}, lastStation: {text: "いわて沼宮内"}, rate: 2138},
	{template: "kawagutiTemplate", time: {text: "22:15"}, lastStation: {text: "八戸"}, rate: 2215},
	{template: "kawagutiTemplate", time: {text: "23:26"}, lastStation: {text: "いわて沼宮内"}, rate: 2326}
];
$.kawagutiListSection.setItems(kawagutiData);

var numakunaiData = [
	{template: "numakunaiTemplate", time: {text: "7:18"}, lastStation: {text: "八戸"}, rate: 718},
	{template: "numakunaiTemplate", time: {text: "8:05"}, lastStation: {text: "二戸"}, rate: 805},
	{template: "numakunaiTemplate", time: {text: "9:43"}, lastStation: {text: "八戸"}, rate: 943},
	{template: "numakunaiTemplate", time: {text: "10:53"}, lastStation: {text: "八戸"}, rate: 1053},
	{template: "numakunaiTemplate", time: {text: "12:30"}, lastStation: {text: "八戸"}, rate: 1230},
	{template: "numakunaiTemplate", time: {text: "13:45"}, lastStation: {text: "八戸"}, rate: 1345},
	{template: "numakunaiTemplate", time: {text: "14:39"}, lastStation: {text: "八戸"}, rate: 1439},
	{template: "numakunaiTemplate", time: {text: "15:55"}, lastStation: {text: "八戸"}, rate: 1555},
	{template: "numakunaiTemplate", time: {text: "16:55"}, lastStation: {text: "金田一温泉"}, rate: 1655},
	{template: "numakunaiTemplate", time: {text: "17:37"}, lastStation: {text: "八戸"}, rate: 1737},
	{template: "numakunaiTemplate", time: {text: "18:49"}, lastStation: {text: "八戸"}, rate: 1849},
	{template: "numakunaiTemplate", time: {text: "19:42"}, lastStation: {text: "八戸"}, rate: 1942},
	{template: "numakunaiTemplate", time: {text: "20:53"}, lastStation: {text: "八戸"}, rate: 2053},
	{template: "numakunaiTemplate", time: {text: "22:20"}, lastStation: {text: "八戸"}, rate: 2220}
];
$.numakunaiListSection.setItems(numakunaiData);

var midouData = [
	{template: "midouTemplate", time: {text: "7:23"}, lastStation: {text: "八戸"}, rate: 723},
	{template: "midouTemplate", time: {text: "8:10"}, lastStation: {text: "二戸"}, rate: 810},
	{template: "midouTemplate", time: {text: "9:48"}, lastStation: {text: "八戸"}, rate: 948},
	{template: "midouTemplate", time: {text: "10:58"}, lastStation: {text: "八戸"}, rate: 1058},
	{template: "midouTemplate", time: {text: "12:35"}, lastStation: {text: "八戸"}, rate: 1235},
	{template: "midouTemplate", time: {text: "13:50"}, lastStation: {text: "八戸"}, rate: 1350},
	{template: "midouTemplate", time: {text: "14:44"}, lastStation: {text: "八戸"}, rate: 1444},
	{template: "midouTemplate", time: {text: "16:00"}, lastStation: {text: "八戸"}, rate: 1600},
	{template: "midouTemplate", time: {text: "17:00"}, lastStation: {text: "金田一温泉"}, rate: 1700},
	{template: "midouTemplate", time: {text: "17:42"}, lastStation: {text: "八戸"}, rate: 1742},
	{template: "midouTemplate", time: {text: "18:54"}, lastStation: {text: "八戸"}, rate: 1854},
	{template: "midouTemplate", time: {text: "19:47"}, lastStation: {text: "八戸"}, rate: 1947},
	{template: "midouTemplate", time: {text: "20:57"}, lastStation: {text: "八戸"}, rate: 2057},
	{template: "midouTemplate", time: {text: "22:25"}, lastStation: {text: "八戸"}, rate: 2225}
];
$.midouListSection.setItems(midouData);

var okunakayamaData = [
	{template: "okunakayamaTemplate", time: {text: "7:30"}, lastStation: {text: "八戸"}, rate: 730},
	{template: "okunakayamaTemplate", time: {text: "8:16"}, lastStation: {text: "二戸"}, rate: 816},
	{template: "okunakayamaTemplate", time: {text: "9:55"}, lastStation: {text: "八戸"}, rate: 955},
	{template: "okunakayamaTemplate", time: {text: "11:04"}, lastStation: {text: "八戸"}, rate: 1104},
	{template: "okunakayamaTemplate", time: {text: "12:42"}, lastStation: {text: "八戸"}, rate: 1242},
	{template: "okunakayamaTemplate", time: {text: "13:57"}, lastStation: {text: "八戸"}, rate: 1357},
	{template: "okunakayamaTemplate", time: {text: "14:52"}, lastStation: {text: "八戸"}, rate: 1452},
	{template: "okunakayamaTemplate", time: {text: "16:07"}, lastStation: {text: "八戸"}, rate: 1607},
	{template: "okunakayamaTemplate", time: {text: "17:06"}, lastStation: {text: "金田一温泉"}, rate: 1706},
	{template: "okunakayamaTemplate", time: {text: "17:48"}, lastStation: {text: "八戸"}, rate: 1748},
	{template: "okunakayamaTemplate", time: {text: "19:00"}, lastStation: {text: "八戸"}, rate: 1900},
	{template: "okunakayamaTemplate", time: {text: "19:53"}, lastStation: {text: "八戸"}, rate: 1953},
	{template: "okunakayamaTemplate", time: {text: "21:04"}, lastStation: {text: "八戸"}, rate: 2104},
	{template: "okunakayamaTemplate", time: {text: "22:31"}, lastStation: {text: "八戸"}, rate: 2231}
];
$.okunakayamaListSection.setItems(okunakayamaData);

var kotunagiData = [
	{template: "kotunagiTemplate", time: {text: "7:38"}, lastStation: {text: "八戸"}, rate: 738},
	{template: "kotunagiTemplate", time: {text: "8:24"}, lastStation: {text: "二戸"}, rate: 824},
	{template: "kotunagiTemplate", time: {text: "10:02"}, lastStation: {text: "八戸"}, rate: 1002},
	{template: "kotunagiTemplate", time: {text: "11:12"}, lastStation: {text: "八戸"}, rate: 1112},
	{template: "kotunagiTemplate", time: {text: "12:49"}, lastStation: {text: "八戸"}, rate: 1249},
	{template: "kotunagiTemplate", time: {text: "14:04"}, lastStation: {text: "八戸"}, rate: 1404},
	{template: "kotunagiTemplate", time: {text: "14:59"}, lastStation: {text: "八戸"}, rate: 1459},
	{template: "kotunagiTemplate", time: {text: "16:14"}, lastStation: {text: "八戸"}, rate: 1614},
	{template: "kotunagiTemplate", time: {text: "17:14"}, lastStation: {text: "金田一温泉"}, rate: 1714},
	{template: "kotunagiTemplate", time: {text: "17:56"}, lastStation: {text: "八戸"}, rate: 1756},
	{template: "kotunagiTemplate", time: {text: "19:07"}, lastStation: {text: "八戸"}, rate: 1907},
	{template: "kotunagiTemplate", time: {text: "20:01"}, lastStation: {text: "八戸"}, rate: 2001},
	{template: "kotunagiTemplate", time: {text: "21:11"}, lastStation: {text: "八戸"}, rate: 2111},
	{template: "kotunagiTemplate", time: {text: "22:38"}, lastStation: {text: "八戸"}, rate: 2238}
];
$.kotunagiListSection.setItems(kotunagiData);

var kozuyaData = [
	{template: "kozuyaTemplate", time: {text: "6:33"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 633},
	{template: "kozuyaTemplate", time: {text: "7:45"}, lastStation: {text: "八戸"}, rate: 745},
	{template: "kozuyaTemplate", time: {text: "8:30"}, lastStation: {text: "二戸"}, rate: 830},
	{template: "kozuyaTemplate", time: {text: "10:09"}, lastStation: {text: "八戸"}, rate: 1009},
	{template: "kozuyaTemplate", time: {text: "11:18"}, lastStation: {text: "八戸"}, rate: 1118},
	{template: "kozuyaTemplate", time: {text: "12:56"}, lastStation: {text: "八戸"}, rate: 1256},
	{template: "kozuyaTemplate", time: {text: "14:11"}, lastStation: {text: "八戸"}, rate: 1411},
	{template: "kozuyaTemplate", time: {text: "15:06"}, lastStation: {text: "八戸"}, rate: 1506},
	{template: "kozuyaTemplate", time: {text: "16:21"}, lastStation: {text: "八戸"}, rate: 1621},
	{template: "kozuyaTemplate", time: {text: "17:20"}, lastStation: {text: "金田一温泉"}, rate: 1720},
	{template: "kozuyaTemplate", time: {text: "18:02"}, lastStation: {text: "八戸"}, rate: 1802},
	{template: "kozuyaTemplate", time: {text: "19:14"}, lastStation: {text: "八戸"}, rate: 1914},
	{template: "kozuyaTemplate", time: {text: "20:07"}, lastStation: {text: "八戸"}, rate: 2007},
	{template: "kozuyaTemplate", time: {text: "21:18"}, lastStation: {text: "八戸"}, rate: 2118},
	{template: "kozuyaTemplate", time: {text: "22:45"}, lastStation: {text: "八戸"}, rate: 2245}
];
$.kozuyaListSection.setItems(kozuyaData);

var itinoheData = [
	{template: "kozuyaTemplate", time: {text: "6:40"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 640},
	{template: "kozuyaTemplate", time: {text: "7:50"}, lastStation: {text: "八戸"}, rate: 750},
	{template: "kozuyaTemplate", time: {text: "8:35"}, lastStation: {text: "二戸"}, rate: 835},
	{template: "kozuyaTemplate", time: {text: "10:13"}, lastStation: {text: "八戸"}, rate: 1013},
	{template: "kozuyaTemplate", time: {text: "11:23"}, lastStation: {text: "八戸"}, rate: 1123},
	{template: "kozuyaTemplate", time: {text: "13:00"}, lastStation: {text: "八戸"}, rate: 1300},
	{template: "kozuyaTemplate", time: {text: "14:15"}, lastStation: {text: "八戸"}, rate: 1415},
	{template: "kozuyaTemplate", time: {text: "15:11"}, lastStation: {text: "八戸"}, rate: 1511},
	{template: "kozuyaTemplate", time: {text: "16:25"}, lastStation: {text: "八戸"}, rate: 1625},
	{template: "kozuyaTemplate", time: {text: "17:25"}, lastStation: {text: "金田一温泉"}, rate: 1725},
	{template: "kozuyaTemplate", time: {text: "18:07"}, lastStation: {text: "八戸"}, rate: 1807},
	{template: "kozuyaTemplate", time: {text: "19:19"}, lastStation: {text: "八戸"}, rate: 1919},
	{template: "kozuyaTemplate", time: {text: "20:12"}, lastStation: {text: "八戸"}, rate: 2012},
	{template: "kozuyaTemplate", time: {text: "21:22"}, lastStation: {text: "八戸"}, rate: 2122},
	{template: "kozuyaTemplate", time: {text: "22:50"}, lastStation: {text: "八戸"}, rate: 2250}
];
$.itinoheListSection.setItems(itinoheData);

var ninoheData = [
	{template: "kozuyaTemplate", time: {text: "6:46"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 646},
	{template: "kozuyaTemplate", time: {text: "7:56"}, lastStation: {text: "八戸"}, rate: 756},
	{template: "kozuyaTemplate", time: {text: "10:19"}, lastStation: {text: "八戸"}, rate: 1019},
	{template: "kozuyaTemplate", time: {text: "11:29"}, lastStation: {text: "八戸"}, rate: 1129},
	{template: "kozuyaTemplate", time: {text: "13:06"}, lastStation: {text: "八戸"}, rate: 1306},
	{template: "kozuyaTemplate", time: {text: "14:21"}, lastStation: {text: "八戸"}, rate: 1421},
	{template: "kozuyaTemplate", time: {text: "15:16"}, lastStation: {text: "八戸"}, rate: 1516},
	{template: "kozuyaTemplate", time: {text: "16:31"}, lastStation: {text: "八戸"}, rate: 1631},
	{template: "kozuyaTemplate", time: {text: "17:30"}, lastStation: {text: "金田一温泉"}, rate: 1730},
	{template: "kozuyaTemplate", time: {text: "17:49"}, lastStation: {text: "八戸"}, rate: 1749},
	{template: "kozuyaTemplate", time: {text: "18:12"}, lastStation: {text: "八戸"}, rate: 1812},
	{template: "kozuyaTemplate", time: {text: "19:24"}, lastStation: {text: "八戸"}, rate: 1924},
	{template: "kozuyaTemplate", time: {text: "20:17"}, lastStation: {text: "八戸"}, rate: 2017},
	{template: "kozuyaTemplate", time: {text: "21:28"}, lastStation: {text: "八戸"}, rate: 2128},
	{template: "kozuyaTemplate", time: {text: "22:55"}, lastStation: {text: "八戸"}, rate: 2255}
];
$.ninoheListSection.setItems(ninoheData);

var tomaiData = [
	{template: "tomaiTemplate", time: {text: "6:50"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 650},
	{template: "tomaiTemplate", time: {text: "7:59"}, lastStation: {text: "八戸"}, rate: 759},
	{template: "tomaiTemplate", time: {text: "10:22"}, lastStation: {text: "八戸"}, rate: 1022},
	{template: "tomaiTemplate", time: {text: "11:32"}, lastStation: {text: "八戸"}, rate: 1132},
	{template: "tomaiTemplate", time: {text: "13:09"}, lastStation: {text: "八戸"}, rate: 1309},
	{template: "tomaiTemplate", time: {text: "14:24"}, lastStation: {text: "八戸"}, rate: 1424},
	{template: "tomaiTemplate", time: {text: "15:19"}, lastStation: {text: "八戸"}, rate: 1519},
	{template: "tomaiTemplate", time: {text: "16:34"}, lastStation: {text: "八戸"}, rate: 1634},
	{template: "tomaiTemplate", time: {text: "17:34"}, lastStation: {text: "金田一温泉"}, rate: 1734},
	{template: "tomaiTemplate", time: {text: "17:53"}, lastStation: {text: "八戸"}, rate: 1753},
	{template: "tomaiTemplate", time: {text: "18:16"}, lastStation: {text: "八戸"}, rate: 1816},
	{template: "tomaiTemplate", time: {text: "19:27"}, lastStation: {text: "八戸"}, rate: 1927},
	{template: "tomaiTemplate", time: {text: "20:21"}, lastStation: {text: "八戸"}, rate: 2021},
	{template: "tomaiTemplate", time: {text: "21:31"}, lastStation: {text: "八戸"}, rate: 2131},
	{template: "tomaiTemplate", time: {text: "22:58"}, lastStation: {text: "八戸"}, rate: 2258}
];
$.tomaiListSection.setItems(tomaiData);

var kintaitiData = [
	{template: "kintaitiTemplate", time: {text: "6:55"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 655},
	{template: "kintaitiTemplate", time: {text: "8:03"}, lastStation: {text: "八戸"}, rate: 803},
	{template: "kintaitiTemplate", time: {text: "10:27"}, lastStation: {text: "八戸"}, rate: 1027},
	{template: "kintaitiTemplate", time: {text: "11:36"}, lastStation: {text: "八戸"}, rate: 1136},
	{template: "kintaitiTemplate", time: {text: "13:13"}, lastStation: {text: "八戸"}, rate: 1313},
	{template: "kintaitiTemplate", time: {text: "14:28"}, lastStation: {text: "八戸"}, rate: 1428},
	{template: "kintaitiTemplate", time: {text: "15:24"}, lastStation: {text: "八戸"}, rate: 1524},
	{template: "kintaitiTemplate", time: {text: "16:38"}, lastStation: {text: "八戸"}, rate: 1638},
	{template: "kintaitiTemplate", time: {text: "17:57"}, lastStation: {text: "八戸"}, rate: 1757},
	{template: "kintaitiTemplate", time: {text: "18:20"}, lastStation: {text: "八戸"}, rate: 1820},
	{template: "kintaitiTemplate", time: {text: "19:32"}, lastStation: {text: "八戸"}, rate: 1932},
	{template: "kintaitiTemplate", time: {text: "20:25"}, lastStation: {text: "八戸"}, rate: 2025},
	{template: "kintaitiTemplate", time: {text: "21:35"}, lastStation: {text: "八戸"}, rate: 2135},
	{template: "kintaitiTemplate", time: {text: "23:03"}, lastStation: {text: "八戸"}, rate: 2303}
];
$.kintaitiListSection.setItems(kintaitiData);

var metokiData = [
	{template: "metokiTemplate", time: {text: "7:00"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 700},
	{template: "metokiTemplate", time: {text: "8:07"}, lastStation: {text: "八戸"}, rate: 807},
	{template: "metokiTemplate", time: {text: "10:32"}, lastStation: {text: "八戸"}, rate: 1032},
	{template: "metokiTemplate", time: {text: "11:40"}, lastStation: {text: "八戸"}, rate: 1140},
	{template: "metokiTemplate", time: {text: "13:17"}, lastStation: {text: "八戸"}, rate: 1317},
	{template: "metokiTemplate", time: {text: "14:32"}, lastStation: {text: "八戸"}, rate: 1432},
	{template: "metokiTemplate", time: {text: "15:28"}, lastStation: {text: "八戸"}, rate: 1528},
	{template: "metokiTemplate", time: {text: "16:42"}, lastStation: {text: "八戸"}, rate: 1642},
	{template: "metokiTemplate", time: {text: "18:01"}, lastStation: {text: "八戸"}, rate: 1801},
	{template: "metokiTemplate", time: {text: "18:24"}, lastStation: {text: "八戸"}, rate: 1824},
	{template: "metokiTemplate", time: {text: "19:37"}, lastStation: {text: "八戸"}, rate: 1937},
	{template: "metokiTemplate", time: {text: "20:29"}, lastStation: {text: "八戸"}, rate: 2029},
	{template: "metokiTemplate", time: {text: "21:39"}, lastStation: {text: "八戸"}, rate: 2139},
	{template: "metokiTemplate", time: {text: "23:07"}, lastStation: {text: "八戸"}, rate: 2307}
];
$.metokiListSection.setItems(metokiData);

var allSatationsData = [
	moriokaData,
	aoyamaData,
	kuriyagawaData,
	sugoData,
	takizawaData,
	sibutamiData,
	koumaData,
	kawagutiData,
	numakunaiData,
	midouData,
	okunakayamaData,
	kotunagiData,
	kozuyaData,
	itinoheData,
	ninoheData,
	tomaiData,
	kintaitiData,
	metokiData
];

var distanceData = [
	{lat: 39.701317, lng: 141.136021},
	{lat: 39.724675, lng: 141.118271},
	{lat: 39.744673, lng: 141.12913},
	{lat: 39.783724, lng: 141.148987},
	{lat: 39.798806, lng: 141.149737},
	{lat: 39.834552, lng: 141.154068},
	{lat: 39.874214, lng: 141.173647},
	{lat: 39.918877, lng: 141.199309},
	{lat: 39.960345, lng: 141.217333},
	{lat: 40.00434, lng: 141.23694},
	{lat: 40.066332, lng: 141.22841},
	{lat: 40.122771, lng: 141.260182},
	{lat: 40.171211, lng: 141.308009},
	{lat: 40.210012, lng: 141.297286},
	{lat: 40.259728, lng: 141.286034},
	{lat: 40.285586, lng: 141.290782},
	{lat: 40.323138, lng: 141.303612},
	{lat: 40.351967, lng: 141.289556}
];

function getCurrentPosition() {
	$.gpsSwitch.setValue(Ti.App.Properties.getBool("switch"));
	if (!$.gpsSwitch.value) {
		getScrollItemIndex(Alloy.Globals.currentPage);
		return;
	}
	Ti.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) {
			Ti.UI.createAlertDialog({
				title: "エラー",
				message: "位置情報の取得に失敗しました"
			}).show();
			getScrollItemIndex(Alloy.Globals.currentPage);
			return;
		}
		Alloy.Globals.latitude = e.coords.latitude;
		Alloy.Globals.longitude = e.coords.longitude;
		Ti.API.debug("緯度：" + e.coords.latitude);
		Ti.API.debug("経度：" + e.coords.longitude);

		var distanceData2 = [];
		for (var i = 0; i < distanceData.length; i++) {
			distanceData2.push(getDistance(distanceData[i].lat, distanceData[i].lng));
		}
		var nearDistance;
		var a, b;
		for (var i = 0; i < distanceData2.length; i++) {
			a = distanceData2[i];
			if (i === 0) {
				b = a;
				nearDistance = i;
			}
			if (i > 0) {
				if (a < b) {
					b = a;
					nearDistance = i;
				}
			}
		}
		$.scrollableView.setCurrentPage(nearDistance);
		getScrollItemIndex(nearDistance);
	});
}

function getDistance(lat, lng) {
	function radians(deg) {
		return deg * Math.PI / 180;
	}
	var distance =  6378.14 * Math.acos(Math.cos(radians(Alloy.Globals.latitude))*
	Math.cos(radians(lat))*
	Math.cos(radians(lng)-radians(Alloy.Globals.longitude))+
	Math.sin(radians(Alloy.Globals.latitude))*
	Math.sin(radians(lat)));
	return distance;
}

function changePage(e) {
	$.stationName.setText(stations[e.currentPage]);
	getScrollItemIndex(e.currentPage);
}

function getScrollItemIndex(e) {
	var currentStationsData = allSatationsData[e];
	if (currentTime > currentStationsData[currentStationsData.length - 1].rate) {
		scrollItemIndex = 0;
		sectionUpdateItem(e);
		return;
	}
	for (var i = 0; i < currentStationsData.length; i++) {
		if (currentTime < currentStationsData[i].rate) {
			scrollItemIndex = i;
			sectionUpdateItem(e);
			return;
		}
	}
}

function sectionUpdateItem(e) {
	Ti.API.debug("スクロールindex：" + scrollItemIndex);
	var listSection = $.scrollableView.views[e].sections[0];
	$.scrollableView.views[e].scrollToItem(0, scrollItemIndex, {animate: true});
	var listItem = listSection.getItemAt(scrollItemIndex);
	listItem.time.color = "#FF0000";
	listSection.updateItemAt(scrollItemIndex, listItem, {animate: true});
}

function getTime() {
	date = new Date();
	hour = String(date.getHours());
	minutes = String(date.getMinutes());
	currentTime = Number(hour + minutes);
	Ti.API.debug("現在時刻レート：" + currentTime);
}

function openSelectStation() {
	var arg = {
		lineName: $.lineName.text,
		stations: stations,
		scrollableView: $.scrollableView
	}
	var selectWin = Alloy.createController('select', arg).getView();
	selectWin.open();
}

function onGps() {
	if (Alloy.Globals.onSetValue) {
		Alloy.Globals.onSetValue = false;
		return;
	}
	/*
	if (OS_ANDROID) {
		Ti.App.Properties.setBool("startUp", false);
		return;
	}
	*/
	Ti.App.Properties.setBool("switch", $.gpsSwitch.value);
	if ($.gpsSwitch.value) {
		alert("GPS機能をONにしました");
		getCurrentPosition();
	} else {
		alert("GPS機能をOFFにしました");
	}
}

function closeWin() {
	Alloy.Globals.onSetValue = true;
	$.downWin.close();
}
