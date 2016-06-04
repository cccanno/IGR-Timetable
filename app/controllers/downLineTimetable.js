// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var currentTime, hour, minutes; // 現在時刻を取得して発車時刻の時間差を求める
var scrollItemIndex;

var children = []; // class: stationNameContainerを格納
var scrollPage = 0;
var clickedTab = undefined;
var currentTab;

function getCurrentDate() {
  var date = new Date();
  hour = String(date.getHours());
  if (date.getMinutes() < 10) {
    minutes = "0" + date.getMinutes();
  } else {
    minutes = String(date.getMinutes());
  }
  currentTime = Number(hour + minutes);
};
getCurrentDate();

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
  {template: "moriokaTemplate", time: {text: "5:07"}, lastStation: {text: "[花]大館"}, rate: 507, lag: {}},
  {template: "moriokaTemplate", time: {text: "5:47"}, lastStation: {text: "いわて沼宮内"}, rate: 547, lag: {}},
  {template: "moriokaTemplate", time: {text: "6:10"}, lastStation: {text: "いわて沼宮内"}, rate: 610, lag: {}},
  {template: "moriokaTemplate", time: {text: "6:44"}, lastStation: {text: "八戸"}, rate: 644, lag: {}},
  {template: "moriokaTemplate", time: {text: "6:55"}, lastStation: {text: "[花]大館"}, rate: 655, lag: {}},
  {template: "moriokaTemplate", time: {text: "7:25"}, lastStation: {text: "滝沢"}, rate: 725, lag: {}},
  {template: "moriokaTemplate", time: {text: "7:32"}, lastStation: {text: "二戸"}, rate: 732, lag: {}},
  {template: "moriokaTemplate", time: {text: "7:53"}, lastStation: {text: "いわて沼宮内"}, rate: 753, lag: {}},
  {template: "moriokaTemplate", time: {text: "8:13"}, lastStation: {text: "滝沢"}, rate: 813, lag: {}},
  {template: "moriokaTemplate", time: {text: "8:40"}, lastStation: {text: "いわて沼宮内"}, rate: 840, lag: {}},
  {template: "moriokaTemplate", time: {text: "9:10"}, lastStation: {text: "八戸"}, rate: 910, lag: {}},
  {template: "moriokaTemplate", time: {text: "9:35"}, lastStation: {text: "[花]大館"}, rate: 935, lag: {}},
  {template: "moriokaTemplate", time: {text: "10:20"}, lastStation: {text: "八戸"}, rate: 1020, lag: {}},
  {template: "moriokaTemplate", time: {text: "10:35"}, lastStation: {text: "滝沢"}, rate: 1035, lag: {}},
  {template: "moriokaTemplate", time: {text: "11:05"}, lastStation: {text: "いわて沼宮内"}, rate: 1105, lag: {}},
  {template: "moriokaTemplate", time: {text: "11:19"}, lastStation: {text: "滝沢"}, rate: 1119, lag: {}},
  {template: "moriokaTemplate", time: {text: "11:57"}, lastStation: {text: "八戸"}, rate: 1157, lag: {}},
  {template: "moriokaTemplate", time: {text: "12:40"}, lastStation: {text: "好摩"}, rate: 1240, lag: {}},
  {template: "moriokaTemplate", time: {text: "13:12"}, lastStation: {text: "八戸"}, rate: 1312, lag: {}},
  {template: "moriokaTemplate", time: {text: "13:30"}, lastStation: {text: "いわて沼宮内"}, rate: 1330, lag: {}},
  {template: "moriokaTemplate", time: {text: "13:48"}, lastStation: {text: "[花]大館"}, rate: 1348, lag: {}},
  {template: "moriokaTemplate", time: {text: "14:06"}, lastStation: {text: "八戸"}, rate: 1406, lag: {}},
  {template: "moriokaTemplate", time: {text: "14:42"}, lastStation: {text: "滝沢"}, rate: 1442, lag: {}},
  {template: "moriokaTemplate", time: {text: "15:22"}, lastStation: {text: "八戸"}, rate: 1522, lag: {}},
  {template: "moriokaTemplate", time: {text: "15:49"}, lastStation: {text: "いわて沼宮内"}, rate: 1549, lag: {}},
  {template: "moriokaTemplate", time: {text: "16:06"}, lastStation: {text: "[花]大館"}, rate: 1606, lag: {}},
  {template: "moriokaTemplate", time: {text: "16:22"}, lastStation: {text: "金田一温泉"}, rate: 1622, lag: {}},
  {template: "moriokaTemplate", time: {text: "17:04"}, lastStation: {text: "八戸"}, rate: 1704, lag: {}},
  {template: "moriokaTemplate", time: {text: "17:28"}, lastStation: {text: "いわて沼宮内"}, rate: 1728, lag: {}},
  {template: "moriokaTemplate", time: {text: "17:51"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1751, lag: {}},
  {template: "moriokaTemplate", time: {text: "18:03"}, lastStation: {text: "[花]大館"}, rate: 1803, lag: {}},
  {template: "moriokaTemplate", time: {text: "18:15"}, lastStation: {text: "八戸"}, rate: 1815, lag: {}},
  {template: "moriokaTemplate", time: {text: "18:56"}, lastStation: {text: "いわて沼宮内"}, rate: 1856, lag: {}},
  {template: "moriokaTemplate", time: {text: "19:09"}, lastStation: {text: "八戸"}, rate: 1909, lag: {}},
  {template: "moriokaTemplate", time: {text: "19:20"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1920, lag: {}},
  {template: "moriokaTemplate", time: {text: "19:40"}, lastStation: {text: "いわて沼宮内"}, rate: 1940, lag: {}},
  {template: "moriokaTemplate", time: {text: "20:00"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2000, lag: {}},
  {template: "moriokaTemplate", time: {text: "20:18"}, lastStation: {text: "八戸"}, rate: 2018, lag: {}},
  {template: "moriokaTemplate", time: {text: "20:40"}, lastStation: {text: "[花]荒屋新町"}, rate: 2040, lag: {}},
  {template: "moriokaTemplate", time: {text: "21:10"}, lastStation: {text: "いわて沼宮内"}, rate: 2110, lag: {}},
  {template: "moriokaTemplate", time: {text: "21:44"}, lastStation: {text: "八戸"}, rate: 2144, lag: {}},
  {template: "moriokaTemplate", time: {text: "22:35"}, lastStation: {text: "滝沢"}, rate: 2235, lag: {}},
  {template: "moriokaTemplate", time: {text: "22:57"}, lastStation: {text: "いわて沼宮内"}, rate: 2257, lag: {}},
  {template: "moriokaTemplate", time: {text: "23:20"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2320, lag: {}}
];
$.moriokaListSection.setItems(moriokaData);

var aoyamaData = [
  {template: "aoyamaTemplate", time: {text: "5:11"}, lastStation: {text: "[花]大館"}, rate: 511, lag: {}},
  {template: "aoyamaTemplate", time: {text: "5:51"}, lastStation: {text: "いわて沼宮内"}, rate: 551, lag: {}},
  {template: "aoyamaTemplate", time: {text: "6:14"}, lastStation: {text: "いわて沼宮内"}, rate: 614, lag: {}},
  {template: "aoyamaTemplate", time: {text: "6:48"}, lastStation: {text: "八戸"}, rate: 648, lag: {}},
  {template: "aoyamaTemplate", time: {text: "6:59"}, lastStation: {text: "[花]大館"}, rate: 659, lag: {}},
  {template: "aoyamaTemplate", time: {text: "7:29"}, lastStation: {text: "滝沢"}, rate: 729, lag: {}},
  {template: "aoyamaTemplate", time: {text: "7:36"}, lastStation: {text: "二戸"}, rate: 736, lag: {}},
  {template: "aoyamaTemplate", time: {text: "7:57"}, lastStation: {text: "いわて沼宮内"}, rate: 757, lag: {}},
  {template: "aoyamaTemplate", time: {text: "8:17"}, lastStation: {text: "滝沢"}, rate: 817, lag: {}},
  {template: "aoyamaTemplate", time: {text: "8:44"}, lastStation: {text: "いわて沼宮内"}, rate: 844, lag: {}},
  {template: "aoyamaTemplate", time: {text: "9:14"}, lastStation: {text: "八戸"}, rate: 914, lag: {}},
  {template: "aoyamaTemplate", time: {text: "9:39"}, lastStation: {text: "[花]大館"}, rate: 939, lag: {}},
  {template: "aoyamaTemplate", time: {text: "10:24"}, lastStation: {text: "八戸"}, rate: 1024, lag: {}},
  {template: "aoyamaTemplate", time: {text: "10:39"}, lastStation: {text: "滝沢"}, rate: 1039, lag: {}},
  {template: "aoyamaTemplate", time: {text: "11:09"}, lastStation: {text: "いわて沼宮内"}, rate: 1109, lag: {}},
  {template: "aoyamaTemplate", time: {text: "11:23"}, lastStation: {text: "滝沢"}, rate: 1123, lag: {}},
  {template: "aoyamaTemplate", time: {text: "12:01"}, lastStation: {text: "八戸"}, rate: 1201, lag: {}},
  {template: "aoyamaTemplate", time: {text: "12:44"}, lastStation: {text: "好摩"}, rate: 1244, lag: {}},
  {template: "aoyamaTemplate", time: {text: "13:16"}, lastStation: {text: "八戸"}, rate: 1316, lag: {}},
  {template: "aoyamaTemplate", time: {text: "13:34"}, lastStation: {text: "いわて沼宮内"}, rate: 1334, lag: {}},
  {template: "aoyamaTemplate", time: {text: "13:52"}, lastStation: {text: "[花]大館"}, rate: 1352, lag: {}},
  {template: "aoyamaTemplate", time: {text: "14:10"}, lastStation: {text: "八戸"}, rate: 1410, lag: {}},
  {template: "aoyamaTemplate", time: {text: "14:46"}, lastStation: {text: "滝沢"}, rate: 1446, lag: {}},
  {template: "aoyamaTemplate", time: {text: "15:26"}, lastStation: {text: "八戸"}, rate: 1526, lag: {}},
  {template: "aoyamaTemplate", time: {text: "15:53"}, lastStation: {text: "いわて沼宮内"}, rate: 1553, lag: {}},
  {template: "aoyamaTemplate", time: {text: "16:10"}, lastStation: {text: "[花]大館"}, rate: 1610, lag: {}},
  {template: "aoyamaTemplate", time: {text: "16:26"}, lastStation: {text: "金田一温泉"}, rate: 1626, lag: {}},
  {template: "aoyamaTemplate", time: {text: "17:08"}, lastStation: {text: "八戸"}, rate: 1708, lag: {}},
  {template: "aoyamaTemplate", time: {text: "17:32"}, lastStation: {text: "いわて沼宮内"}, rate: 1732, lag: {}},
  {template: "aoyamaTemplate", time: {text: "17:55"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1755, lag: {}},
  {template: "aoyamaTemplate", time: {text: "18:07"}, lastStation: {text: "[花]大館"}, rate: 1807, lag: {}},
  {template: "aoyamaTemplate", time: {text: "18:19"}, lastStation: {text: "八戸"}, rate: 1819, lag: {}},
  {template: "aoyamaTemplate", time: {text: "19:00"}, lastStation: {text: "いわて沼宮内"}, rate: 1900, lag: {}},
  {template: "aoyamaTemplate", time: {text: "19:13"}, lastStation: {text: "八戸"}, rate: 1913, lag: {}},
  {template: "aoyamaTemplate", time: {text: "19:24"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1924, lag: {}},
  {template: "aoyamaTemplate", time: {text: "19:44"}, lastStation: {text: "いわて沼宮内"}, rate: 1944, lag: {}},
  {template: "aoyamaTemplate", time: {text: "20:04"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2004, lag: {}},
  {template: "aoyamaTemplate", time: {text: "20:22"}, lastStation: {text: "八戸"}, rate: 2022, lag: {}},
  {template: "aoyamaTemplate", time: {text: "20:44"}, lastStation: {text: "[花]荒屋新町"}, rate: 2044, lag: {}},
  {template: "aoyamaTemplate", time: {text: "21:14"}, lastStation: {text: "いわて沼宮内"}, rate: 2114, lag: {}},
  {template: "aoyamaTemplate", time: {text: "21:49"}, lastStation: {text: "八戸"}, rate: 2149, lag: {}},
  {template: "aoyamaTemplate", time: {text: "22:39"}, lastStation: {text: "滝沢"}, rate: 2239, lag: {}},
  {template: "aoyamaTemplate", time: {text: "23:01"}, lastStation: {text: "いわて沼宮内"}, rate: 2301, lag: {}},
  {template: "aoyamaTemplate", time: {text: "23:24"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2324, lag: {}}
];
$.aoyamaListSection.setItems(aoyamaData);

var kuriyagawaData = [
  {template: "kuriyagawaTemplate", time: {text: "5:14"}, lastStation: {text: "[花]大館"}, rate: 514, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "5:54"}, lastStation: {text: "いわて沼宮内"}, rate: 554, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "6:18"}, lastStation: {text: "いわて沼宮内"}, rate: 618, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "6:52"}, lastStation: {text: "八戸"}, rate: 652, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "7:03"}, lastStation: {text: "[花]大館"}, rate: 703, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "7:32"}, lastStation: {text: "滝沢"}, rate: 732, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "7:39"}, lastStation: {text: "二戸"}, rate: 739, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "8:00"}, lastStation: {text: "いわて沼宮内"}, rate: 800, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "8:20"}, lastStation: {text: "滝沢"}, rate: 820, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "8:47"}, lastStation: {text: "いわて沼宮内"}, rate: 847, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "9:17"}, lastStation: {text: "八戸"}, rate: 917, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "9:42"}, lastStation: {text: "[花]大館"}, rate: 942, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "10:27"}, lastStation: {text: "八戸"}, rate: 1027, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "10:42"}, lastStation: {text: "滝沢"}, rate: 1042, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "11:12"}, lastStation: {text: "いわて沼宮内"}, rate: 1112, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "11:26"}, lastStation: {text: "滝沢"}, rate: 1126, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "12:04"}, lastStation: {text: "八戸"}, rate: 1204, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "12:47"}, lastStation: {text: "好摩"}, rate: 1247, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "13:19"}, lastStation: {text: "八戸"}, rate: 1319, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "13:37"}, lastStation: {text: "いわて沼宮内"}, rate: 1337, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "13:55"}, lastStation: {text: "[花]大館"}, rate: 1355, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "14:13"}, lastStation: {text: "八戸"}, rate: 1413, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "14:49"}, lastStation: {text: "滝沢"}, rate: 1449, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "15:29"}, lastStation: {text: "八戸"}, rate: 1529, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "15:56"}, lastStation: {text: "いわて沼宮内"}, rate: 1556, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "16:13"}, lastStation: {text: "[花]大館"}, rate: 1613, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "16:29"}, lastStation: {text: "金田一温泉"}, rate: 1629, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "17:11"}, lastStation: {text: "八戸"}, rate: 1711, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "17:35"}, lastStation: {text: "いわて沼宮内"}, rate: 1735, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "17:58"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1758, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "18:11"}, lastStation: {text: "[花]大館"}, rate: 1811, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "18:22"}, lastStation: {text: "八戸"}, rate: 1822, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "19:04"}, lastStation: {text: "いわて沼宮内"}, rate: 1904, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "19:16"}, lastStation: {text: "八戸"}, rate: 1916, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "19:28"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1928, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "19:47"}, lastStation: {text: "いわて沼宮内"}, rate: 1947, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "20:08"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2008, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "20:26"}, lastStation: {text: "八戸"}, rate: 2026, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "20:48"}, lastStation: {text: "[花]荒屋新町"}, rate: 2048, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "21:17"}, lastStation: {text: "いわて沼宮内"}, rate: 2117, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "21:53"}, lastStation: {text: "八戸"}, rate: 2153, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "22:42"}, lastStation: {text: "滝沢"}, rate: 2242, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "23:04"}, lastStation: {text: "いわて沼宮内"}, rate: 2304, lag: {}},
  {template: "kuriyagawaTemplate", time: {text: "23:27"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2327, lag: {}}
];
$.kuriyagawaListSection.setItems(kuriyagawaData);

