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