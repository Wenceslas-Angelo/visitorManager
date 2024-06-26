import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import visitorReducer from "../features/visitor/visitorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    visitor: visitorReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