var sugoData = [
  {template: "sugoTemplate", time: {text: "5:19"}, lastStation: {text: "[花]大館"}, rate: 519, lag: {}},
  {template: "sugoTemplate", time: {text: "5:59"}, lastStation: {text: "いわて沼宮内"}, rate: 559, lag: {}},
  {template: "sugoTemplate", time: {text: "6:22"}, lastStation: {text: "いわて沼宮内"}, rate: 622, lag: {}},
  {template: "sugoTemplate", time: {text: "6:56"}, lastStation: {text: "八戸"}, rate: 656, lag: {}},
  {template: "sugoTemplate", time: {text: "7:08"}, lastStation: {text: "[花]大館"}, rate: 708, lag: {}},
  {template: "sugoTemplate", time: {text: "7:37"}, lastStation: {text: "滝沢"}, rate: 737, lag: {}},
  {template: "sugoTemplate", time: {text: "7:44"}, lastStation: {text: "二戸"}, rate: 744, lag: {}},
  {template: "sugoTemplate", time: {text: "8:05"}, lastStation: {text: "いわて沼宮内"}, rate: 805, lag: {}},
  {template: "sugoTemplate", time: {text: "8:25"}, lastStation: {text: "滝沢"}, rate: 825, lag: {}},
  {template: "sugoTemplate", time: {text: "8:52"}, lastStation: {text: "いわて沼宮内"}, rate: 852, lag: {}},
  {template: "sugoTemplate", time: {text: "9:22"}, lastStation: {text: "八戸"}, rate: 922, lag: {}},
  {template: "sugoTemplate", time: {text: "9:47"}, lastStation: {text: "[花]大館"}, rate: 947, lag: {}},
  {template: "sugoTemplate", time: {text: "10:32"}, lastStation: {text: "八戸"}, rate: 1032, lag: {}},
  {template: "sugoTemplate", time: {text: "10:47"}, lastStation: {text: "滝沢"}, rate: 1047, lag: {}},
  {template: "sugoTemplate", time: {text: "11:17"}, lastStation: {text: "いわて沼宮内"}, rate: 1117, lag: {}},
  {template: "sugoTemplate", time: {text: "11:31"}, lastStation: {text: "滝沢"}, rate: 1131, lag: {}},
  {template: "sugoTemplate", time: {text: "12:09"}, lastStation: {text: "八戸"}, rate: 1209, lag: {}},
  {template: "sugoTemplate", time: {text: "12:52"}, lastStation: {text: "好摩"}, rate: 1252, lag: {}},
  {template: "sugoTemplate", time: {text: "13:24"}, lastStation: {text: "八戸"}, rate: 1324, lag: {}},
  {template: "sugoTemplate", time: {text: "13:42"}, lastStation: {text: "いわて沼宮内"}, rate: 1342, lag: {}},
  {template: "sugoTemplate", time: {text: "14:00"}, lastStation: {text: "[花]大館"}, rate: 1400, lag: {}},
  {template: "sugoTemplate", time: {text: "14:18"}, lastStation: {text: "八戸"}, rate: 1418, lag: {}},
  {template: "sugoTemplate", time: {text: "14:54"}, lastStation: {text: "滝沢"}, rate: 1454, lag: {}},
  {template: "sugoTemplate", time: {text: "15:34"}, lastStation: {text: "八戸"}, rate: 1534, lag: {}},
  {template: "sugoTemplate", time: {text: "16:01"}, lastStation: {text: "いわて沼宮内"}, rate: 1601, lag: {}},
  {template: "sugoTemplate", time: {text: "16:18"}, lastStation: {text: "[花]大館"}, rate: 1618, lag: {}},
  {template: "sugoTemplate", time: {text: "16:34"}, lastStation: {text: "金田一温泉"}, rate: 1634, lag: {}},
  {template: "sugoTemplate", time: {text: "17:16"}, lastStation: {text: "八戸"}, rate: 1716, lag: {}},
  {template: "sugoTemplate", time: {text: "17:40"}, lastStation: {text: "いわて沼宮内"}, rate: 1740, lag: {}},
  {template: "sugoTemplate", time: {text: "18:03"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1603, lag: {}},
  {template: "sugoTemplate", time: {text: "18:16"}, lastStation: {text: "[花]大館"}, rate: 1816, lag: {}},
  {template: "sugoTemplate", time: {text: "18:27"}, lastStation: {text: "八戸"}, rate: 1827, lag: {}},
  {template: "sugoTemplate", time: {text: "19:08"}, lastStation: {text: "いわて沼宮内"}, rate: 1908, lag: {}},
  {template: "sugoTemplate", time: {text: "19:21"}, lastStation: {text: "八戸"}, rate: 1921, lag: {}},
  {template: "sugoTemplate", time: {text: "19:33"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1933, lag: {}},
  {template: "sugoTemplate", time: {text: "19:52"}, lastStation: {text: "いわて沼宮内"}, rate: 1952, lag: {}},
  {template: "sugoTemplate", time: {text: "20:13"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2013, lag: {}},
  {template: "sugoTemplate", time: {text: "20:30"}, lastStation: {text: "八戸"}, rate: 2030, lag: {}},
  {template: "sugoTemplate", time: {text: "20:53"}, lastStation: {text: "[花]荒屋新町"}, rate: 2053, lag: {}},
  {template: "sugoTemplate", time: {text: "21:22"}, lastStation: {text: "いわて沼宮内"}, rate: 2122, lag: {}},
  {template: "sugoTemplate", time: {text: "21:57"}, lastStation: {text: "八戸"}, rate: 2157, lag: {}},
  {template: "sugoTemplate", time: {text: "22:47"}, lastStation: {text: "滝沢"}, rate: 2247, lag: {}},
  {template: "sugoTemplate", time: {text: "23:09"}, lastStation: {text: "いわて沼宮内"}, rate: 2309, lag: {}},
  {template: "sugoTemplate", time: {text: "23:32"}, lastStation: {text: "滝沢 ＊土休日運休"}, rate: 2332, lag: {}}
];
$.sugoListSection.setItems(sugoData);

var takizawaData = [
  {template: "takizawaTemplate", time: {text: "5:22"}, lastStation: {text: "[花]大館"}, rate: 522, lag: {}},
  {template: "takizawaTemplate", time: {text: "6:02"}, lastStation: {text: "いわて沼宮内"}, rate: 602, lag: {}},
  {template: "takizawaTemplate", time: {text: "6:25"}, lastStation: {text: "いわて沼宮内"}, rate: 625, lag: {}},
  {template: "takizawaTemplate", time: {text: "6:59"}, lastStation: {text: "八戸"}, rate: 659, lag: {}},
  {template: "takizawaTemplate", time: {text: "7:12"}, lastStation: {text: "[花]大館"}, rate: 712, lag: {}},
  {template: "takizawaTemplate", time: {text: "7:47"}, lastStation: {text: "二戸"}, rate: 747, lag: {}},
  {template: "takizawaTemplate", time: {text: "8:08"}, lastStation: {text: "いわて沼宮内"}, rate: 808, lag: {}},
  {template: "takizawaTemplate", time: {text: "8:55"}, lastStation: {text: "いわて沼宮内"}, rate: 855, lag: {}},
  {template: "takizawaTemplate", time: {text: "9:25"}, lastStation: {text: "八戸"}, rate: 925, lag: {}},
  {template: "takizawaTemplate", time: {text: "9:50"}, lastStation: {text: "[花]大館"}, rate: 950, lag: {}},
  {template: "takizawaTemplate", time: {text: "10:35"}, lastStation: {text: "八戸"}, rate: 1035, lag: {}},
  {template: "takizawaTemplate", time: {text: "11:20"}, lastStation: {text: "いわて沼宮内"}, rate: 1120, lag: {}},
  {template: "takizawaTemplate", time: {text: "12:12"}, lastStation: {text: "八戸"}, rate: 1212, lag: {}},
  {template: "takizawaTemplate", time: {text: "12:55"}, lastStation: {text: "好摩"}, rate: 1255, lag: {}},
  {template: "takizawaTemplate", time: {text: "13:27"}, lastStation: {text: "八戸"}, rate: 1327, lag: {}},
  {template: "takizawaTemplate", time: {text: "13:45"}, lastStation: {text: "いわて沼宮内"}, rate: 1345, lag: {}},
  {template: "takizawaTemplate", time: {text: "14:03"}, lastStation: {text: "[花]大館"}, rate: 1403, lag: {}},
  {template: "takizawaTemplate", time: {text: "14:21"}, lastStation: {text: "八戸"}, rate: 1421, lag: {}},
  {template: "takizawaTemplate", time: {text: "15:37"}, lastStation: {text: "八戸"}, rate: 1537, lag: {}},
  {template: "takizawaTemplate", time: {text: "16:04"}, lastStation: {text: "いわて沼宮内"}, rate: 1604, lag: {}},
  {template: "takizawaTemplate", time: {text: "16:21"}, lastStation: {text: "[花]大館"}, rate: 1621, lag: {}},
  {template: "takizawaTemplate", time: {text: "16:37"}, lastStation: {text: "金田一温泉"}, rate: 1637, lag: {}},
  {template: "takizawaTemplate", time: {text: "17:19"}, lastStation: {text: "八戸"}, rate: 1719, lag: {}},
  {template: "takizawaTemplate", time: {text: "17:43"}, lastStation: {text: "いわて沼宮内"}, rate: 1743, lag: {}},
  {template: "takizawaTemplate", time: {text: "18:07"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1807, lag: {}},
  {template: "takizawaTemplate", time: {text: "18:19"}, lastStation: {text: "[花]大館"}, rate: 1819, lag: {}},
  {template: "takizawaTemplate", time: {text: "18:30"}, lastStation: {text: "八戸"}, rate: 1830, lag: {}},
  {template: "takizawaTemplate", time: {text: "19:11"}, lastStation: {text: "いわて沼宮内"}, rate: 1911, lag: {}},
  {template: "takizawaTemplate", time: {text: "19:24"}, lastStation: {text: "八戸"}, rate: 1924, lag: {}},
  {template: "takizawaTemplate", time: {text: "19:36"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1936, lag: {}},
  {template: "takizawaTemplate", time: {text: "19:55"}, lastStation: {text: "いわて沼宮内"}, rate: 1955, lag: {}},
  {template: "takizawaTemplate", time: {text: "20:34"}, lastStation: {text: "八戸"}, rate: 2034, lag: {}},
  {template: "takizawaTemplate", time: {text: "20:56"}, lastStation: {text: "[花]荒屋新町"}, rate: 2056, lag: {}},
  {template: "takizawaTemplate", time: {text: "21:25"}, lastStation: {text: "いわて沼宮内"}, rate: 2125, lag: {}},
  {template: "takizawaTemplate", time: {text: "22:01"}, lastStation: {text: "八戸"}, rate: 2201, lag: {}},
  {template: "takizawaTemplate", time: {text: "23:12"}, lastStation: {text: "いわて沼宮内"}, rate: 2312, lag: {}}
];
$.takizawaListSection.setItems(takizawaData);

var sibutamiData = [
  {template: "sibutamiTemplate", time: {text: "5:27"}, lastStation: {text: "[花]大館"}, rate: 527, lag: {}},
  {template: "sibutamiTemplate", time: {text: "6:06"}, lastStation: {text: "いわて沼宮内"}, rate: 606, lag: {}},
  {template: "sibutamiTemplate", time: {text: "6:30"}, lastStation: {text: "いわて沼宮内"}, rate: 630, lag: {}},
  {template: "sibutamiTemplate", time: {text: "7:04"}, lastStation: {text: "八戸"}, rate: 704, lag: {}},
  {template: "sibutamiTemplate", time: {text: "7:17"}, lastStation: {text: "[花]大館"}, rate: 717, lag: {}},
  {template: "sibutamiTemplate", time: {text: "7:51"}, lastStation: {text: "二戸"}, rate: 751, lag: {}},
  {template: "sibutamiTemplate", time: {text: "8:12"}, lastStation: {text: "いわて沼宮内"}, rate: 812, lag: {}},
  {template: "sibutamiTemplate", time: {text: "8:59"}, lastStation: {text: "いわて沼宮内"}, rate: 859, lag: {}},
  {template: "sibutamiTemplate", time: {text: "9:29"}, lastStation: {text: "八戸"}, rate: 929, lag: {}},
  {template: "sibutamiTemplate", time: {text: "9:55"}, lastStation: {text: "[花]大館"}, rate: 955, lag: {}},
  {template: "sibutamiTemplate", time: {text: "10:39"}, lastStation: {text: "八戸"}, rate: 1039, lag: {}},
  {template: "sibutamiTemplate", time: {text: "11:24"}, lastStation: {text: "いわて沼宮内"}, rate: 1124, lag: {}},
  {template: "sibutamiTemplate", time: {text: "12:16"}, lastStation: {text: "八戸"}, rate: 1216, lag: {}},
  {template: "sibutamiTemplate", time: {text: "12:59"}, lastStation: {text: "好摩"}, rate: 1259, lag: {}},
  {template: "sibutamiTemplate", time: {text: "13:31"}, lastStation: {text: "八戸"}, rate: 1331, lag: {}},
  {template: "sibutamiTemplate", time: {text: "13:49"}, lastStation: {text: "いわて沼宮内"}, rate: 1349, lag: {}},
  {template: "sibutamiTemplate", time: {text: "14:08"}, lastStation: {text: "[花]大館"}, rate: 1408, lag: {}},
  {template: "sibutamiTemplate", time: {text: "14:25"}, lastStation: {text: "八戸"}, rate: 1425, lag: {}},
  {template: "sibutamiTemplate", time: {text: "15:41"}, lastStation: {text: "八戸"}, rate: 1541, lag: {}},
  {template: "sibutamiTemplate", time: {text: "16:08"}, lastStation: {text: "いわて沼宮内"}, rate: 1608, lag: {}},
  {template: "sibutamiTemplate", time: {text: "16:26"}, lastStation: {text: "[花]大館"}, rate: 1626, lag: {}},
  {template: "sibutamiTemplate", time: {text: "16:41"}, lastStation: {text: "金田一温泉"}, rate: 1641, lag: {}},
  {template: "sibutamiTemplate", time: {text: "17:23"}, lastStation: {text: "八戸"}, rate: 1723, lag: {}},
  {template: "sibutamiTemplate", time: {text: "17:47"}, lastStation: {text: "いわて沼宮内"}, rate: 1747, lag: {}},
  {template: "sibutamiTemplate", time: {text: "18:11"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1811, lag: {}},
  {template: "sibutamiTemplate", time: {text: "18:24"}, lastStation: {text: "[花]大館"}, rate: 1824, lag: {}},
  {template: "sibutamiTemplate", time: {text: "18:35"}, lastStation: {text: "八戸"}, rate: 1835, lag: {}},
  {template: "sibutamiTemplate", time: {text: "19:15"}, lastStation: {text: "いわて沼宮内"}, rate: 1915, lag: {}},
  {template: "sibutamiTemplate", time: {text: "19:28"}, lastStation: {text: "八戸"}, rate: 1928, lag: {}},
  {template: "sibutamiTemplate", time: {text: "19:41"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1941, lag: {}},
  {template: "sibutamiTemplate", time: {text: "19:59"}, lastStation: {text: "いわて沼宮内"}, rate: 1959, lag: {}},
  {template: "sibutamiTemplate", time: {text: "20:38"}, lastStation: {text: "八戸"}, rate: 2038, lag: {}},
  {template: "sibutamiTemplate", time: {text: "21:02"}, lastStation: {text: "[花]荒屋新町"}, rate: 2102, lag: {}},
  {template: "sibutamiTemplate", time: {text: "21:29"}, lastStation: {text: "いわて沼宮内"}, rate: 2129, lag: {}},
  {template: "sibutamiTemplate", time: {text: "22:05"}, lastStation: {text: "八戸"}, rate: 2205, lag: {}},
  {template: "sibutamiTemplate", time: {text: "23:16"}, lastStation: {text: "いわて沼宮内"}, rate: 2316, lag: {}}
];
$.sibutamiListSection.setItems(sibutamiData);

var koumaData = [
  {template: "koumaTemplate", time: {text: "5:32"}, lastStation: {text: "[花]大館"}, rate: 532, lag: {}},
  {template: "koumaTemplate", time: {text: "6:10"}, lastStation: {text: "いわて沼宮内"}, rate: 610, lag: {}},
  {template: "koumaTemplate", time: {text: "6:34"}, lastStation: {text: "いわて沼宮内"}, rate: 634, lag: {}},
  {template: "koumaTemplate", time: {text: "7:08"}, lastStation: {text: "八戸"}, rate: 708, lag: {}},
  {template: "koumaTemplate", time: {text: "7:24"}, lastStation: {text: "[花]大館"}, rate: 724, lag: {}},
  {template: "koumaTemplate", time: {text: "7:55"}, lastStation: {text: "二戸"}, rate: 755, lag: {}},
  {template: "koumaTemplate", time: {text: "8:17"}, lastStation: {text: "いわて沼宮内"}, rate: 817, lag: {}},
  {template: "koumaTemplate", time: {text: "9:03"}, lastStation: {text: "いわて沼宮内"}, rate: 903, lag: {}},
  {template: "koumaTemplate", time: {text: "9:33"}, lastStation: {text: "八戸"}, rate: 933, lag: {}},
  {template: "koumaTemplate", time: {text: "10:00"}, lastStation: {text: "[花]大館"}, rate: 1000, lag: {}},
  {template: "koumaTemplate", time: {text: "10:43"}, lastStation: {text: "八戸"}, rate: 1043, lag: {}},
  {template: "koumaTemplate", time: {text: "11:28"}, lastStation: {text: "いわて沼宮内"}, rate: 1128, lag: {}},
  {template: "koumaTemplate", time: {text: "12:21"}, lastStation: {text: "八戸"}, rate: 1221, lag: {}},
  {template: "koumaTemplate", time: {text: "13:36"}, lastStation: {text: "八戸"}, rate: 1336, lag: {}},
  {template: "koumaTemplate", time: {text: "13:53"}, lastStation: {text: "いわて沼宮内"}, rate: 1353, lag: {}},
  {template: "koumaTemplate", time: {text: "14:14"}, lastStation: {text: "[花]大館"}, rate: 1414, lag: {}},
  {template: "koumaTemplate", time: {text: "14:30"}, lastStation: {text: "八戸"}, rate: 1430, lag: {}},
  {template: "koumaTemplate", time: {text: "15:46"}, lastStation: {text: "八戸"}, rate: 1546, lag: {}},
  {template: "koumaTemplate", time: {text: "16:12"}, lastStation: {text: "いわて沼宮内"}, rate: 1612, lag: {}},
  {template: "koumaTemplate", time: {text: "16:31"}, lastStation: {text: "[花]大館"}, rate: 1631, lag: {}},
  {template: "koumaTemplate", time: {text: "16:45"}, lastStation: {text: "金田一温泉"}, rate: 1645, lag: {}},
  {template: "koumaTemplate", time: {text: "17:27"}, lastStation: {text: "八戸"}, rate: 1727, lag: {}},
  {template: "koumaTemplate", time: {text: "17:51"}, lastStation: {text: "いわて沼宮内"}, rate: 1751, lag: {}},
  {template: "koumaTemplate", time: {text: "18:16"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1816, lag: {}},
  {template: "koumaTemplate", time: {text: "18:30"}, lastStation: {text: "[花]大館"}, rate: 1830, lag: {}},
  {template: "koumaTemplate", time: {text: "18:39"}, lastStation: {text: "八戸"}, rate: 1839, lag: {}},
  {template: "koumaTemplate", time: {text: "19:20"}, lastStation: {text: "いわて沼宮内"}, rate: 1920, lag: {}},
  {template: "koumaTemplate", time: {text: "19:32"}, lastStation: {text: "八戸"}, rate: 1932, lag: {}},
  {template: "koumaTemplate", time: {text: "19:47"}, lastStation: {text: "[花]鹿角花輪"}, rate: 1947, lag: {}},
  {template: "koumaTemplate", time: {text: "20:03"}, lastStation: {text: "いわて沼宮内"}, rate: 2003, lag: {}},
  {template: "koumaTemplate", time: {text: "20:43"}, lastStation: {text: "八戸"}, rate: 2043, lag: {}},
  {template: "koumaTemplate", time: {text: "21:07"}, lastStation: {text: "[花]荒屋新町"}, rate: 2107, lag: {}},
  {template: "koumaTemplate", time: {text: "21:33"}, lastStation: {text: "いわて沼宮内"}, rate: 2133, lag: {}},
  {template: "koumaTemplate", time: {text: "22:10"}, lastStation: {text: "八戸"}, rate: 2210, lag: {}},
  {template: "koumaTemplate", time: {text: "23:21"}, lastStation: {text: "いわて沼宮内"}, rate: 2321, lag: {}}
];
$.koumaListSection.setItems(koumaData);

var kawagutiData = [
  {template: "kawagutiTemplate", time: {text: "6:15"}, lastStation: {text: "いわて沼宮内"}, rate: 615, lag: {}},
  {template: "kawagutiTemplate", time: {text: "6:39"}, lastStation: {text: "いわて沼宮内"}, rate: 639, lag: {}},
  {template: "kawagutiTemplate", time: {text: "7:13"}, lastStation: {text: "八戸"}, rate: 713, lag: {}},
  {template: "kawagutiTemplate", time: {text: "8:00"}, lastStation: {text: "二戸"}, rate: 800, lag: {}},
  {template: "kawagutiTemplate", time: {text: "8:22"}, lastStation: {text: "いわて沼宮内"}, rate: 822, lag: {}},
  {template: "kawagutiTemplate", time: {text: "9:08"}, lastStation: {text: "いわて沼宮内"}, rate: 908, lag: {}},
  {template: "kawagutiTemplate", time: {text: "9:38"}, lastStation: {text: "八戸"}, rate: 938, lag: {}},
  {template: "kawagutiTemplate", time: {text: "10:48"}, lastStation: {text: "八戸"}, rate: 1048, lag: {}},
  {template: "kawagutiTemplate", time: {text: "11:33"}, lastStation: {text: "いわて沼宮内"}, rate: 1133, lag: {}},
  {template: "kawagutiTemplate", time: {text: "12:26"}, lastStation: {text: "八戸"}, rate: 1226, lag: {}},
  {template: "kawagutiTemplate", time: {text: "13:41"}, lastStation: {text: "八戸"}, rate: 1341, lag: {}},
  {template: "kawagutiTemplate", time: {text: "13:58"}, lastStation: {text: "いわて沼宮内"}, rate: 1358, lag: {}},
  {template: "kawagutiTemplate", time: {text: "14:35"}, lastStation: {text: "八戸"}, rate: 1435, lag: {}},
  {template: "kawagutiTemplate", time: {text: "15:51"}, lastStation: {text: "八戸"}, rate: 1551, lag: {}},
  {template: "kawagutiTemplate", time: {text: "16:17"}, lastStation: {text: "いわて沼宮内"}, rate: 1617, lag: {}},
  {template: "kawagutiTemplate", time: {text: "16:50"}, lastStation: {text: "金田一温泉"}, rate: 1650, lag: {}},
  {template: "kawagutiTemplate", time: {text: "17:32"}, lastStation: {text: "八戸"}, rate: 1732, lag: {}},
  {template: "kawagutiTemplate", time: {text: "17:56"}, lastStation: {text: "いわて沼宮内"}, rate: 1756, lag: {}},
  {template: "kawagutiTemplate", time: {text: "18:21"}, lastStation: {text: "いわて沼宮内 ＊土休日運休"}, rate: 1821, lag: {}},
  {template: "kawagutiTemplate", time: {text: "18:44"}, lastStation: {text: "八戸"}, rate: 1844, lag: {}},
  {template: "kawagutiTemplate", time: {text: "19:25"}, lastStation: {text: "いわて沼宮内"}, rate: 1925, lag: {}},
  {template: "kawagutiTemplate", time: {text: "19:37"}, lastStation: {text: "八戸"}, rate: 1937, lag: {}},
  {template: "kawagutiTemplate", time: {text: "20:08"}, lastStation: {text: "いわて沼宮内"}, rate: 2008, lag: {}},
  {template: "kawagutiTemplate", time: {text: "20:48"}, lastStation: {text: "八戸"}, rate: 2048, lag: {}},
  {template: "kawagutiTemplate", time: {text: "21:38"}, lastStation: {text: "いわて沼宮内"}, rate: 2138, lag: {}},
  {template: "kawagutiTemplate", time: {text: "22:15"}, lastStation: {text: "八戸"}, rate: 2215, lag: {}},
  {template: "kawagutiTemplate", time: {text: "23:26"}, lastStation: {text: "いわて沼宮内"}, rate: 2326, lag: {}}
];
$.kawagutiListSection.setItems(kawagutiData);

var numakunaiData = [
  {template: "numakunaiTemplate", time: {text: "7:18"}, lastStation: {text: "八戸"}, rate: 718, lag: {}},
  {template: "numakunaiTemplate", time: {text: "8:05"}, lastStation: {text: "二戸"}, rate: 805, lag: {}},
  {template: "numakunaiTemplate", time: {text: "9:43"}, lastStation: {text: "八戸"}, rate: 943, lag: {}},
  {template: "numakunaiTemplate", time: {text: "10:53"}, lastStation: {text: "八戸"}, rate: 1053, lag: {}},
  {template: "numakunaiTemplate", time: {text: "12:30"}, lastStation: {text: "八戸"}, rate: 1230, lag: {}},
  {template: "numakunaiTemplate", time: {text: "13:45"}, lastStation: {text: "八戸"}, rate: 1345, lag: {}},
  {template: "numakunaiTemplate", time: {text: "14:39"}, lastStation: {text: "八戸"}, rate: 1439, lag: {}},
  {template: "numakunaiTemplate", time: {text: "15:55"}, lastStation: {text: "八戸"}, rate: 1555, lag: {}},
  {template: "numakunaiTemplate", time: {text: "16:55"}, lastStation: {text: "金田一温泉"}, rate: 1655, lag: {}},
  {template: "numakunaiTemplate", time: {text: "17:37"}, lastStation: {text: "八戸"}, rate: 1737, lag: {}},
  {template: "numakunaiTemplate", time: {text: "18:49"}, lastStation: {text: "八戸"}, rate: 1849, lag: {}},
  {template: "numakunaiTemplate", time: {text: "19:42"}, lastStation: {text: "八戸"}, rate: 1942, lag: {}},
  {template: "numakunaiTemplate", time: {text: "20:53"}, lastStation: {text: "八戸"}, rate: 2053, lag: {}},
  {template: "numakunaiTemplate", time: {text: "22:20"}, lastStation: {text: "八戸"}, rate: 2220, lag: {}}
];
$.numakunaiListSection.setItems(numakunaiData);

var midouData = [
  {template: "midouTemplate", time: {text: "7:23"}, lastStation: {text: "八戸"}, rate: 723, lag: {}},
  {template: "midouTemplate", time: {text: "8:10"}, lastStation: {text: "二戸"}, rate: 810, lag: {}},
  {template: "midouTemplate", time: {text: "9:48"}, lastStation: {text: "八戸"}, rate: 948, lag: {}},
  {template: "midouTemplate", time: {text: "10:58"}, lastStation: {text: "八戸"}, rate: 1058, lag: {}},
  {template: "midouTemplate", time: {text: "12:35"}, lastStation: {text: "八戸"}, rate: 1235, lag: {}},
  {template: "midouTemplate", time: {text: "13:50"}, lastStation: {text: "八戸"}, rate: 1350, lag: {}},
  {template: "midouTemplate", time: {text: "14:44"}, lastStation: {text: "八戸"}, rate: 1444, lag: {}},
  {template: "midouTemplate", time: {text: "16:00"}, lastStation: {text: "八戸"}, rate: 1600, lag: {}},
  {template: "midouTemplate", time: {text: "17:00"}, lastStation: {text: "金田一温泉"}, rate: 1700, lag: {}},
  {template: "midouTemplate", time: {text: "17:42"}, lastStation: {text: "八戸"}, rate: 1742, lag: {}},
  {template: "midouTemplate", time: {text: "18:54"}, lastStation: {text: "八戸"}, rate: 1854, lag: {}},
  {template: "midouTemplate", time: {text: "19:47"}, lastStation: {text: "八戸"}, rate: 1947, lag: {}},
  {template: "midouTemplate", time: {text: "20:57"}, lastStation: {text: "八戸"}, rate: 2057, lag: {}},
  {template: "midouTemplate", time: {text: "22:25"}, lastStation: {text: "八戸"}, rate: 2225, lag: {}}
];
$.midouListSection.setItems(midouData);

var okunakayamaData = [
  {template: "okunakayamaTemplate", time: {text: "7:30"}, lastStation: {text: "八戸"}, rate: 730, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "8:16"}, lastStation: {text: "二戸"}, rate: 816, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "9:55"}, lastStation: {text: "八戸"}, rate: 955, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "11:04"}, lastStation: {text: "八戸"}, rate: 1104, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "12:42"}, lastStation: {text: "八戸"}, rate: 1242, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "13:57"}, lastStation: {text: "八戸"}, rate: 1357, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "14:52"}, lastStation: {text: "八戸"}, rate: 1452, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "16:07"}, lastStation: {text: "八戸"}, rate: 1607, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "17:06"}, lastStation: {text: "金田一温泉"}, rate: 1706, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "17:48"}, lastStation: {text: "八戸"}, rate: 1748, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "19:00"}, lastStation: {text: "八戸"}, rate: 1900, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "19:53"}, lastStation: {text: "八戸"}, rate: 1953, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "21:04"}, lastStation: {text: "八戸"}, rate: 2104, lag: {}},
  {template: "okunakayamaTemplate", time: {text: "22:31"}, lastStation: {text: "八戸"}, rate: 2231, lag: {}}
];
$.okunakayamaListSection.setItems(okunakayamaData);

