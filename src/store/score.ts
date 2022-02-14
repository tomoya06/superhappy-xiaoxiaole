import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcCounterRate, calcCounterScore } from "../utils/func";
import { getScoreFromStorage, saveScoreToStorage } from "../utils/storage";
import { CheckBoard, CheckResult, ScoreCounter } from "../utils/types";

// Define a type for the slice state
interface CounterState {
  totalScore: number;
  scoreStack: ScoreCounter[];
}

// Define the initial state using that type
const initialState: CounterState = {
  totalScore: getScoreFromStorage(),
  scoreStack: [],
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<number>) => {
      state.totalScore += action.payload;
    },
    addStack: (state, action: PayloadAction<ScoreCounter[]>) => {
      state.scoreStack = [...state.scoreStack, ...action.payload];
    },
    checkin: (state, action: PayloadAction<CheckBoard>) => {
      const newStack: ScoreCounter[] = [];
      let diff = 0;

      for (const value in action.payload) {
        const newItem: ScoreCounter = {
          value: Number(value),
          count: action.payload[value].size,
        };

        newItem.score = calcCounterScore(newItem);
        newItem.rate = calcCounterRate(newItem);
        newStack.push(newItem);

        diff += newItem.score * newItem.rate;
      }

      state.totalScore += diff;
      state.scoreStack = [...state.scoreStack, ...newStack];

      saveScoreToStorage(state.totalScore);
    },
    consumeStack: (state) => {
      state.scoreStack = state.scoreStack.slice(1);
    },
  },
});

export const { checkin, consumeStack } = scoreSlice.actions;

export default scoreSlice.reducer;
