import { createSlice } from "@reduxjs/toolkit";
import { getQuestion, getSingleQuestionFun } from "./TemplateQuestionAPI";

interface TemplateArray {
  isLoading: Boolean;
  error: string;
  status: string;
  addQuestionModel: Boolean;
  addQuestionFollowupModel: Boolean;
  EditSelectedQuestion: any;
  addQuestion: any;
  questionType: string;
  getQuestions: any;
  passQuestion: any;
  getSingleQuestion: any;
  EditAnswer: any;
}

const initialState: TemplateArray = {
  isLoading: false,
  status: "",
  error: "",
  addQuestionModel: false,
  addQuestionFollowupModel: false,
  EditSelectedQuestion: [],
  addQuestion: [],
  questionType: "",
  getQuestions: [],
  passQuestion: {},
  getSingleQuestion: [],
  EditAnswer: {},
};

export const templateQuestionSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    addQuestionModelFun: (state, action) => {
      state.addQuestionModel = action.payload;
    },
    addQuestionFollowupModelFun: (state, action) => {
      state.addQuestionFollowupModel = action.payload;
    },
    addQuestionFun: (state, action) => {
      state.addQuestion = action.payload;
    },
    questionTypeFun: (state, action) => {
      state.questionType = action.payload;
    },
    passQuestionFun: (state, action) => {
      state.passQuestion = action.payload;
    },
    EditSelectedQuestionFun: (state, action) => {
      state.EditSelectedQuestion = action.payload;
    },
    EditAnswerFun: (state, action) => {
      state.EditAnswer = action.payload;
    },
  },
  extraReducers: {
    [getQuestion.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getQuestion.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.getQuestions = payload;
    },
    [getQuestion.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [getSingleQuestionFun.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getSingleQuestionFun.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.getSingleQuestion = payload;
    },
    [getSingleQuestionFun.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function

// export const { addTemplate, getTemplate, updateTemplate, deleteTemplate } =
//   templateQuestionSlice.actions;
export const {
  addQuestionModelFun,
  addQuestionFollowupModelFun,
  addQuestionFun,
  questionTypeFun,
  passQuestionFun,
  EditSelectedQuestionFun,
  EditAnswerFun,
} = templateQuestionSlice.actions;
export default templateQuestionSlice.reducer;
