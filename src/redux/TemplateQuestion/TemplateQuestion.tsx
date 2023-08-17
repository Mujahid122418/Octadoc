import { createSlice } from "@reduxjs/toolkit";
import { addQuestionFunAPI, getQuestion } from "./TemplateQuestionAPI";

interface TemplateArray {
  isLoading: Boolean;
  error: string;
  status: string;
  addQuestionModel: Boolean;
  addQuestionFollowupModel: Boolean;
  selectedQuestion: any;
  addQuestion: any;
  questionType: string;
  getQuestions: any;
  passQuestion: any;
}

const initialState: TemplateArray = {
  isLoading: false,
  status: "",
  error: "",
  addQuestionModel: false,
  addQuestionFollowupModel: false,
  selectedQuestion: {},
  addQuestion: [],
  questionType: "",
  getQuestions: [],
  passQuestion: {},
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
} = templateQuestionSlice.actions;
export default templateQuestionSlice.reducer;
