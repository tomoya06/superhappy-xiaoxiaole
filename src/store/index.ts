import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./score";
import gameReducer from './game';

const store = configureStore({
  reducer: {
    score: scoreReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: true,
    }
  }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
