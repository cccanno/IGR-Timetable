// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var currentTime;
var hour, minutes;
var scrollItemIndex;
var onSetValue = false;

var date = new Date();
hour = String(date.getHours());
if (date.getMinutes() < 10) {
	minutes = "0" + date.getMinutes();
} else {
	minutes = String(date.getMinutes());
}
currentTime = Number(hour + minutes);

var stations = [
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

var aoyamaData = [
	{template: "aoyamaTemplate", time: {text: "6:26"}, lastStation: {text: "盛岡"}, rate: 626, lag: {}},
	{template: "aoyamaTemplate", time: {text: "7:01"}, lastStation: {text: "盛岡"}, rate: 701, lag: {}},
	{template: "aoyamaTemplate", time: {text: "7:33"}, lastStation: {text: "[花]日詰（盛岡経由）＊土休日は盛岡止まり"}, rate: 733, lag: {}},
	{template: "aoyamaTemplate", time: {text: "7:40"}, lastStation: {text: "盛岡"}, rate: 740, lag: {}},
	{template: "aoyamaTemplate", time: {text: "7:48"}, lastStation: {text: "北上（盛岡経由）"}, rate: 748, lag: {}},
	{template: "aoyamaTemplate", time: {text: "7:52"}, lastStation: {text: "盛岡"}, rate: 752, lag: {}},
	{template: "aoyamaTemplate", time: {text: "8:01"}, lastStation: {text: "一ノ関（盛岡経由）"}, rate: 801, lag: {}},
	{template: "aoyamaTemplate", time: {text: "8:15"}, lastStation: {text: "[花]盛岡"}, rate: 815, lag: {}},
	{template: "aoyamaTemplate", time: {text: "8:45"}, lastStation: {text: "盛岡"}, rate: 845, lag: {}},
	{template: "aoyamaTemplate", time: {text: "8:55"}, lastStation: {text: "盛岡"}, rate: 855, lag: {}},
	{template: "aoyamaTemplate", time: {text: "9:15"}, lastStation: {text: "盛岡"}, rate: 915, lag: {}},
	{template: "aoyamaTemplate", time: {text: "9:35"}, lastStation: {text: "[花]盛岡"}, rate: 935, lag: {}},
	{template: "aoyamaTemplate", time: {text: "9:53"}, lastStation: {text: "盛岡"}, rate: 953, lag: {}},
	{template: "aoyamaTemplate", time: {text: "10:10"}, lastStation: {text: "盛岡"}, rate: 1010, lag: {}},
	{template: "aoyamaTemplate", time: {text: "10:44"}, lastStation: {text: "盛岡"}, rate: 1044, lag: {}},
	{template: "aoyamaTemplate", time: {text: "11:08"}, lastStation: {text: "盛岡"}, rate: 1108, lag: {}},
	{template: "aoyamaTemplate", time: {text: "11:51"}, lastStation: {text: "盛岡"}, rate: 1151, lag: {}},
	{template: "aoyamaTemplate", time: {text: "12:10"}, lastStation: {text: "[花]盛岡"}, rate: 1210, lag: {}},
	{template: "aoyamaTemplate", time: {text: "12:25"}, lastStation: {text: "盛岡"}, rate: 1225, lag: {}},
	{template: "aoyamaTemplate", time: {text: "12:54"}, lastStation: {text: "盛岡"}, rate: 1254, lag: {}},
	{template: "aoyamaTemplate", time: {text: "13:36"}, lastStation: {text: "盛岡"}, rate: 1336, lag: {}},
	{template: "aoyamaTemplate", time: {text: "14:22"}, lastStation: {text: "盛岡"}, rate: 1422, lag: {}},
	{template: "aoyamaTemplate", time: {text: "14:43"}, lastStation: {text: "盛岡"}, rate: 1443, lag: {}},
	{template: "aoyamaTemplate", time: {text: "15:14"}, lastStation: {text: "盛岡"}, rate: 1514, lag: {}},
	{template: "aoyamaTemplate", time: {text: "15:50"}, lastStation: {text: "盛岡"}, rate: 1550, lag: {}},
	{template: "aoyamaTemplate", time: {text: "16:22"}, lastStation: {text: "[花]盛岡"}, rate: 1622, lag: {}},
	{template: "aoyamaTemplate", time: {text: "16:48"}, lastStation: {text: "盛岡"}, rate: 1648, lag: {}},
	{template: "aoyamaTemplate", time: {text: "17:10"}, lastStation: {text: "盛岡"}, rate: 1710, lag: {}},
	{template: "aoyamaTemplate", time: {text: "17:51"}, lastStation: {text: "盛岡"}, rate: 1751, lag: {}},
	{template: "aoyamaTemplate", time: {text: "18:32"}, lastStation: {text: "[花]盛岡"}, rate: 1832, lag: {}},
	{template: "aoyamaTemplate", time: {text: "18:45"}, lastStation: {text: "盛岡"}, rate: 1845, lag: {}},
	{template: "aoyamaTemplate", time: {text: "18:56"}, lastStation: {text: "盛岡"}, rate: 1856, lag: {}},
	{template: "aoyamaTemplate", time: {text: "19:09"}, lastStation: {text: "盛岡 ＊土休日運休"}, rate: 1909, lag: {}},
	{template: "aoyamaTemplate", time: {text: "19:25"}, lastStation: {text: "盛岡"}, rate: 1925, lag: {}},
	{template: "aoyamaTemplate", time: {text: "20:05"}, lastStation: {text: "盛岡"}, rate: 2005, lag: {}},
	{template: "aoyamaTemplate", time: {text: "20:32"}, lastStation: {text: "[花]盛岡"}, rate: 2032, lag: {}},
	{template: "aoyamaTemplate", time: {text: "20:43"}, lastStation: {text: "盛岡"}, rate: 2043, lag: {}},
	{template: "aoyamaTemplate", time: {text: "21:16"}, lastStation: {text: "盛岡"}, rate: 2116, lag: {}},
	{template: "aoyamaTemplate", time: {text: "21:55"}, lastStation: {text: "[花]盛岡"}, rate: 2155, lag: {}},
	{template: "aoyamaTemplate", time: {text: "22:18"}, lastStation: {text: "盛岡"}, rate: 2218, lag: {}},
	{template: "aoyamaTemplate", time: {text: "22:43"}, lastStation: {text: "盛岡"}, rate: 2243, lag: {}}
];
$.aoyamaListSection.setItems(aoyamaData);

var kuriyagawaData = [
	{template: "kuriyagawaTemplate", time: {text: "6:23"}, lastStation: {text: "盛岡"}, rate: 623, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "6:57"}, lastStation: {text: "盛岡"}, rate: 657, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "7:30"}, lastStation: {text: "[花]日詰（盛岡経由）＊土休日は盛岡止まり"}, rate: 730, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "7:37"}, lastStation: {text: "盛岡"}, rate: 737, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "7:44"}, lastStation: {text: "北上（盛岡経由）"}, rate: 744, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "7:49"}, lastStation: {text: "盛岡"}, rate: 749, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "7:58"}, lastStation: {text: "一ノ関（盛岡経由）"}, rate: 758, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "8:11"}, lastStation: {text: "[花]盛岡"}, rate: 811, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "8:42"}, lastStation: {text: "盛岡"}, rate: 842, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "8:52"}, lastStation: {text: "盛岡"}, rate: 852, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "9:12"}, lastStation: {text: "盛岡"}, rate: 912, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "9:31"}, lastStation: {text: "[花]盛岡"}, rate: 931, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "9:50"}, lastStation: {text: "盛岡"}, rate: 950, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "10:07"}, lastStation: {text: "盛岡"}, rate: 1007, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "10:41"}, lastStation: {text: "盛岡"}, rate: 1041, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "11:05"}, lastStation: {text: "盛岡"}, rate: 1105, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "11:48"}, lastStation: {text: "盛岡"}, rate: 1148, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "12:06"}, lastStation: {text: "[花]盛岡"}, rate: 1206, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "12:22"}, lastStation: {text: "盛岡"}, rate: 1222, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "12:51"}, lastStation: {text: "盛岡"}, rate: 1251, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "13:33"}, lastStation: {text: "盛岡"}, rate: 1333, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "14:19"}, lastStation: {text: "盛岡"}, rate: 1419, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "14:40"}, lastStation: {text: "盛岡"}, rate: 1440, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "15:11"}, lastStation: {text: "盛岡"}, rate: 1511, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "15:47"}, lastStation: {text: "盛岡"}, rate: 1547, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "16:18"}, lastStation: {text: "[花]盛岡"}, rate: 1618, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "16:45"}, lastStation: {text: "盛岡"}, rate: 1645, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "17:07"}, lastStation: {text: "盛岡"}, rate: 1707, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "17:47"}, lastStation: {text: "盛岡"}, rate: 1747, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "18:29"}, lastStation: {text: "[花]盛岡"}, rate: 1829, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "18:42"}, lastStation: {text: "盛岡"}, rate: 1842, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "18:53"}, lastStation: {text: "盛岡"}, rate: 1853, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "18:53"}, lastStation: {text: "盛岡"}, rate: 1853, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "19:06"}, lastStation: {text: "盛岡 ＊土休日運休"}, rate: 1906, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "19:22"}, lastStation: {text: "盛岡"}, rate: 1922, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "20:02"}, lastStation: {text: "盛岡"}, rate: 2002, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "20:29"}, lastStation: {text: "[花]盛岡"}, rate: 2029, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "20:39"}, lastStation: {text: "盛岡"}, rate: 2039, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "21:13"}, lastStation: {text: "盛岡"}, rate: 2113, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "21:52"}, lastStation: {text: "[花]盛岡"}, rate: 2152, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "22:15"}, lastStation: {text: "盛岡"}, rate: 2215, lag: {}},
	{template: "kuriyagawaTemplate", time: {text: "22:40"}, lastStation: {text: "盛岡"}, rate: 2240, lag: {}}
];
$.kuriyagawaListSection.setItems(kuriyagawaData);

