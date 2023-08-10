import { configureStore } from "@reduxjs/toolkit";
import TemplateReducer from "./Template/TemplateSlice";
import AuthReducer from "./Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    template: TemplateReducer,
    auth: AuthReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;