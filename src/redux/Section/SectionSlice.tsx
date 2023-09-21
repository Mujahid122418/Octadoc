import { createSlice } from "@reduxjs/toolkit";

import { getSection, deleteSection } from "./SectionAPI";
interface Template {
  tempplate_id: string;
  name: string;
  order: string;
  _id: string;
}

interface TemplateArray {
  section: Template[];
  isLoading: Boolean;
  error: string;
  status: string;
  activeSection: string;
}

const initialState: TemplateArray = {
  section: [],
  isLoading: false,
  status: "",
  error: "",
  activeSection: "",
};

export const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    activeSectionFun: (state, action) => {
      state.activeSection = action.payload;
    },
  },
  extraReducers: {
    [getSection.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getSection.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.section = payload;
      state.isLoading = false;
    },
    [getSection.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },

    [deleteSection.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [deleteSection.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.section = payload;
      state.isLoading = false;
    },
    [deleteSection.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function

// export const { addTemplate, getTemplate, updateTemplate, deleteTemplate } =
//   templateSlice.actions;
export const { activeSectionFun } = sectionSlice.actions;
export default sectionSlice.reducer;
