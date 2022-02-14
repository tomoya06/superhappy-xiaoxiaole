import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
  isChecking: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  isChecking: false,
};

export const gameSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    updateChecking: (state, action: PayloadAction<boolean>) => {
      state.isChecking = action.payload;
    },
  },
});
export const { updateChecking } = gameSlice.actions;

export default gameSlice.reducer;