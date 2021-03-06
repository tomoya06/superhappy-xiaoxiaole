import gongxi from "../img/gongxi.jpg";
import shule from "../img/shule.jpg";
import haishen from "../img/haishen.png";
import wufu from "../img/wufu.jpg";
import xinniankuaile from "../img/xinniankuaile.jpg";
import dunan from "../img/dunan.png";

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

export const ValueScoreMapper = [1000, 888, 400, 666, 555, 233];

export const ValueQuoteMapper = [
  "新 年 快 乐！",
  `“平时会吃吗？”`,
  "再这样下去...",
  "不是肚腩，是腹肌",
  "独中五元！",
  "哎哟！",
];

export const ValueNegQuoteMapper = [
  `"教练浪费了一个换人机会"`,
  `"教练浪费了一个换人机会"`,
  `"教练浪费了一个换人机会"`,
  `"教练浪费了一个换人机会"`,
  `"教练浪费了一个换人机会"`,
  `"教练浪费了一个换人机会"`,
];

export const HelperText = `
为男足加油打气！提高球队战力！
带领男足冲出亚洲！捧起大力神杯！

第一步由您划出之后，
就可以无限制地划动！

当然，这一路上，
会有收获(指加分)，
会手足无措(指空划动会扣分)，
也会有挫折(指某些卡片也会扣分)，

但我们对国足的热爱始终都在！`;

export const ProgressMarker: [number, string, string?][] = [
  [-10000, "濒临解散", "local"],
  [0, "球队组建"],
  [2000, "校队冠军"],
  [10000, "市队冠军"],
  [20000, "省队冠军"],
  [30000, "入选国家队", "national"],
  [66666, "国家队首胜"],
  [88888, "国家队连胜"],
  [100000, "国家队出征不败！"],
  [200000, "进军亚洲杯！", "asian"],
  [250000, "亚洲杯首胜！"],
  [250001, "亚洲杯赢越南！"],
  [300000, "亚洲杯赢韩国！"],
  [400000, "亚洲杯赢日本！"],
  [500000, "亚洲杯八强！"],
  [550000, "亚洲杯四强！"],
  [580000, "亚洲杯半决赛！"],
  [600000, "亚洲杯总决赛！"],
  [666666, "亚洲杯总决赛加时！"],
  [888888, "总决赛点球大战！"],
  [1000000, "亚洲杯冠军！！！"],
  [1100000, "进军世界杯！！！", "world"],
  [1100001, "世界杯小组赛首战"],
  [1200000, "世界杯小组赛首败"],
  [1400000, "世界杯小组赛首胜！"],
  [1500000, "世界杯出线！"],
  [1800000, "1/8决赛获胜！"],
  [1900000, "1/4决赛打进加时赛！"],
  [1999999, "1/4决赛加时赛绝杀！"],
  [2000000, "1/4决赛获胜！"],
  [2500000, "半决赛率先进球！", 'world_semi'],
  [2800000, "半决赛扩大比分！"],
  [3000000, "进球停不下来！！"],
  [4000000, "半决赛横扫获胜！！"],
  [5000000, "总决赛先丢一球", 'world_final'],
  [5500000, "守门员扑出点球"],
  [5555555, "下半场追回一球！"],
  [8888888, "再追一球！"],
  [9999999, "吹哨前被追平"],
  [10000000, "加时赛再进一球！"],
  [20000000, "加时赛再被追平"],
  [30000000, "平局进入点球大战！"],
  [40000000, "率先踢进一球！"],
  [50000000, "又进一球！"],
  [60000000, "守门员扑出一球！"],
  [70000000, "再进一球！"],
  [72000000, "这球踢飞了！"],
  [80000000, "点球4-3！"],
  [81000000, "没有扑出"],
  [90000000, "第五球踢进！"],
  [99999999, "最后一球扑出去了！"],
  [100000000, "捧起大力神杯！！！", "finish"],
];

const ProgressIndicatorMapper: Record<string, string> = {
  nagetive: "球队危机",
  local: "球队搭建",
  national: "国家队出征",
  asian: "征战亚洲杯",
  world: "出战世界杯",
  world_semi: '世界杯半决赛',
  world_final: '世界杯总决赛',
  finish: "所向披靡",
};

export const getProgressIndicator = (score: number): string => {
  let curIndi = "";
  if (score < ProgressMarker[0][0]) {
    return ProgressIndicatorMapper["nagetive"];
  }
  for (const pro of ProgressMarker) {
    if (pro[2]) {
      curIndi = ProgressIndicatorMapper[pro[2]];
    }
    if (score < pro[0]) {
      return curIndi;
    }
  }

  return curIndi;
};
