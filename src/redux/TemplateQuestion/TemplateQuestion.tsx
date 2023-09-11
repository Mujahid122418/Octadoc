import { createSlice } from "@reduxjs/toolkit";
import {
  getQuestion,
  getSingleQuestionFun,
  DeleteQuestion,
  getAnswers,
  DeleteAnswer,
} from "./TemplateQuestionAPI";

interface TemplateArray {
  isLoading: Boolean;
  error: string;
  status: string;
  addQuestionModel: Boolean;
  addQuestionFollowupModel: Boolean;
  editQuestionModel: Boolean;
  editQuestionFollowupModel: Boolean;
  EditSelectedQuestion: any;
  addQuestion: any;
  questionType: string;
  getQuestions: any;
  getAnswer: any;
  passQuestion: any;
  getSingleQuestion: any;
  EditAnswer: any;
  parent_id: string;
}

const initialState: TemplateArray = {
  isLoading: false,
  status: "",
  error: "",
  addQuestionModel: false,
  addQuestionFollowupModel: false,
  editQuestionModel: false,
  editQuestionFollowupModel: false,
  EditSelectedQuestion: [],
  addQuestion: [],
  questionType: "",
  getQuestions: [],
  getAnswer: [],
  passQuestion: {},
  getSingleQuestion: [],
  EditAnswer: {},
  parent_id: "",
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
    editQuestionModelFun: (state, action) => {
      state.editQuestionModel = action.payload;
    },
    editQuestionFollowupModelFun: (state, action) => {
      state.editQuestionFollowupModel = action.payload;
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
    ParentId_Fun: (state, action) => {
      state.parent_id = action.payload;
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
    [getAnswers.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getAnswers.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.getAnswer = payload;
    },
    [getAnswers.rejected.type]: (state, action) => {
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
    [DeleteQuestion.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [DeleteQuestion.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
    },
    [DeleteQuestion.rejected.type]: (state, action) => {
      state.isLoading = false;
    },

    [DeleteAnswer.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [DeleteAnswer.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
    },
    [DeleteAnswer.rejected.type]: (state, action) => {
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
  editQuestionModelFun,
  editQuestionFollowupModelFun,
  ParentId_Fun,
} = templateQuestionSlice.actions;
export default templateQuestionSlice.reducer;
