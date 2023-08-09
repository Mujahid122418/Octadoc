import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getTemplates, deleteEmployee } from "./TemplateAPI";
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
}

const initialState: TemplateArray = {
  template: [],
  isLoading: false,
  status: "",
  error: "",
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    addTemplate: (state) => {},
    getTemplate: (state) => {},
    updateTemplate: (state, action: PayloadAction<number>) => {},
    deleteTemplate: (state, action: PayloadAction<number>) => {},
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
  },
});

// Action creators are generated for each case reducer function

// export const { addTemplate, getTemplate, updateTemplate, deleteTemplate } =
//   templateSlice.actions;

export default templateSlice.reducer;
