interface GameStorage {
  score: number;
}

const gameStorageKey = '__superhappy_xiaoxiaole__gamestorage';

export const getScoreFromStorage = () => {
  try {
    const stg = localStorage.getItem(gameStorageKey);
    const stgObj: GameStorage = JSON.parse(stg||'');

    return Number(stgObj.score) || 0;
  } catch (error) {
    return 0;
  }
}

export const saveScoreToStorage = (score: number) => {
  const stg = JSON.stringify({
    score,
  });
  localStorage.setItem(gameStorageKey, stg);
}