var sugoData = [
	{template: "sugoTemplate", time: {text: "6:18"}, lastStation: {text: "盛岡"}, rate: 618, lag: {}},
	{template: "sugoTemplate", time: {text: "6:52"}, lastStation: {text: "盛岡"}, rate: 652, lag: {}},
	{template: "sugoTemplate", time: {text: "7:25"}, lastStation: {text: "[花]日詰（盛岡経由）＊土休日は盛岡止まり"}, rate: 725, lag: {}},
	{template: "sugoTemplate", time: {text: "7:32"}, lastStation: {text: "盛岡"}, rate: 732, lag: {}},
	{template: "sugoTemplate", time: {text: "7:39"}, lastStation: {text: "北上（盛岡経由）"}, rate: 739, lag: {}},
	{template: "sugoTemplate", time: {text: "7:45"}, lastStation: {text: "盛岡"}, rate: 745, lag: {}},
	{template: "sugoTemplate", time: {text: "7:53"}, lastStation: {text: "一ノ関（盛岡経由）"}, rate: 753, lag: {}},
	{template: "sugoTemplate", time: {text: "8:05"}, lastStation: {text: "[花]盛岡"}, rate: 805, lag: {}},
	{template: "sugoTemplate", time: {text: "8:37"}, lastStation: {text: "盛岡"}, rate: 837, lag: {}},
	{template: "sugoTemplate", time: {text: "8:47"}, lastStation: {text: "盛岡"}, rate: 847, lag: {}},
	{template: "sugoTemplate", time: {text: "9:07"}, lastStation: {text: "盛岡"}, rate: 907, lag: {}},
	{template: "sugoTemplate", time: {text: "9:26"}, lastStation: {text: "[花]盛岡"}, rate: 926, lag: {}},
	{template: "sugoTemplate", time: {text: "9:45"}, lastStation: {text: "盛岡"}, rate: 945, lag: {}},
	{template: "sugoTemplate", time: {text: "10:02"}, lastStation: {text: "盛岡"}, rate: 1002, lag: {}},
	{template: "sugoTemplate", time: {text: "10:37"}, lastStation: {text: "盛岡"}, rate: 1037, lag: {}},
	{template: "sugoTemplate", time: {text: "11:00"}, lastStation: {text: "盛岡"}, rate: 1100, lag: {}},
	{template: "sugoTemplate", time: {text: "11:43"}, lastStation: {text: "盛岡"}, rate: 1143, lag: {}},
	{template: "sugoTemplate", time: {text: "12:01"}, lastStation: {text: "[花]盛岡"}, rate: 1201, lag: {}},
	{template: "sugoTemplate", time: {text: "12:17"}, lastStation: {text: "[花]盛岡"}, rate: 1217, lag: {}},
	{template: "sugoTemplate", time: {text: "12:47"}, lastStation: {text: "盛岡"}, rate: 1247, lag: {}},
	{template: "sugoTemplate", time: {text: "13:29"}, lastStation: {text: "盛岡"}, rate: 1329, lag: {}},
	{template: "sugoTemplate", time: {text: "14:15"}, lastStation: {text: "盛岡"}, rate: 1415, lag: {}},
	{template: "sugoTemplate", time: {text: "14:35"}, lastStation: {text: "盛岡"}, rate: 1435, lag: {}},
	{template: "sugoTemplate", time: {text: "15:07"}, lastStation: {text: "盛岡"}, rate: 1507, lag: {}},
	{template: "sugoTemplate", time: {text: "15:42"}, lastStation: {text: "盛岡"}, rate: 1542, lag: {}},
	{template: "sugoTemplate", time: {text: "16:14"}, lastStation: {text: "[花]盛岡"}, rate: 1614, lag: {}},
	{template: "sugoTemplate", time: {text: "16:41"}, lastStation: {text: "盛岡"}, rate: 1641, lag: {}},
	{template: "sugoTemplate", time: {text: "17:02"}, lastStation: {text: "盛岡"}, rate: 1702, lag: {}},
	{template: "sugoTemplate", time: {text: "17:43"}, lastStation: {text: "盛岡"}, rate: 1743, lag: {}},
	{template: "sugoTemplate", time: {text: "18:24"}, lastStation: {text: "[花]盛岡"}, rate: 1824, lag: {}},
	{template: "sugoTemplate", time: {text: "18:37"}, lastStation: {text: "盛岡"}, rate: 1837, lag: {}},
	{template: "sugoTemplate", time: {text: "18:49"}, lastStation: {text: "盛岡"}, rate: 1849, lag: {}},
	{template: "sugoTemplate", time: {text: "19:01"}, lastStation: {text: "盛岡 ＊土休日運休"}, rate: 1901, lag: {}},
	{template: "sugoTemplate", time: {text: "19:18"}, lastStation: {text: "盛岡"}, rate: 1918, lag: {}},
	{template: "sugoTemplate", time: {text: "19:57"}, lastStation: {text: "盛岡"}, rate: 1957, lag: {}},
	{template: "sugoTemplate", time: {text: "20:24"}, lastStation: {text: "[花]盛岡"}, rate: 2024, lag: {}},
	{template: "sugoTemplate", time: {text: "20:35"}, lastStation: {text: "盛岡"}, rate: 2035, lag: {}},
	{template: "sugoTemplate", time: {text: "21:08"}, lastStation: {text: "盛岡"}, rate: 2108, lag: {}},
	{template: "sugoTemplate", time: {text: "21:47"}, lastStation: {text: "[花]盛岡"}, rate: 2147, lag: {}},
	{template: "sugoTemplate", time: {text: "22:11"}, lastStation: {text: "盛岡"}, rate: 2211, lag: {}},
	{template: "sugoTemplate", time: {text: "22:36"}, lastStation: {text: "盛岡"}, rate: 2236, lag: {}}
];
$.sugoListSection.setItems(sugoData);

