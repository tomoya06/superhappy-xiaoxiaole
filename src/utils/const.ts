import gongxi from "../img/gongxi.jpg";
import shule from "../img/shule.jpg";
import haishen from "../img/haishen.png";
import wufu from "../img/wufu.jpg";
import xinniankuaile from "../img/xinniankuaile.jpg";
import dunan from "../img/dunan.jpg";

export const MaxValue = 6;

export const DefaultBoardSize = 6;
export const MinBoardSize = 4;
export const MaxBoardSize = 10;

export const MoveThreshold = 5;

export const ValueIconMapper = ["1", "2", "3", "4", "5", "6"];

export const ValueColorMapper = [
  "orange",
  "lightgreen",
  "yellow",
  "lightblue",
  "lightgray",
  "LemonChiffon",
];

export const ValueImgMapper = [
  xinniankuaile,
  haishen,
  shule,
  dunan,
  wufu,
  gongxi,
];

export const ValueScoreMapper = [1000, 200, -100, -200, 300, 500];

export const ValueQuoteMapper = [
  "新 年 快 乐！",
  `“平时会吃吗？”`,
  "再这样下去...",
  "今天练了块腹肌",
  "独中五元！",
  "哎哟！",
];

export const ValueNegQuoteMapper = [
  "xxx! xx!!!",
  "还是吃太多了",
  "还有机会",
  "肚腩攻击",
  "漏了五个球",
  "谢天谢地！",
];

export const ProgressMarker: [number, string][] = [
  [-10000, "濒临解散"],
  [0, "球队组建"],
  [1000, "校队冠军"],
  [2000, "市队冠军"],
  [5000, "省队冠军"],
  [10000, "入选国家队"],
  [15000, "国家队首胜"],
  [18000, "国家队连胜"],
  [20000, "三连胜！"],
  [22000, "亚洲杯首战"],
  [25000, "亚洲杯首胜！"],
  [26000, "亚洲杯打败越南！"],
  [30000, "亚洲杯打败韩国！"],
  [35000, "亚洲杯打败日本！"],
];
