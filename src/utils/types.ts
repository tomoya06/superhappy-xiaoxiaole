export interface Block {
  id: number;
  value: number;
  isKilled: boolean;
  isDeleted: boolean;
}

export interface BlockWithPos extends Block {
  pos: number[];
}

export type CellsMapType = Record<number, BlockWithPos>;

export enum EnumGestureDirection {
  UP = 1,
  RIGHT,
  DOWN,
  LEFT,
}

export interface GestureHandler<T> {
  switch: (flag: boolean) => void;
  start: (evt: T) => void;
  finish: (evt: T) => { targetIdx: number[] | null; swapIdx: number[] | null };
}