var takizawaData = [
	{template: "takizawaTemplate", time: {text: "6:16"}, lastStation: {text: "盛岡"}, rate: 616, lag: {}},
	{template: "takizawaTemplate", time: {text: "6:49"}, lastStation: {text: "盛岡"}, rate: 649, lag: {}},
	{template: "takizawaTemplate", time: {text: "7:22"}, lastStation: {text: "[花]日詰（盛岡経由）＊土休日は盛岡止まり"}, rate: 722, lag: {}},
	{template: "takizawaTemplate", time: {text: "7:29"}, lastStation: {text: "盛岡"}, rate: 729, lag: {}},
	{template: "takizawaTemplate", time: {text: "7:36"}, lastStation: {text: "北上（盛岡経由）"}, rate: 736, lag: {}},
	{template: "takizawaTemplate", time: {text: "7:42"}, lastStation: {text: "盛岡"}, rate: 742, lag: {}},
	{template: "takizawaTemplate", time: {text: "7:50"}, lastStation: {text: "一ノ関（盛岡経由）"}, rate: 750, lag: {}},
	{template: "takizawaTemplate", time: {text: "8:02"}, lastStation: {text: "[花]盛岡"}, rate: 802, lag: {}},
	{template: "takizawaTemplate", time: {text: "8:34"}, lastStation: {text: "盛岡"}, rate: 834, lag: {}},
	{template: "takizawaTemplate", time: {text: "8:45"}, lastStation: {text: "盛岡"}, rate: 845, lag: {}},
	{template: "takizawaTemplate", time: {text: "9:04"}, lastStation: {text: "盛岡"}, rate: 904, lag: {}},
	{template: "takizawaTemplate", time: {text: "9:23"}, lastStation: {text: "[花]盛岡"}, rate: 923, lag: {}},
	{template: "takizawaTemplate", time: {text: "9:43"}, lastStation: {text: "盛岡"}, rate: 943, lag: {}},
	{template: "takizawaTemplate", time: {text: "10:00"}, lastStation: {text: "盛岡"}, rate: 1000, lag: {}},
	{template: "takizawaTemplate", time: {text: "10:34"}, lastStation: {text: "盛岡"}, rate: 1034, lag: {}},
	{template: "takizawaTemplate", time: {text: "10:57"}, lastStation: {text: "盛岡"}, rate: 1057, lag: {}},
	{template: "takizawaTemplate", time: {text: "11:40"}, lastStation: {text: "盛岡"}, rate: 1140, lag: {}},
	{template: "takizawaTemplate", time: {text: "11:58"}, lastStation: {text: "[花]盛岡"}, rate: 1158, lag: {}},
	{template: "takizawaTemplate", time: {text: "12:15"}, lastStation: {text: "盛岡"}, rate: 1215, lag: {}},
	{template: "takizawaTemplate", time: {text: "12:44"}, lastStation: {text: "盛岡"}, rate: 1244, lag: {}},
	{template: "takizawaTemplate", time: {text: "13:26"}, lastStation: {text: "盛岡"}, rate: 1326, lag: {}},
	{template: "takizawaTemplate", time: {text: "14:12"}, lastStation: {text: "盛岡"}, rate: 1412, lag: {}},
	{template: "takizawaTemplate", time: {text: "14:32"}, lastStation: {text: "盛岡"}, rate: 1432, lag: {}},
	{template: "takizawaTemplate", time: {text: "15:04"}, lastStation: {text: "盛岡"}, rate: 1504, lag: {}},
	{template: "takizawaTemplate", time: {text: "15:39"}, lastStation: {text: "盛岡"}, rate: 1539, lag: {}},
	{template: "takizawaTemplate", time: {text: "16:11"}, lastStation: {text: "[花]盛岡"}, rate: 1611, lag: {}},
	{template: "takizawaTemplate", time: {text: "16:38"}, lastStation: {text: "盛岡"}, rate: 1638, lag: {}},
	{template: "takizawaTemplate", time: {text: "17:00"}, lastStation: {text: "盛岡"}, rate: 1700, lag: {}},
	{template: "takizawaTemplate", time: {text: "18:21"}, lastStation: {text: "[花]盛岡"}, rate: 1821, lag: {}},
	{template: "takizawaTemplate", time: {text: "18:35"}, lastStation: {text: "盛岡"}, rate: 1835, lag: {}},
	{template: "takizawaTemplate", time: {text: "18:46"}, lastStation: {text: "盛岡"}, rate: 1846, lag: {}},
	{template: "takizawaTemplate", time: {text: "18:59"}, lastStation: {text: "盛岡 ＊土休日"}, rate: 1859, lag: {}},
	{template: "takizawaTemplate", time: {text: "19:15"}, lastStation: {text: "盛岡"}, rate: 1915, lag: {}},
	{template: "takizawaTemplate", time: {text: "19:55"}, lastStation: {text: "盛岡"}, rate: 1955, lag: {}},
	{template: "takizawaTemplate", time: {text: "20:21"}, lastStation: {text: "[花]盛岡"}, rate: 2021, lag: {}},
	{template: "takizawaTemplate", time: {text: "20:32"}, lastStation: {text: "盛岡"}, rate: 2032, lag: {}},
	{template: "takizawaTemplate", time: {text: "21:06"}, lastStation: {text: "盛岡"}, rate: 2106, lag: {}},
	{template: "takizawaTemplate", time: {text: "21:44"}, lastStation: {text: "[花]盛岡"}, rate: 2144, lag: {}},
	{template: "takizawaTemplate", time: {text: "22:08"}, lastStation: {text: "盛岡"}, rate: 2208, lag: {}},
	{template: "takizawaTemplate", time: {text: "22:33"}, lastStation: {text: "盛岡"}, rate: 2233, lag: {}}
];
$.takizawaListSection.setItems(takizawaData);

