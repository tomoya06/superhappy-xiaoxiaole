import { MaxValue, ValueScoreMapper } from "./const";
import {
  Block,
  BlockWithPos,
  CellsMapType,
  CheckBoard,
  CheckResult,
  ScoreCounter,
} from "./types";

let curIdx = 1;
const cells: Block[][] = [];
const cellsMap: CellsMapType = {};

const genRandomValue = (): number => {
  return Math.floor(Math.random() * MaxValue);
};

const genRandomBlock = (): Block => {
  return {
    id: curIdx++,
    value: genRandomValue(),
    isKilled: false,
    isDeleted: false,
  };
};

export const genBoard = (size = 10) => {
  cells.splice(0);

  for (let i = 0; i < size; i += 1) {
    cells.push([]);
    for (let j = 0; j < size; j += 1) {
      cells[i].push(genRandomBlock());
    }
  }
};

export const exportBoard = (): BlockWithPos[] => {
  const exisingCellsMap: Record<number, boolean> = {};
  cells.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      cellsMap[cell.id] = {
        ...cell,
        pos: [colIdx, rowIdx],
      };
      exisingCellsMap[cell.id] = true;
    });
  });

  const res: BlockWithPos[] = [];

  for (const cellId in cellsMap) {
    if (!exisingCellsMap[cellId]) {
      delete cellsMap[cellId];
    } else {
      res.push(cellsMap[cellId]);
    }
  }

  return res;
};

export const swapPosition = (
  targetIdx: number[],
  swapIdx: number[]
): number => {
  const targetCellValue = cells[targetIdx[0]][targetIdx[1]].value;
  [cells[targetIdx[0]][targetIdx[1]], cells[swapIdx[0]][swapIdx[1]]] = [
    cells[swapIdx[0]][swapIdx[1]],
    cells[targetIdx[0]][targetIdx[1]],
  ];

  return targetCellValue;
};

const addCount = (checkBoard: CheckBoard, value: number, cells: Block[]) => {
  if (!checkBoard[value]) {
    checkBoard[value] = new Set();
  }
  cells.forEach((cell) => {
    checkBoard[value].add(cell.id);
  });
};

export const checkBoard = (): CheckResult => {
  const MaxRow = cells.length;
  const MaxCol = cells[0].length;
  const checkResult: CheckBoard = {};

  let hasKilled = false;

  for (let y = 0; y < MaxRow; y++) {
    for (let x = 0; x < MaxCol - 2; x++) {
      if (
        cells[y][x].value === cells[y][x + 1].value &&
        cells[y][x + 1].value === cells[y][x + 2].value
      ) {
        cells[y][x].isKilled = true;
        cells[y][x + 1].isKilled = true;
        cells[y][x + 2].isKilled = true;

        addCount(checkResult, cells[y][x].value, [
          cells[y][x],
          cells[y][x + 1],
          cells[y][x + 2],
        ]);

        hasKilled = true;
      }
    }
  }

  for (let y = 0; y < MaxRow - 2; y++) {
    for (let x = 0; x < MaxCol; x++) {
      if (
        cells[y][x].value === cells[y + 1][x].value &&
        cells[y + 1][x].value === cells[y + 2][x].value
      ) {
        cells[y][x].isKilled = true;
        cells[y + 1][x].isKilled = true;
        cells[y + 2][x].isKilled = true;

        addCount(checkResult, cells[y][x].value, [
          cells[y][x],
          cells[y + 1][x],
          cells[y + 2][x],
        ]);

        hasKilled = true;
      }
    }
  }

  return hasKilled ? checkResult : null;
};

export const killBoard = (): void => {
  const MaxRow = cells.length;
  const MaxCol = cells[0].length;

  for (let x = 0; x < MaxCol; x += 1) {
    let diff = 0;
    for (let y = MaxRow - 1; y >= 0; y -= 1) {
      if (cells[y][x].isKilled) {
        diff += 1;
        continue;
      }
      cells[y + diff][x] = {
        ...cells[y][x],
      };
    }

    for (let y = diff - 1; y >= 0; y -= 1) {
      cells[y][x].isDeleted = true;
    }
  }
};

export const deleteBoard = (): void => {
  const MaxRow = cells.length;
  const MaxCol = cells[0].length;
  for (let x = 0; x < MaxCol; x += 1) {
    for (let y = MaxRow - 1; y >= 0; y -= 1) {
      if (cells[y][x].isDeleted) {
        cells[y][x] = genRandomBlock();
      }
    }
  }
};

export const delay = async (int: number) => {
  const p = new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true);
    }, int);
  });

  await p;
};

export const calcCounterScore = (counter: ScoreCounter): number => {
  const { value, count } = counter;

  return ValueScoreMapper[value] * count;
};

export const calcCounterRate = (
  counter: ScoreCounter,
  curScore: number
): number => {
  const { count, value } = counter;
  let diff = count - 3;

  const curStep = Math.pow(10, curScore.toString().length - 5);
  const buff = curStep * (Math.random() * 1.3 + 0.2);

  const rate = diff / 10 + 2 * diff + 1 + buff;

  return Math.floor(rate * 10) / 10;
};

export const calcIdleMoveScore = (counter: ScoreCounter): number => {
  const { value } = counter;

  return -Math.abs(ValueScoreMapper[value]);
};

export const calcIdleMoveRate = (
  counter: ScoreCounter,
  curScore: number
): number => {
  const { count } = counter;

  const rate = Math.random() * count * 0.4;
  return Math.floor(rate * 10) / 10;
};
