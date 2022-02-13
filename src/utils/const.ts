import gongxi from "../img/gongxi.jpg";
import huhu from "../img/huhu.jpg";
import shule from "../img/shule.jpg";
import tuiqian from "../img/tuiqian.jpg";
import wufu from "../img/wufu.jpg";
import xinniankuaile from "../img/xinniankuaile.jpg";

export const MaxValue = 6;

export const BoardSize = 8;

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