var sibutamiData = [
	{template: "sibutamiTemplate", time: {text: "6:11"}, lastStation: {text: "盛岡"}, rate: 611, lag: {}},
	{template: "sibutamiTemplate", time: {text: "6:44"}, lastStation: {text: "盛岡"}, rate: 644, lag: {}},
	{template: "sibutamiTemplate", time: {text: "7:16"}, lastStation: {text: "[花]日詰（盛岡経由）＊土休日は盛岡止まり"}, rate: 716, lag: {}},
	{template: "sibutamiTemplate", time: {text: "7:24"}, lastStation: {text: "盛岡"}, rate: 724, lag: {}},
	{template: "sibutamiTemplate", time: {text: "7:31"}, lastStation: {text: "北上（盛岡経由）"}, rate: 731, lag: {}},
	{template: "sibutamiTemplate", time: {text: "7:38"}, lastStation: {text: "盛岡"}, rate: 738, lag: {}},
	{template: "sibutamiTemplate", time: {text: "7:56"}, lastStation: {text: "[花]盛岡"}, rate: 756, lag: {}},
	{template: "sibutamiTemplate", time: {text: "8:40"}, lastStation: {text: "盛岡"}, rate: 840, lag: {}},
	{template: "sibutamiTemplate", time: {text: "9:00"}, lastStation: {text: "盛岡"}, rate: 900, lag: {}},
	{template: "sibutamiTemplate", time: {text: "9:18"}, lastStation: {text: "[花]盛岡"}, rate: 918, lag: {}},
	{template: "sibutamiTemplate", time: {text: "9:38"}, lastStation: {text: "盛岡"}, rate: 938, lag: {}},
	{template: "sibutamiTemplate", time: {text: "9:55"}, lastStation: {text: "盛岡"}, rate: 955, lag: {}},
	{template: "sibutamiTemplate", time: {text: "10:30"}, lastStation: {text: "盛岡"}, rate: 1030, lag: {}},
	{template: "sibutamiTemplate", time: {text: "11:54"}, lastStation: {text: "[花]盛岡"}, rate: 1154, lag: {}},
	{template: "sibutamiTemplate", time: {text: "12:10"}, lastStation: {text: "盛岡"}, rate: 1210, lag: {}},
	{template: "sibutamiTemplate", time: {text: "12:40"}, lastStation: {text: "盛岡"}, rate: 1240, lag: {}},
	{template: "sibutamiTemplate", time: {text: "13:22"}, lastStation: {text: "盛岡"}, rate: 1322, lag: {}},
	{template: "sibutamiTemplate", time: {text: "14:08"}, lastStation: {text: "盛岡"}, rate: 1408, lag: {}},
	{template: "sibutamiTemplate", time: {text: "14:28"}, lastStation: {text: "盛岡"}, rate: 1428, lag: {}},
	{template: "sibutamiTemplate", time: {text: "15:35"}, lastStation: {text: "盛岡"}, rate: 1535, lag: {}},
	{template: "sibutamiTemplate", time: {text: "16:06"}, lastStation: {text: "[花]盛岡"}, rate: 1535, lag: {}},
	{template: "sibutamiTemplate", time: {text: "16:34"}, lastStation: {text: "盛岡"}, rate: 1634, lag: {}},
	{template: "sibutamiTemplate", time: {text: "16:55"}, lastStation: {text: "盛岡"}, rate: 1655, lag: {}},
	{template: "sibutamiTemplate", time: {text: "17:35"}, lastStation: {text: "盛岡"}, rate: 1735, lag: {}},
	{template: "sibutamiTemplate", time: {text: "18:16"}, lastStation: {text: "[花]盛岡"}, rate: 1816, lag: {}},
	{template: "sibutamiTemplate", time: {text: "18:30"}, lastStation: {text: "盛岡"}, rate: 1830, lag: {}},
	{template: "sibutamiTemplate", time: {text: "18:42"}, lastStation: {text: "盛岡"}, rate: 1842, lag: {}},
	{template: "sibutamiTemplate", time: {text: "18:54"}, lastStation: {text: "盛岡 ＊土休日運休"}, rate: 1854, lag: {}},
	{template: "sibutamiTemplate", time: {text: "19:11"}, lastStation: {text: "盛岡"}, rate: 1911, lag: {}},
	{template: "sibutamiTemplate", time: {text: "19:50"}, lastStation: {text: "盛岡"}, rate: 1950, lag: {}},
	{template: "sibutamiTemplate", time: {text: "20:16"}, lastStation: {text: "[花]盛岡"}, rate: 2016, lag: {}},
	{template: "sibutamiTemplate", time: {text: "20:28"}, lastStation: {text: "盛岡"}, rate: 2028, lag: {}},
	{template: "sibutamiTemplate", time: {text: "21:01"}, lastStation: {text: "盛岡"}, rate: 2101, lag: {}},
	{template: "sibutamiTemplate", time: {text: "21:39"}, lastStation: {text: "[花]盛岡"}, rate: 2139, lag: {}},
	{template: "sibutamiTemplate", time: {text: "22:03"}, lastStation: {text: "盛岡"}, rate: 2203, lag: {}},
	{template: "sibutamiTemplate", time: {text: "22:29"}, lastStation: {text: "盛岡"}, rate: 2229, lag: {}}
];
$.sibutamiListSection.setItems(sibutamiData);

var koumaData = [
	{template: "koumaTemplate", time: {text: "6:07"}, lastStation: {text: "盛岡"}, rate: 607, lag: {}},
	{template: "koumaTemplate", time: {text: "6:40"}, lastStation: {text: "盛岡"}, rate: 640, lag: {}},
	{template: "koumaTemplate", time: {text: "7:11"}, lastStation: {text: "[花]日詰（盛岡経由）＊土休日は盛岡止まり"}, rate: 711, lag: {}},
	{template: "koumaTemplate", time: {text: "7:20"}, lastStation: {text: "盛岡"}, rate: 720, lag: {}},
	{template: "koumaTemplate", time: {text: "7:26"}, lastStation: {text: "北上（盛岡経由）"}, rate: 726, lag: {}},
	{template: "koumaTemplate", time: {text: "7:33"}, lastStation: {text: "盛岡"}, rate: 733, lag: {}},
	{template: "koumaTemplate", time: {text: "7:50"}, lastStation: {text: "[花]盛岡"}, rate: 750, lag: {}},
	{template: "koumaTemplate", time: {text: "8:36"}, lastStation: {text: "盛岡"}, rate: 836, lag: {}},
	{template: "koumaTemplate", time: {text: "8:55"}, lastStation: {text: "盛岡"}, rate: 855, lag: {}},
	{template: "koumaTemplate", time: {text: "9:12"}, lastStation: {text: "[花]盛岡"}, rate: 912, lag: {}},
	{template: "koumaTemplate", time: {text: "9:34"}, lastStation: {text: "盛岡"}, rate: 934, lag: {}},
	{template: "koumaTemplate", time: {text: "9:51"}, lastStation: {text: "盛岡"}, rate: 951, lag: {}},
	{template: "koumaTemplate", time: {text: "10:25"}, lastStation: {text: "盛岡"}, rate: 1025, lag: {}},
	{template: "koumaTemplate", time: {text: "11:48"}, lastStation: {text: "[花]盛岡"}, rate: 1148, lag: {}},
	{template: "koumaTemplate", time: {text: "12:06"}, lastStation: {text: "盛岡"}, rate: 1206, lag: {}},
	{template: "koumaTemplate", time: {text: "12:35"}, lastStation: {text: "盛岡"}, rate: 1317, lag: {}},
	{template: "koumaTemplate", time: {text: "14:03"}, lastStation: {text: "盛岡"}, rate: 1403, lag: {}},
	{template: "koumaTemplate", time: {text: "14:23"}, lastStation: {text: "盛岡"}, rate: 1423, lag: {}},
	{template: "koumaTemplate", time: {text: "15:31"}, lastStation: {text: "盛岡"}, rate: 1531, lag: {}},
	{template: "koumaTemplate", time: {text: "16:01"}, lastStation: {text: "[花]盛岡"}, rate: 1601, lag: {}},
	{template: "koumaTemplate", time: {text: "16:29"}, lastStation: {text: "盛岡"}, rate: 1629, lag: {}},
	{template: "koumaTemplate", time: {text: "16:51"}, lastStation: {text: "盛岡"}, rate: 1651, lag: {}},
	{template: "koumaTemplate", time: {text: "17:31"}, lastStation: {text: "盛岡"}, rate: 1731, lag: {}},
	{template: "koumaTemplate", time: {text: "18:11"}, lastStation: {text: "[花]盛岡"}, rate: 1811, lag: {}},
	{template: "koumaTemplate", time: {text: "18:26"}, lastStation: {text: "盛岡"}, rate: 1826, lag: {}},
	{template: "koumaTemplate", time: {text: "18:37"}, lastStation: {text: "盛岡"}, rate: 1837, lag: {}},
	{template: "koumaTemplate", time: {text: "18:50"}, lastStation: {text: "盛岡 ＊土休日運休"}, rate: 1850, lag: {}},
	{template: "koumaTemplate", time: {text: "19:06"}, lastStation: {text: "盛岡"}, rate: 1906, lag: {}},
	{template: "koumaTemplate", time: {text: "19:46"}, lastStation: {text: "盛岡"}, rate: 1946, lag: {}},
	{template: "koumaTemplate", time: {text: "20:11"}, lastStation: {text: "[花]盛岡"}, rate: 2011, lag: {}},
	{template: "koumaTemplate", time: {text: "20:23"}, lastStation: {text: "盛岡"}, rate: 2023, lag: {}},
	{template: "koumaTemplate", time: {text: "20:57"}, lastStation: {text: "盛岡"}, rate: 2057, lag: {}},
	{template: "koumaTemplate", time: {text: "21:34"}, lastStation: {text: "[花]盛岡"}, rate: 2134, lag: {}},
	{template: "koumaTemplate", time: {text: "21:59"}, lastStation: {text: "盛岡"}, rate: 2159, lag: {}},
	{template: "koumaTemplate", time: {text: "22:24"}, lastStation: {text: "盛岡"}, rate: 2224, lag: {}}
];
$.koumaListSection.setItems(koumaData);

