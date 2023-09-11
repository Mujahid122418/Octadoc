import { configureStore } from "@reduxjs/toolkit";
import TemplateReducer from "./Template/TemplateSlice";
import TemplateQuestionReducer from "./TemplateQuestion/TemplateQuestion";
import AuthReducer from "./Auth/AuthSlice";
import categoryReducer from "./Admin/CategorySlice";
import SectionReducer from "./Section/SectionSlice";

export const store = configureStore({
  reducer: {
    template: TemplateReducer,
    auth: AuthReducer,
    templateQuestion: TemplateQuestionReducer,
    category: categoryReducer,
    section: SectionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
