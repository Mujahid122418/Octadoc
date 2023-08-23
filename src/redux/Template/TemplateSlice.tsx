import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getTemplates,
  deleteEmployee,
  addTemplate,
  updateTemplate,
} from "./TemplateAPI";
interface Template {
  template_name: string;
  description: string;
  category_id: string;
  template_type: string;
  isapprove: string;
  user_id: string;
  _id: string;
}

interface TemplateArray {
  template: Template[];
  isLoading: Boolean;
  error: string;
  status: string;
  addTemplateModel: Boolean;
  selectedTemplate: any;
  search : string;
}

const initialState: TemplateArray = {
  template: [],
  isLoading: false,
  status: "",
  error: "",
  addTemplateModel: true,
  selectedTemplate: {},
  search :"",
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    addTemplateModelFun: (state, action) => {
      state.addTemplateModel = action.payload;
    },
    selectTemplateModelFun: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    searchDataFun: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: {
    [getTemplates.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getTemplates.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.template = payload;
      state.isLoading = false;
    },
    [getTemplates.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [deleteEmployee.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [deleteEmployee.fulfilled.type]: (state, action) => {
      state.isLoading = false;
    },
    [deleteEmployee.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [addTemplate.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [addTemplate.fulfilled.type]: (state, action) => {
      state.isLoading = false;
    },
    [addTemplate.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [updateTemplate.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [updateTemplate.fulfilled.type]: (state, action) => {
      state.isLoading = false;
    },
    [updateTemplate.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function

// export const { addTemplate, getTemplate, updateTemplate, deleteTemplate } =
//   templateSlice.actions;
export const { addTemplateModelFun, selectTemplateModelFun ,searchDataFun } =
  templateSlice.actions;
export default templateSlice.reducer;
