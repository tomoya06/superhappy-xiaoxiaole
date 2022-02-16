import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ValueNegQuoteMapper, ValueQuoteMapper } from "../utils/const";
import {
  calcCounterRate,
  calcCounterScore,
  calcIdleMoveRate,
  calcIdleMoveScore,
} from "../utils/func";
import { getScoreFromStorage, saveScoreToStorage } from "../utils/storage";
import { CheckBoard, CheckResult, ScoreCounter } from "../utils/types";

// Define a type for the slice state
interface CounterState {
  totalScore: number;
  idleMoveCount: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  totalScore: getScoreFromStorage(),
  idleMoveCount: 0,
};

const scoreStack: ScoreCounter[] = [];

export const consumeStack = (): ScoreCounter | undefined => {
  return scoreStack.shift();
}

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<number>) => {
      state.totalScore += action.payload;
    },
    checkin: (state, action: PayloadAction<CheckBoard>) => {
      state.idleMoveCount = 0;
      const newStack: ScoreCounter[] = [];
      let diff = 0;

      for (const value in action.payload) {
        const newItem: ScoreCounter = {
          value: Number(value),
          count: action.payload[value].size,
          quote: ValueQuoteMapper[value],
        };

        newItem.score = calcCounterScore(newItem);
        newItem.rate = calcCounterRate(newItem, state.totalScore);
        newStack.push(newItem);

        diff += newItem.score * newItem.rate;
      }

      state.totalScore = Math.floor(state.totalScore + diff);
      scoreStack.push(...newStack);

      saveScoreToStorage(state.totalScore);
    },
    idleMove: (state, action: PayloadAction<number>) => {
      state.idleMoveCount += 1;

      const newItem: ScoreCounter = {
        value: action.payload,
        count: state.idleMoveCount,
        quote: ValueNegQuoteMapper[action.payload],
      };
      newItem.score = calcIdleMoveScore(newItem);
      newItem.rate = calcIdleMoveRate(newItem, state.totalScore);

      const diff = newItem.score * newItem.rate;
      state.totalScore = Math.floor(state.totalScore + diff);
      scoreStack.push(newItem);

      saveScoreToStorage(state.totalScore);
    },
  },
});

export const { checkin, idleMove } = scoreSlice.actions;

export default scoreSlice.reducer;