var kawagutiData = [
	{template: "kawagutiTemplate", time: {text: "6:02"}, lastStation: {text: "盛岡"}, rate: 602, lag: {}},
	{template: "kawagutiTemplate", time: {text: "6:35"}, lastStation: {text: "盛岡"}, rate: 635, lag: {}},
	{template: "kawagutiTemplate", time: {text: "7:15"}, lastStation: {text: "盛岡"}, rate: 715, lag: {}},
	{template: "kawagutiTemplate", time: {text: "7:21"}, lastStation: {text: "北上（盛岡経由）"}, rate: 721, lag: {}},
	{template: "kawagutiTemplate", time: {text: "7:28"}, lastStation: {text: "盛岡"}, rate: 728, lag: {}},
	{template: "kawagutiTemplate", time: {text: "8:31"}, lastStation: {text: "盛岡"}, rate: 831, lag: {}},
	{template: "kawagutiTemplate", time: {text: "8:50"}, lastStation: {text: "盛岡"}, rate: 850, lag: {}},
	{template: "kawagutiTemplate", time: {text: "9:29"}, lastStation: {text: "盛岡"}, rate: 929, lag: {}},
	{template: "kawagutiTemplate", time: {text: "9:46"}, lastStation: {text: "盛岡"}, rate: 946, lag: {}},
	{template: "kawagutiTemplate", time: {text: "10:20"}, lastStation: {text: "盛岡"}, rate: 1020, lag: {}},
	{template: "kawagutiTemplate", time: {text: "12:01"}, lastStation: {text: "盛岡"}, rate: 1201, lag: {}},
	{template: "kawagutiTemplate", time: {text: "12:30"}, lastStation: {text: "盛岡"}, rate: 1230, lag: {}},
	{template: "kawagutiTemplate", time: {text: "13:58"}, lastStation: {text: "盛岡"}, rate: 1358, lag: {}},
	{template: "kawagutiTemplate", time: {text: "14:18"}, lastStation: {text: "盛岡"}, rate: 1418, lag: {}},
	{template: "kawagutiTemplate", time: {text: "15:26"}, lastStation: {text: "盛岡"}, rate: 1526, lag: {}},
	{template: "kawagutiTemplate", time: {text: "16:24"}, lastStation: {text: "盛岡"}, rate: 1624, lag: {}},
	{template: "kawagutiTemplate", time: {text: "16:46"}, lastStation: {text: "盛岡"}, rate: 1646, lag: {}},
	{template: "kawagutiTemplate", time: {text: "17:26"}, lastStation: {text: "盛岡"}, rate: 1726, lag: {}},
	{template: "kawagutiTemplate", time: {text: "18:21"}, lastStation: {text: "盛岡"}, rate: 1821, lag: {}},
	{template: "kawagutiTemplate", time: {text: "18:32"}, lastStation: {text: "盛岡"}, rate: 1832, lag: {}},
	{template: "kawagutiTemplate", time: {text: "18:45"}, lastStation: {text: "盛岡 ＊土休日運休"}, rate: 1845, lag: {}},
	{template: "kawagutiTemplate", time: {text: "19:01"}, lastStation: {text: "盛岡"}, rate: 1901, lag: {}},
	{template: "kawagutiTemplate", time: {text: "19:41"}, lastStation: {text: "盛岡"}, rate: 1941, lag: {}},
	{template: "kawagutiTemplate", time: {text: "20:18"}, lastStation: {text: "盛岡"}, rate: 2018, lag: {}},
	{template: "kawagutiTemplate", time: {text: "20:52"}, lastStation: {text: "盛岡"}, rate: 2052, lag: {}},
	{template: "kawagutiTemplate", time: {text: "21:54"}, lastStation: {text: "盛岡"}, rate: 2154, lag: {}},
	{template: "kawagutiTemplate", time: {text: "22:19"}, lastStation: {text: "盛岡"}, rate: 2219, lag: {}}
];
$.kawagutiListSection.setItems(kawagutiData);

