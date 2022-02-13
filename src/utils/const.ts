import gongxi from "../img/gongxi.jpg";
import huhu from "../img/huhu.jpg";
import shule from "../img/shule.jpg";
import tuiqian from "../img/tuiqian.jpg";
import wufu from "../img/wufu.jpg";
import xinniankuaile from "../img/xinniankuaile.jpg";

export const MaxValue = 6;

export const BoardSize = 8;

export const MoveThreshold = 5;

export const ValueIconMapper: Record<number, string> = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
};

export const ValueColorMapper: Record<number, string> = {
  1: "orange",
  2: "lightgreen",
  3: "yellow",
  4: "lightblue",
  5: "lightgray",
  6: "LemonChiffon",
};

export const ValueImgMapper: Record<number, string> = {
  1: gongxi,
  2: huhu,
  3: shule,
  4: tuiqian,
  5: wufu,
  6: xinniankuaile,
};
