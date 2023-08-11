import { createSlice } from "@reduxjs/toolkit";

interface TemplateArray {
  isLoading: Boolean;
  error: string;
  status: string;
  addQuestionModel: Boolean;
  addQuestionFollowupModel: Boolean;
  selectedQuestion: any;
}

const initialState: TemplateArray = {
  isLoading: false,
  status: "",
  error: "",
  addQuestionModel: false,
  addQuestionFollowupModel: false,
  selectedQuestion: {},
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
  },
});

// Action creators are generated for each case reducer function

// export const { addTemplate, getTemplate, updateTemplate, deleteTemplate } =
//   templateQuestionSlice.actions;
export const { addQuestionModelFun, addQuestionFollowupModelFun } =
  templateQuestionSlice.actions;
export default templateQuestionSlice.reducer;