var numakunaiData = [
	{template: "numakunaiTemplate", time: {text: "5:57"}, lastStation: {text: "盛岡"}, rate: 557, lag: {}},
	{template: "numakunaiTemplate", time: {text: "6:30"}, lastStation: {text: "盛岡"}, rate: 630, lag: {}},
	{template: "numakunaiTemplate", time: {text: "7:10"}, lastStation: {text: "盛岡"}, rate: 710, lag: {}},
	{template: "numakunaiTemplate", time: {text: "7:16"}, lastStation: {text: "北上（盛岡経由）"}, rate: 716, lag: {}},
	{template: "numakunaiTemplate", time: {text: "7:24"}, lastStation: {text: "盛岡"}, rate: 724, lag: {}},
	{template: "numakunaiTemplate", time: {text: "8:26"}, lastStation: {text: "盛岡"}, rate: 826, lag: {}},
	{template: "numakunaiTemplate", time: {text: "8:45"}, lastStation: {text: "盛岡"}, rate: 845, lag: {}},
	{template: "numakunaiTemplate", time: {text: "9:24"}, lastStation: {text: "盛岡"}, rate: 924, lag: {}},
	{template: "numakunaiTemplate", time: {text: "9:41"}, lastStation: {text: "盛岡"}, rate: 941, lag: {}},
	{template: "numakunaiTemplate", time: {text: "10:15"}, lastStation: {text: "盛岡"}, rate: 1015, lag: {}},
	{template: "numakunaiTemplate", time: {text: "11:56"}, lastStation: {text: "盛岡"}, rate: 1156, lag: {}},
	{template: "numakunaiTemplate", time: {text: "12:26"}, lastStation: {text: "盛岡"}, rate: 1226, lag: {}},
	{template: "numakunaiTemplate", time: {text: "13:54"}, lastStation: {text: "盛岡"}, rate: 1354, lag: {}},
	{template: "numakunaiTemplate", time: {text: "14:13"}, lastStation: {text: "盛岡"}, rate: 1413, lag: {}},
	{template: "numakunaiTemplate", time: {text: "15:21"}, lastStation: {text: "盛岡"}, rate: 1521, lag: {}},
	{template: "numakunaiTemplate", time: {text: "16:20"}, lastStation: {text: "盛岡"}, rate: 1620, lag: {}},
	{template: "numakunaiTemplate", time: {text: "16:41"}, lastStation: {text: "盛岡"}, rate: 1641, lag: {}},
	{template: "numakunaiTemplate", time: {text: "17:21"}, lastStation: {text: "盛岡"}, rate: 1721, lag: {}},
	{template: "numakunaiTemplate", time: {text: "18:16"}, lastStation: {text: "盛岡"}, rate: 1816, lag: {}},
	{template: "numakunaiTemplate", time: {text: "18:28"}, lastStation: {text: "盛岡"}, rate: 1828, lag: {}},
	{template: "numakunaiTemplate", time: {text: "18:40"}, lastStation: {text: "盛岡 ＊土休日運休"}, rate: 1840, lag: {}},
	{template: "numakunaiTemplate", time: {text: "18:57"}, lastStation: {text: "盛岡"}, rate: 1857, lag: {}},
	{template: "numakunaiTemplate", time: {text: "19:36"}, lastStation: {text: "盛岡"}, rate: 1936, lag: {}},
	{template: "numakunaiTemplate", time: {text: "20:14"}, lastStation: {text: "盛岡"}, rate: 2014, lag: {}},
	{template: "numakunaiTemplate", time: {text: "20:47"}, lastStation: {text: "盛岡"}, rate: 2047, lag: {}},
	{template: "numakunaiTemplate", time: {text: "21:49"}, lastStation: {text: "盛岡"}, rate: 2149, lag: {}},
	{template: "numakunaiTemplate", time: {text: "22:15"}, lastStation: {text: "盛岡"}, rate: 2215, lag: {}}
];
$.numakunaiListSection.setItems(numakunaiData);

var midouData = [
	{template: "midouTemplate", time: {text: "7:06"}, lastStation: {text: "盛岡"}, rate: 706, lag: {}},
	{template: "midouTemplate", time: {text: "7:19"}, lastStation: {text: "盛岡"}, rate: 719, lag: {}},
	{template: "midouTemplate", time: {text: "8:22"}, lastStation: {text: "盛岡"}, rate: 822, lag: {}},
	{template: "midouTemplate", time: {text: "9:19"}, lastStation: {text: "盛岡"}, rate: 919, lag: {}},
	{template: "midouTemplate", time: {text: "10:11"}, lastStation: {text: "盛岡"}, rate: 1011, lag: {}},
	{template: "midouTemplate", time: {text: "12:21"}, lastStation: {text: "盛岡"}, rate: 1221, lag: {}},
	{template: "midouTemplate", time: {text: "13:49"}, lastStation: {text: "盛岡"}, rate: 1349, lag: {}},
	{template: "midouTemplate", time: {text: "15:16"}, lastStation: {text: "盛岡"}, rate: 1516, lag: {}},
	{template: "midouTemplate", time: {text: "16:15"}, lastStation: {text: "盛岡"}, rate: 1615, lag: {}},
	{template: "midouTemplate", time: {text: "17:17"}, lastStation: {text: "盛岡"}, rate: 1717, lag: {}},
	{template: "midouTemplate", time: {text: "18:23"}, lastStation: {text: "盛岡"}, rate: 1823, lag: {}},
	{template: "midouTemplate", time: {text: "18:52"}, lastStation: {text: "盛岡"}, rate: 1852, lag: {}},
	{template: "midouTemplate", time: {text: "20:09"}, lastStation: {text: "盛岡"}, rate: 2009, lag: {}},
	{template: "midouTemplate", time: {text: "22:10"}, lastStation: {text: "盛岡"}, rate: 2210, lag: {}}
];
$.midouListSection.setItems(midouData);

var okunakayamaData = [
	{template: "okunakayamaTemplate", time: {text: "6:59"}, lastStation: {text: "盛岡"}, rate: 659, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "7:13"}, lastStation: {text: "盛岡"}, rate: 713, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "8:15"}, lastStation: {text: "盛岡"}, rate: 815, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "9:13"}, lastStation: {text: "盛岡"}, rate: 913, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "10:04"}, lastStation: {text: "盛岡"}, rate: 1004, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "12:15"}, lastStation: {text: "盛岡"}, rate: 1215, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "13:43"}, lastStation: {text: "盛岡"}, rate: 1343, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "15:10"}, lastStation: {text: "盛岡"}, rate: 1510, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "16:09"}, lastStation: {text: "盛岡"}, rate: 1609, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "17:10"}, lastStation: {text: "盛岡"}, rate: 1710, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "18:17"}, lastStation: {text: "盛岡"}, rate: 1817, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "18:46"}, lastStation: {text: "盛岡"}, rate: 1846, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "20:03"}, lastStation: {text: "盛岡"}, rate: 2003, lag: {}},
	{template: "okunakayamaTemplate", time: {text: "22:04"}, lastStation: {text: "盛岡"}, rate: 2204, lag: {}}
];
$.okunakayamaListSection.setItems(okunakayamaData);

var kotunagiData = [
	{template: "kotunagiTemplate", time: {text: "6:52"}, lastStation: {text: "盛岡"}, rate: 652, lag: {}},
	{template: "kotunagiTemplate", time: {text: "7:06"}, lastStation: {text: "盛岡"}, rate: 706, lag: {}},
	{template: "kotunagiTemplate", time: {text: "8:08"}, lastStation: {text: "盛岡"}, rate: 808, lag: {}},
	{template: "kotunagiTemplate", time: {text: "9:06"}, lastStation: {text: "盛岡"}, rate: 906, lag: {}},
	{template: "kotunagiTemplate", time: {text: "9:56"}, lastStation: {text: "盛岡"}, rate: 956, lag: {}},
	{template: "kotunagiTemplate", time: {text: "12:08"}, lastStation: {text: "盛岡"}, rate: 1208, lag: {}},
	{template: "kotunagiTemplate", time: {text: "13:36"}, lastStation: {text: "盛岡"}, rate: 1336, lag: {}},
	{template: "kotunagiTemplate", time: {text: "15:03"}, lastStation: {text: "盛岡"}, rate: 1503, lag: {}},
	{template: "kotunagiTemplate", time: {text: "16:02"}, lastStation: {text: "盛岡"}, rate: 1602, lag: {}},
	{template: "kotunagiTemplate", time: {text: "17:03"}, lastStation: {text: "盛岡"}, rate: 1703, lag: {}},
	{template: "kotunagiTemplate", time: {text: "18:10"}, lastStation: {text: "盛岡"}, rate: 1810, lag: {}},
	{template: "kotunagiTemplate", time: {text: "18:39"}, lastStation: {text: "盛岡"}, rate: 1839, lag: {}},
	{template: "kotunagiTemplate", time: {text: "19:56"}, lastStation: {text: "盛岡"}, rate: 1956, lag: {}},
	{template: "kotunagiTemplate", time: {text: "21:57"}, lastStation: {text: "盛岡"}, rate: 2157, lag: {}}
];
$.kotunagiListSection.setItems(kotunagiData);

