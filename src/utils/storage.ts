import { DefaultBoardSize } from "./const";

interface GameStorage {
  score: number;
  boardsize: number;
}

type GameStorageKey = keyof GameStorage;
type GameStorageVal = GameStorage[GameStorageKey];

const gameStorageKey = "__superhappy_xiaoxiaole__gamestorage";

let curStorage: GameStorage = {
  score: 0,
  boardsize: DefaultBoardSize,
};

export const getScoreFromStorage = () => {
  return getStorage("score", 0);
};

export const saveScoreToStorage = (score: number) => {
  saveStorage({
    score,
  });
};

export const getSizeFromStorage = () => {
  return getStorage("boardsize", DefaultBoardSize);
};

export const saveSizeToStorage = (size: number) => {
  saveStorage({
    boardsize: size,
  });
};

const saveStorage = (obj: Partial<GameStorage>) => {
  curStorage = {
    ...curStorage,
    ...obj,
  };
  const stg = JSON.stringify(curStorage);
  localStorage.setItem(gameStorageKey, stg);
};

const getStorage = (
  key: GameStorageKey,
  defaultVal: GameStorageVal
): GameStorageVal => {
  try {
    const stg = localStorage.getItem(gameStorageKey);
    const stgObj: GameStorage = JSON.parse(stg || "");
    curStorage = {
      ...curStorage,
      ...stgObj,
    };

    return Number(stgObj[key]) || defaultVal;
  } catch (error) {
    return defaultVal;
  }
};