var kotunagiData = [
  {template: "kotunagiTemplate", time: {text: "7:38"}, lastStation: {text: "八戸"}, rate: 738, lag: {}},
  {template: "kotunagiTemplate", time: {text: "8:24"}, lastStation: {text: "二戸"}, rate: 824, lag: {}},
  {template: "kotunagiTemplate", time: {text: "10:02"}, lastStation: {text: "八戸"}, rate: 1002, lag: {}},
  {template: "kotunagiTemplate", time: {text: "11:12"}, lastStation: {text: "八戸"}, rate: 1112, lag: {}},
  {template: "kotunagiTemplate", time: {text: "12:49"}, lastStation: {text: "八戸"}, rate: 1249, lag: {}},
  {template: "kotunagiTemplate", time: {text: "14:04"}, lastStation: {text: "八戸"}, rate: 1404, lag: {}},
  {template: "kotunagiTemplate", time: {text: "14:59"}, lastStation: {text: "八戸"}, rate: 1459, lag: {}},
  {template: "kotunagiTemplate", time: {text: "16:14"}, lastStation: {text: "八戸"}, rate: 1614, lag: {}},
  {template: "kotunagiTemplate", time: {text: "17:14"}, lastStation: {text: "金田一温泉"}, rate: 1714, lag: {}},
  {template: "kotunagiTemplate", time: {text: "17:56"}, lastStation: {text: "八戸"}, rate: 1756, lag: {}},
  {template: "kotunagiTemplate", time: {text: "19:07"}, lastStation: {text: "八戸"}, rate: 1907, lag: {}},
  {template: "kotunagiTemplate", time: {text: "20:01"}, lastStation: {text: "八戸"}, rate: 2001, lag: {}},
  {template: "kotunagiTemplate", time: {text: "21:11"}, lastStation: {text: "八戸"}, rate: 2111, lag: {}},
  {template: "kotunagiTemplate", time: {text: "22:38"}, lastStation: {text: "八戸"}, rate: 2238, lag: {}}
];
$.kotunagiListSection.setItems(kotunagiData);