var kozuyaData = [
	{template: "kozuyaTemplate", time: {text: "6:45"}, lastStation: {text: "盛岡"}, rate: 645, lag: {}},
	{template: "kozuyaTemplate", time: {text: "6:59"}, lastStation: {text: "盛岡"}, rate: 659, lag: {}},
	{template: "kozuyaTemplate", time: {text: "8:01"}, lastStation: {text: "盛岡"}, rate: 801, lag: {}},
	{template: "kozuyaTemplate", time: {text: "8:59"}, lastStation: {text: "盛岡"}, rate: 859, lag: {}},
	{template: "kozuyaTemplate", time: {text: "9:49"}, lastStation: {text: "盛岡"}, rate: 949, lag: {}},
	{template: "kozuyaTemplate", time: {text: "12:01"}, lastStation: {text: "盛岡"}, rate: 1201, lag: {}},
	{template: "kozuyaTemplate", time: {text: "13:29"}, lastStation: {text: "盛岡"}, rate: 1329, lag: {}},
	{template: "kozuyaTemplate", time: {text: "14:56"}, lastStation: {text: "盛岡"}, rate: 1456, lag: {}},
	{template: "kozuyaTemplate", time: {text: "15:55"}, lastStation: {text: "盛岡"}, rate: 1555, lag: {}},
	{template: "kozuyaTemplate", time: {text: "16:56"}, lastStation: {text: "盛岡"}, rate: 1656, lag: {}},
	{template: "kozuyaTemplate", time: {text: "18:03"}, lastStation: {text: "盛岡"}, rate: 1803, lag: {}},
	{template: "kozuyaTemplate", time: {text: "18:32"}, lastStation: {text: "盛岡"}, rate: 1832, lag: {}},
	{template: "kozuyaTemplate", time: {text: "19:49"}, lastStation: {text: "盛岡"}, rate: 1949, lag: {}},
	{template: "kozuyaTemplate", time: {text: "21:50"}, lastStation: {text: "盛岡"}, rate: 2150, lag: {}}
];
$.kozuyaListSection.setItems(kozuyaData);

var itinoheData = [
	{template: "itinoheTemplate", time: {text: "6:41"}, lastStation: {text: "盛岡"}, rate: 641, lag: {}},
	{template: "itinoheTemplate", time: {text: "6:54"}, lastStation: {text: "盛岡"}, rate: 654, lag: {}},
	{template: "itinoheTemplate", time: {text: "7:57"}, lastStation: {text: "盛岡"}, rate: 757, lag: {}},
	{template: "itinoheTemplate", time: {text: "8:55"}, lastStation: {text: "盛岡"}, rate: 855, lag: {}},
	{template: "itinoheTemplate", time: {text: "9:45"}, lastStation: {text: "盛岡"}, rate: 945, lag: {}},
	{template: "itinoheTemplate", time: {text: "11:56"}, lastStation: {text: "盛岡"}, rate: 1156, lag: {}},
	{template: "itinoheTemplate", time: {text: "13:24"}, lastStation: {text: "盛岡"}, rate: 1324, lag: {}},
	{template: "itinoheTemplate", time: {text: "14:52"}, lastStation: {text: "盛岡"}, rate: 1452, lag: {}},
	{template: "itinoheTemplate", time: {text: "15:50"}, lastStation: {text: "盛岡"}, rate: 1550, lag: {}},
	{template: "itinoheTemplate", time: {text: "16:52"}, lastStation: {text: "盛岡"}, rate: 1652, lag: {}},
	{template: "itinoheTemplate", time: {text: "17:58"}, lastStation: {text: "盛岡"}, rate: 1758, lag: {}},
	{template: "itinoheTemplate", time: {text: "18:27"}, lastStation: {text: "盛岡"}, rate: 1827, lag: {}},
	{template: "itinoheTemplate", time: {text: "19:44"}, lastStation: {text: "盛岡"}, rate: 1944, lag: {}},
	{template: "itinoheTemplate", time: {text: "21:45"}, lastStation: {text: "盛岡"}, rate: 2145, lag: {}}
];
$.itinoheListSection.setItems(itinoheData);

var ninoheData = [
	{template: "ninoheTemplate", time: {text: "6:35"}, lastStation: {text: "盛岡"}, rate: 635, lag: {}},
	{template: "ninoheTemplate", time: {text: "6:49"}, lastStation: {text: "盛岡"}, rate: 649, lag: {}},
	{template: "ninoheTemplate", time: {text: "7:51"}, lastStation: {text: "盛岡"}, rate: 751, lag: {}},
	{template: "ninoheTemplate", time: {text: "8:49"}, lastStation: {text: "盛岡"}, rate: 849, lag: {}},
	{template: "ninoheTemplate", time: {text: "9:39"}, lastStation: {text: "盛岡"}, rate: 939, lag: {}},
	{template: "ninoheTemplate", time: {text: "11:51"}, lastStation: {text: "盛岡"}, rate: 1151, lag: {}},
	{template: "ninoheTemplate", time: {text: "13:19"}, lastStation: {text: "盛岡"}, rate: 1319, lag: {}},
	{template: "ninoheTemplate", time: {text: "14:46"}, lastStation: {text: "盛岡"}, rate: 1446, lag: {}},
	{template: "ninoheTemplate", time: {text: "15:45"}, lastStation: {text: "盛岡"}, rate: 1545, lag: {}},
	{template: "ninoheTemplate", time: {text: "16:46"}, lastStation: {text: "盛岡"}, rate: 1646, lag: {}},
	{template: "ninoheTemplate", time: {text: "17:53"}, lastStation: {text: "盛岡"}, rate: 1753, lag: {}},
	{template: "ninoheTemplate", time: {text: "18:22"}, lastStation: {text: "盛岡"}, rate: 1822, lag: {}},
	{template: "ninoheTemplate", time: {text: "19:39"}, lastStation: {text: "盛岡"}, rate: 1939, lag: {}},
	{template: "ninoheTemplate", time: {text: "21:40"}, lastStation: {text: "盛岡"}, rate: 2140, lag: {}}
];
$.ninoheListSection.setItems(ninoheData);

