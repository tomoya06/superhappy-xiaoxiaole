import { MaxValue } from "./const";
import { Block } from "./types";

let curIdx = 1;

const genRandomValue = (): number => {
  return Math.floor(Math.random() * MaxValue) + 1;
};

const genRandomBlock = (): Block => {
  return {
    id: curIdx++,
    value: genRandomValue(),
    isKilled: false,
  };
};

export const genBoard = (size = 10) => {
  const board: Block[][] = [];

  for (let i = 0; i < size; i += 1) {
    board.push([]);
    for (let j = 0; j < size; j += 1) {
      board[i].push(genRandomBlock());
    }
  }

  return board;
};

export const checkBoard = (cells: Block[][]): boolean => {
  const MaxRow = cells.length;
  const MaxCol = cells[0].length;
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

        hasKilled = true;
      }
    }
  }

  return hasKilled;
};

export const killBoard = (cells: Block[][]): void => {
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
      cells[y][x] = genRandomBlock();
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