var kozuyaData = [
  {template: "kozuyaTemplate", time: {text: "6:33"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 633, lag: {}},
  {template: "kozuyaTemplate", time: {text: "7:45"}, lastStation: {text: "八戸"}, rate: 745, lag: {}},
  {template: "kozuyaTemplate", time: {text: "8:30"}, lastStation: {text: "二戸"}, rate: 830, lag: {}},
  {template: "kozuyaTemplate", time: {text: "10:09"}, lastStation: {text: "八戸"}, rate: 1009, lag: {}},
  {template: "kozuyaTemplate", time: {text: "11:18"}, lastStation: {text: "八戸"}, rate: 1118, lag: {}},
  {template: "kozuyaTemplate", time: {text: "12:56"}, lastStation: {text: "八戸"}, rate: 1256, lag: {}},
  {template: "kozuyaTemplate", time: {text: "14:11"}, lastStation: {text: "八戸"}, rate: 1411, lag: {}},
  {template: "kozuyaTemplate", time: {text: "15:06"}, lastStation: {text: "八戸"}, rate: 1506, lag: {}},
  {template: "kozuyaTemplate", time: {text: "16:21"}, lastStation: {text: "八戸"}, rate: 1621, lag: {}},
  {template: "kozuyaTemplate", time: {text: "17:20"}, lastStation: {text: "金田一温泉"}, rate: 1720, lag: {}},
  {template: "kozuyaTemplate", time: {text: "18:02"}, lastStation: {text: "八戸"}, rate: 1802, lag: {}},
  {template: "kozuyaTemplate", time: {text: "19:14"}, lastStation: {text: "八戸"}, rate: 1914, lag: {}},
  {template: "kozuyaTemplate", time: {text: "20:07"}, lastStation: {text: "八戸"}, rate: 2007, lag: {}},
  {template: "kozuyaTemplate", time: {text: "21:18"}, lastStation: {text: "八戸"}, rate: 2118, lag: {}},
  {template: "kozuyaTemplate", time: {text: "22:45"}, lastStation: {text: "八戸"}, rate: 2245, lag: {}}
];
$.kozuyaListSection.setItems(kozuyaData);

var itinoheData = [
  {template: "itinoheTemplate", time: {text: "6:40"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 640, lag: {}},
  {template: "itinoheTemplate", time: {text: "7:50"}, lastStation: {text: "八戸"}, rate: 750, lag: {}},
  {template: "itinoheTemplate", time: {text: "8:35"}, lastStation: {text: "二戸"}, rate: 835, lag: {}},
  {template: "itinoheTemplate", time: {text: "10:13"}, lastStation: {text: "八戸"}, rate: 1013, lag: {}},
  {template: "itinoheTemplate", time: {text: "11:23"}, lastStation: {text: "八戸"}, rate: 1123, lag: {}},
  {template: "itinoheTemplate", time: {text: "13:00"}, lastStation: {text: "八戸"}, rate: 1300, lag: {}},
  {template: "itinoheTemplate", time: {text: "14:15"}, lastStation: {text: "八戸"}, rate: 1415, lag: {}},
  {template: "itinoheTemplate", time: {text: "15:11"}, lastStation: {text: "八戸"}, rate: 1511, lag: {}},
  {template: "itinoheTemplate", time: {text: "16:25"}, lastStation: {text: "八戸"}, rate: 1625, lag: {}},
  {template: "itinoheTemplate", time: {text: "17:25"}, lastStation: {text: "金田一温泉"}, rate: 1725, lag: {}},
  {template: "itinoheTemplate", time: {text: "18:07"}, lastStation: {text: "八戸"}, rate: 1807, lag: {}},
  {template: "itinoheTemplate", time: {text: "19:19"}, lastStation: {text: "八戸"}, rate: 1919, lag: {}},
  {template: "itinoheTemplate", time: {text: "20:12"}, lastStation: {text: "八戸"}, rate: 2012, lag: {}},
  {template: "itinoheTemplate", time: {text: "21:22"}, lastStation: {text: "八戸"}, rate: 2122, lag: {}},
  {template: "itinoheTemplate", time: {text: "22:50"}, lastStation: {text: "八戸"}, rate: 2250, lag: {}}
];
$.itinoheListSection.setItems(itinoheData);

var ninoheData = [
  {template: "ninoheTemplate", time: {text: "6:46"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 646, lag: {}},
  {template: "ninoheTemplate", time: {text: "7:56"}, lastStation: {text: "八戸"}, rate: 756, lag: {}},
  {template: "ninoheTemplate", time: {text: "10:19"}, lastStation: {text: "八戸"}, rate: 1019, lag: {}},
  {template: "ninoheTemplate", time: {text: "11:29"}, lastStation: {text: "八戸"}, rate: 1129, lag: {}},
  {template: "ninoheTemplate", time: {text: "13:06"}, lastStation: {text: "八戸"}, rate: 1306, lag: {}},
  {template: "ninoheTemplate", time: {text: "14:21"}, lastStation: {text: "八戸"}, rate: 1421, lag: {}},
  {template: "ninoheTemplate", time: {text: "15:16"}, lastStation: {text: "八戸"}, rate: 1516, lag: {}},
  {template: "ninoheTemplate", time: {text: "16:31"}, lastStation: {text: "八戸"}, rate: 1631, lag: {}},
  {template: "ninoheTemplate", time: {text: "17:30"}, lastStation: {text: "金田一温泉"}, rate: 1730, lag: {}},
  {template: "ninoheTemplate", time: {text: "17:49"}, lastStation: {text: "八戸"}, rate: 1749, lag: {}},
  {template: "ninoheTemplate", time: {text: "18:12"}, lastStation: {text: "八戸"}, rate: 1812, lag: {}},
  {template: "ninoheTemplate", time: {text: "19:24"}, lastStation: {text: "八戸"}, rate: 1924, lag: {}},
  {template: "ninoheTemplate", time: {text: "20:17"}, lastStation: {text: "八戸"}, rate: 2017, lag: {}},
  {template: "ninoheTemplate", time: {text: "21:28"}, lastStation: {text: "八戸"}, rate: 2128, lag: {}},
  {template: "ninoheTemplate", time: {text: "22:55"}, lastStation: {text: "八戸"}, rate: 2255, lag: {}}
];
$.ninoheListSection.setItems(ninoheData);

var tomaiData = [
  {template: "tomaiTemplate", time: {text: "6:50"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 650, lag: {}},
  {template: "tomaiTemplate", time: {text: "7:59"}, lastStation: {text: "八戸"}, rate: 759, lag: {}},
  {template: "tomaiTemplate", time: {text: "10:22"}, lastStation: {text: "八戸"}, rate: 1022, lag: {}},
  {template: "tomaiTemplate", time: {text: "11:32"}, lastStation: {text: "八戸"}, rate: 1132, lag: {}},
  {template: "tomaiTemplate", time: {text: "13:09"}, lastStation: {text: "八戸"}, rate: 1309, lag: {}},
  {template: "tomaiTemplate", time: {text: "14:24"}, lastStation: {text: "八戸"}, rate: 1424, lag: {}},
  {template: "tomaiTemplate", time: {text: "15:19"}, lastStation: {text: "八戸"}, rate: 1519, lag: {}},
  {template: "tomaiTemplate", time: {text: "16:34"}, lastStation: {text: "八戸"}, rate: 1634, lag: {}},
  {template: "tomaiTemplate", time: {text: "17:34"}, lastStation: {text: "金田一温泉"}, rate: 1734, lag: {}},
  {template: "tomaiTemplate", time: {text: "17:53"}, lastStation: {text: "八戸"}, rate: 1753, lag: {}},
  {template: "tomaiTemplate", time: {text: "18:16"}, lastStation: {text: "八戸"}, rate: 1816, lag: {}},
  {template: "tomaiTemplate", time: {text: "19:27"}, lastStation: {text: "八戸"}, rate: 1927, lag: {}},
  {template: "tomaiTemplate", time: {text: "20:21"}, lastStation: {text: "八戸"}, rate: 2021, lag: {}},
  {template: "tomaiTemplate", time: {text: "21:31"}, lastStation: {text: "八戸"}, rate: 2131, lag: {}},
  {template: "tomaiTemplate", time: {text: "22:58"}, lastStation: {text: "八戸"}, rate: 2258, lag: {}}
];
$.tomaiListSection.setItems(tomaiData);

var kintaitiData = [
  {template: "kintaitiTemplate", time: {text: "6:55"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 655, lag: {}},
  {template: "kintaitiTemplate", time: {text: "8:03"}, lastStation: {text: "八戸"}, rate: 803, lag: {}},
  {template: "kintaitiTemplate", time: {text: "10:27"}, lastStation: {text: "八戸"}, rate: 1027, lag: {}},
  {template: "kintaitiTemplate", time: {text: "11:36"}, lastStation: {text: "八戸"}, rate: 1136, lag: {}},
  {template: "kintaitiTemplate", time: {text: "13:13"}, lastStation: {text: "八戸"}, rate: 1313, lag: {}},
  {template: "kintaitiTemplate", time: {text: "14:28"}, lastStation: {text: "八戸"}, rate: 1428, lag: {}},
  {template: "kintaitiTemplate", time: {text: "15:24"}, lastStation: {text: "八戸"}, rate: 1524, lag: {}},
  {template: "kintaitiTemplate", time: {text: "16:38"}, lastStation: {text: "八戸"}, rate: 1638, lag: {}},
  {template: "kintaitiTemplate", time: {text: "17:57"}, lastStation: {text: "八戸"}, rate: 1757, lag: {}},
  {template: "kintaitiTemplate", time: {text: "18:20"}, lastStation: {text: "八戸"}, rate: 1820, lag: {}},
  {template: "kintaitiTemplate", time: {text: "19:32"}, lastStation: {text: "八戸"}, rate: 1932, lag: {}},
  {template: "kintaitiTemplate", time: {text: "20:25"}, lastStation: {text: "八戸"}, rate: 2025, lag: {}},
  {template: "kintaitiTemplate", time: {text: "21:35"}, lastStation: {text: "八戸"}, rate: 2135, lag: {}},
  {template: "kintaitiTemplate", time: {text: "23:03"}, lastStation: {text: "八戸"}, rate: 2303, lag: {}}
];
$.kintaitiListSection.setItems(kintaitiData);

var metokiData = [
  {template: "metokiTemplate", time: {text: "7:00"}, lastStation: {text: "[八]鮫（八戸経由）"}, rate: 700, lag: {}},
  {template: "metokiTemplate", time: {text: "8:07"}, lastStation: {text: "八戸"}, rate: 807, lag: {}},
  {template: "metokiTemplate", time: {text: "10:32"}, lastStation: {text: "八戸"}, rate: 1032, lag: {}},
  {template: "metokiTemplate", time: {text: "11:40"}, lastStation: {text: "八戸"}, rate: 1140, lag: {}},
  {template: "metokiTemplate", time: {text: "13:17"}, lastStation: {text: "八戸"}, rate: 1317, lag: {}},
  {template: "metokiTemplate", time: {text: "14:32"}, lastStation: {text: "八戸"}, rate: 1432, lag: {}},
  {template: "metokiTemplate", time: {text: "15:28"}, lastStation: {text: "八戸"}, rate: 1528, lag: {}},
  {template: "metokiTemplate", time: {text: "16:42"}, lastStation: {text: "八戸"}, rate: 1642, lag: {}},
  {template: "metokiTemplate", time: {text: "18:01"}, lastStation: {text: "八戸"}, rate: 1801, lag: {}},
  {template: "metokiTemplate", time: {text: "18:24"}, lastStation: {text: "八戸"}, rate: 1824, lag: {}},
  {template: "metokiTemplate", time: {text: "19:37"}, lastStation: {text: "八戸"}, rate: 1937, lag: {}},
  {template: "metokiTemplate", time: {text: "20:29"}, lastStation: {text: "八戸"}, rate: 2029, lag: {}},
  {template: "metokiTemplate", time: {text: "21:39"}, lastStation: {text: "八戸"}, rate: 2139, lag: {}},
  {template: "metokiTemplate", time: {text: "23:07"}, lastStation: {text: "八戸"}, rate: 2307, lag: {}}
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

var latAndLngData = [
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

var stationNameTabColor = [
  "#d0b07a",
  "#7b9ad0",
  "#f8e352",
  "#c8d627",
  "#d5848b",
  "#e5ab47",
  "#e1cea3",
  "#51a1a2",
  "#b1d7e4",
  "#66b7ec",
  "#c08e47",
  "#ae8dbc",
  "#c3cfa9",
  "#9ad07b",
  "#e352f8",
  "#27c8d6",
  "#848bd5",
  "#4781e5",
];

/* それぞれの駅タブを配列に格納 */
for(var i = 0; i < $.stationNameTabScroll.children.length; i++) {
  var child = $.stationNameTabScroll.children[i];
  children.push(child);
};

/* 駅名スクロールタブクリックイベント */
for(var i = 0; i < children.length; i++) {
  children[i].addEventListener("click", (function(i) {
    return function() {
      try {
        if(clickedTab === undefined) {
          clickedTab = false;
        } else {
          clickedTab = true;
        }

        if (this != currentTab) {
          this.setBackgroundColor(stationNameTabColor[i]);
          this.setBorderColor(stationNameTabColor[i]);
          this.children[0].setColor("#FFFFFF");
          $.stationNameTabLine.setBackgroundColor(stationNameTabColor[i]);
          currentTab.setBackgroundColor("#FAFAFA");
          currentTab.setBorderColor("#FAFAFA");
          currentTab.children[0].setColor(stationNameTabColor[currentTab.number]);
          currentTab = this;
          $.timetableScrollable.scrollToView(i);
          setTabCenter(i);
        }
      } catch(e) {
        Ti.API.debug(e.error || e);
      }
    };
  })(i));
}

currentTab = children[0];
currentTab.setBackgroundColor(stationNameTabColor[0]);
currentTab.setBorderColor(stationNameTabColor[0]);
currentTab.children[0].setColor("#FFFFFF");
$.stationNameTabLine.setBackgroundColor(stationNameTabColor[0]);
children[0].fireEvent("click");

/* 次の発車時刻の時間差取得をしてUpdate */
function getTimeLag(e) {
  var listSection = $.timetableScrollable.views[e].sections[0];
  var currentHour = Number(hour);
  var currentMinutes = Number(minutes);
  for (var i = scrollItemIndex; i < (scrollItemIndex + 3); i++) {
    if(listSection.getItemAt(i) == null || listSection.getItemAt(i) == undefined) {
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

    if (i == scrollItemIndex) {
      listItem.time.color = "#ff0000";
      if (listSection.getItemAt(i - 1).time.color == "#ff0000") {
        var restoreItem = listSection.getItemAt(i - 1);
        restoreItem.time.color = "#333333";
        restoreItem.properties = {
          height: 50
        };
        restoreItem.time.font = {
          fontSize: 20
        };
        restoreItem.lastStation.top = null;
        restoreItem.lastStation.font = {
          fontSize: 14
        };
        restoreItem.lag.font = {
          fontSize: 14
        };
        restoreItem.lag.bottom = null;
        restoreItem.lag.text = "";
        listSection.updateItemAt(i - 1, restoreItem, {animate: true});
      }
    }

    listItem.properties = {
      height: 90
    };
    listItem.time.font = {
      fontSize: 32
    };
    listItem.lastStation.top = 10;
    listItem.lastStation.font = {
      fontSize: 18
    };
    listItem.lag.font = {
      fontSize: 18
    };
    listItem.lag.bottom = 10;
    listItem.lag.text = "発車まであと" + timeLagLabel;
    listSection.updateItemAt(i, listItem, {animate: true});
  }
};

/* 発車時刻が近いindexのに移動 */
function sectionUpdateItem(e) {
  if (!Ti.App.Properties.getBool("slideSwitch")) {
    return;
  }

  var listSection = $.timetableScrollable.views[e].sections[0];
  if (listSection.items.length - 1 >= scrollItemIndex + 4) {
    $.timetableScrollable.views[e].scrollToItem(0, scrollItemIndex + 4, {animate: true});
  } else {
    $.timetableScrollable.views[e].scrollToItem(0, listSection.items.length - 1, {animate: true});
  }
  $.timetableScrollable.views[e].scrollToItem(0, scrollItemIndex + 4, {animate: true});
};

/* 発車時刻に近いIndexを取得 */
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
      getCurrentDate();
      getTimeLag(e);
      return;
    }
  }
};

/* 現在地から近い駅を計算し表示する */
function showNearStationTab() {
  if (Ti.App.Properties.getBool("gpsSwitch")) {
    var distanceData = [];
    for (var i = 0; i < latAndLngData.length; i++) {
      distanceData.push(Alloy.Globals.getDistance(latAndLngData[i].lat, latAndLngData[i].lng));
    }

    var nearStationIndex;
    var a, b;
    for (var i = 0; i < distanceData.length; i++) {
      a = distanceData[i];
      if (i === 0) {
        b = a;
        nearStationIndex = i;
      }
      if (i > 0) {
        if (a < b) {
          b = a;
          nearStationIndex = i;
        }
      }
    }

    $.timetableScrollable.scrollToView(nearStationIndex);
  }

  getScrollItemIndex($.timetableScrollable.currentPage);
}

/* 時刻表スライド時イベント */
function changePage(e) {
  if(e.currentPage != scrollPage) {
    try {
      if(!clickedTab) {
        var that = children[e.currentPage];
        if (that != currentTab) {
          that.setBackgroundColor(stationNameTabColor[e.currentPage]);
          that.setBorderColor(stationNameTabColor[e.currentPage]);
          that.children[0].setColor("#FFFFFF");
          $.stationNameTabLine.setBackgroundColor(stationNameTabColor[e.currentPage]);
          currentTab.setBackgroundColor("#FAFAFA");
          currentTab.setBorderColor("#FAFAFA");
          currentTab.children[0].setColor(stationNameTabColor[currentTab.number]);
          currentTab = that;
          setTabCenter(e.currentPage);
        }
      }
      scrollPage = e.currentPage;
      getScrollItemIndex(e.currentPage);
    } catch(e) {
      Ti.API.info(e.error || e);
    }
  }
};

/* スライド終了時イベント */
function falseClickTab(e) {
  clickedTab = false;
}

/* 駅名スクロールタブを中央に */
function setTabCenter(index) {
  var scrollToX, scrollToXTab, scrollToLastX, scrollToLastXTab;
  if (OS_IOS) {
    scrollToX = children[index].rect.x;
    scrollToXTab = scrollToX - Alloy.Globals.halfDisplayWidth + (children[index].rect.width * 0.5);
    scrollToLastX = children[children.length - 1].rect.x;
  } else if (OS_ANDROID) {
    scrollToX = children[index].rect.x;
    scrollToXTab = Alloy.Globals.androidDpiWidthUnits * (scrollToX + (children[index].rect.width * 0.5) - Alloy.Globals.halfDisplayWidth);
    scrollToLastX = children[children.length - 1].rect.x;
  }

  if(scrollToXTab < 0) {
    $.stationNameTabScroll.scrollTo(0, 0);
  } else if((scrollToLastX - scrollToX) < Alloy.Globals.halfDisplayWidth) {
    $.stationNameTabScroll.scrollToBottom();
  } else {
    $.stationNameTabScroll.scrollTo(scrollToXTab, 0);
  }
};