var tomaiData = [
	{template: "tomaiTemplate", time: {text: "6:32"}, lastStation: {text: "盛岡"}, rate: 632, lag: {}},
	{template: "tomaiTemplate", time: {text: "6:46"}, lastStation: {text: "盛岡"}, rate: 646, lag: {}},
	{template: "tomaiTemplate", time: {text: "7:48"}, lastStation: {text: "盛岡"}, rate: 748, lag: {}},
	{template: "tomaiTemplate", time: {text: "9:28"}, lastStation: {text: "盛岡"}, rate: 928, lag: {}},
	{template: "tomaiTemplate", time: {text: "11:48"}, lastStation: {text: "盛岡"}, rate: 1148, lag: {}},
	{template: "tomaiTemplate", time: {text: "13:16"}, lastStation: {text: "盛岡"}, rate: 1316, lag: {}},
	{template: "tomaiTemplate", time: {text: "14:43"}, lastStation: {text: "盛岡"}, rate: 1443, lag: {}},
	{template: "tomaiTemplate", time: {text: "15:42"}, lastStation: {text: "盛岡"}, rate: 1542, lag: {}},
	{template: "tomaiTemplate", time: {text: "16:43"}, lastStation: {text: "盛岡"}, rate: 1643, lag: {}},
	{template: "tomaiTemplate", time: {text: "17:40"}, lastStation: {text: "二戸"}, rate: 1740, lag: {}},
	{template: "tomaiTemplate", time: {text: "17:50"}, lastStation: {text: "盛岡"}, rate: 1750, lag: {}},
	{template: "tomaiTemplate", time: {text: "18:19"}, lastStation: {text: "盛岡"}, rate: 1819, lag: {}},
	{template: "tomaiTemplate", time: {text: "19:36"}, lastStation: {text: "盛岡"}, rate: 1936, lag: {}},
	{template: "tomaiTemplate", time: {text: "21:37"}, lastStation: {text: "盛岡"}, rate: 2137, lag: {}}
];
$.tomaiListSection.setItems(tomaiData);

var kintaitiData = [
	{template: "kintaitiTemplate", time: {text: "6:28"}, lastStation: {text: "盛岡"}, rate: 628, lag: {}},
	{template: "kintaitiTemplate", time: {text: "6:41"}, lastStation: {text: "盛岡"}, rate: 641, lag: {}},
	{template: "kintaitiTemplate", time: {text: "7:43"}, lastStation: {text: "盛岡"}, rate: 743, lag: {}},
	{template: "kintaitiTemplate", time: {text: "9:23"}, lastStation: {text: "盛岡"}, rate: 923, lag: {}},
	{template: "kintaitiTemplate", time: {text: "11:43"}, lastStation: {text: "盛岡"}, rate: 1143, lag: {}},
	{template: "kintaitiTemplate", time: {text: "13:11"}, lastStation: {text: "盛岡"}, rate: 1311, lag: {}},
	{template: "kintaitiTemplate", time: {text: "14:38"}, lastStation: {text: "盛岡"}, rate: 1438, lag: {}},
	{template: "kintaitiTemplate", time: {text: "15:37"}, lastStation: {text: "盛岡"}, rate: 1537, lag: {}},
	{template: "kintaitiTemplate", time: {text: "16:38"}, lastStation: {text: "盛岡"}, rate: 1638, lag: {}},
	{template: "kintaitiTemplate", time: {text: "17:35"}, lastStation: {text: "盛岡"}, rate: 1735, lag: {}},
	{template: "kintaitiTemplate", time: {text: "18:14"}, lastStation: {text: "盛岡"}, rate: 1814, lag: {}},
	{template: "kintaitiTemplate", time: {text: "19:31"}, lastStation: {text: "盛岡"}, rate: 1931, lag: {}},
	{template: "kintaitiTemplate", time: {text: "21:32"}, lastStation: {text: "盛岡"}, rate: 2132, lag: {}}
];
$.kintaitiListSection.setItems(kintaitiData);

var metokiData = [
	{template: "metokiTemplate", time: {text: "6:37"}, lastStation: {text: "盛岡"}, rate: 637, lag: {}},
	{template: "metokiTemplate", time: {text: "7:39"}, lastStation: {text: "盛岡"}, rate: 739, lag: {}},
	{template: "metokiTemplate", time: {text: "9:19"}, lastStation: {text: "盛岡"}, rate: 919, lag: {}},
	{template: "metokiTemplate", time: {text: "11:39"}, lastStation: {text: "盛岡"}, rate: 1139, lag: {}},
	{template: "metokiTemplate", time: {text: "13:07"}, lastStation: {text: "盛岡"}, rate: 1307, lag: {}},
	{template: "metokiTemplate", time: {text: "14:34"}, lastStation: {text: "盛岡"}, rate: 1434, lag: {}},
	{template: "metokiTemplate", time: {text: "15:33"}, lastStation: {text: "盛岡"}, rate: 1533, lag: {}},
	{template: "metokiTemplate", time: {text: "16:34"}, lastStation: {text: "盛岡"}, rate: 1634, lag: {}},
	{template: "metokiTemplate", time: {text: "17:31"}, lastStation: {text: "二戸"}, rate: 1731, lag: {}},
	{template: "metokiTemplate", time: {text: "18:10"}, lastStation: {text: "盛岡"}, rate: 1810, lag: {}},
	{template: "metokiTemplate", time: {text: "19:27"}, lastStation: {text: "盛岡"}, rate: 1927, lag: {}},
	{template: "metokiTemplate", time: {text: "21:28"}, lastStation: {text: "盛岡"}, rate: 2128, lag: {}}
];
$.metokiListSection.setItems(metokiData);

var allSatationsData = [
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
			getTimeLag(e);
			return;
		}
	}
}

function sectionUpdateItem(e) {
	var listSection = $.scrollableView.views[e].sections[0];
	$.scrollableView.views[e].scrollToItem(0, scrollItemIndex, {animate: true});
	var listItem = listSection.getItemAt(scrollItemIndex);
	listItem.time.color = "#ff0000";
	listSection.updateItemAt(scrollItemIndex, listItem, {animate: true});
}

function getTimeLag(e) {
	var listSection = $.scrollableView.views[e].sections[0];
	var currentHour = Number(hour);
	var currentMinutes = Number(minutes);
	for (var i = scrollItemIndex; i < (scrollItemIndex + 3); i++) {
		if(listSection.getItemAt(i) == null) {
			return;
		}
		var listItem = listSection.getItemAt(i);
		var itemRate = listItem.time.text.split(":");
		var itemHour = Number(itemRate[0]);
		var itemMinutes = Number(itemRate[1]);
		var hourLag = itemHour - currentHour;
		var minutesLag;
		var timeLagLabel;
		if (currentMinutes > itemMinutes) {
			minutesLag = itemMinutes - currentMinutes + 60;
			hourLag--;
		} else {
			minutesLag = itemMinutes - currentMinutes;
		}
		if (hourLag == 0) {
			timeLagLabel = minutesLag + "分";
		} else {
			timeLagLabel = hourLag + "時間" + minutesLag + "分";
		}
		listItem.properties = {
			height: 80
		}
		listItem.time.font = {
			fontSize: 32
		};
		listItem.lastStation.top = 10;
		listItem.lastStation.font = {
			fontSize: 18
		}
		listItem.lag.font = {
			fontSize: 18
		}
		listItem.lag.bottom = 10;
		listItem.lag.text = "発車まであと" + timeLagLabel;
		listSection.updateItemAt(i, listItem, {animate: true});
	}
}

function getTime() {
	date = new Date();
	hour = String(date.getHours());
	if (date.getMinutes() < 10) {
		minutes = "0" + date.getMinutes();
	} else {
		minutes = String(date.getMinutes());
	}
	currentTime = Number(hour + minutes);
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
	$.upWin.close();
}
