import gongxi from "../img/gongxi.jpg";
import huhu from "../img/huhu.jpg";
import shule from "../img/shule.jpg";
import tuiqian from "../img/tuiqian.jpg";
import wufu from "../img/wufu.jpg";
import xinniankuaile from "../img/xinniankuaile.jpg";

export const MaxValue = 6;

export const BoardSize = 6;

export const MoveThreshold = 5;

export const ValueIconMapper = ["", "1", "2", "3", "4", "5", "6"];

export const ValueColorMapper = [
  "",
  "orange",
  "lightgreen",
  "yellow",
  "lightblue",
  "lightgray",
  "LemonChiffon",
];

export const ValueImgMapper = [
  "",
  xinniankuaile,
  huhu,
  shule,
  tuiqian,
  wufu,
  gongxi,
];

export const ValueScoreMapper = [0, 1000, 200, -100, -200, 300, 500];

export const ValueQuoteMapper = [
  "",
  "新 年 快 乐 ！",
  "眼镜哥の呐喊",
  "再这样下去...",
  "xxx! xx!",
  "独中五元！",
  "哎哟！",
];

export const ProgressMarker: [number, string][] = [
  [-10000, '濒临解散'],
  [0, '球队组建'],
  [1000, '校队冠军'],
  [2000, '市队冠军'],
  [5000, '省队冠军'],
  [10000, '入选国家队'],
  [15000, '国家队首胜'],
  [18000, '国家队连胜'],
  [20000, '三连胜！'],
  [22000, '亚洲杯首战'],
  [25000, '亚洲杯首胜！'],
  [26000, '亚洲杯打败越南！'],
  [30000, '亚洲杯打败韩国！'],
  [35000, '亚洲杯打败日本！'],
]
