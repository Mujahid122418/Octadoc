import { createSlice } from "@reduxjs/toolkit";

import { getinterest, deleteinterest } from "./InterestAPI";
interface Template {
  tempplate_id: string;
  name: string;
  order: string;
  _id: string;
}

interface TemplateArray {
  interest: Template[];
  isLoading: Boolean;
  error: string;
  status: string;
  activeinterest: string;
}

const initialState: TemplateArray = {
  interest: [],
  isLoading: false,
  status: "",
  error: "",
  activeinterest: "",
};

export const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {
    activeinterestFun: (state, action) => {
      state.activeinterest = action.payload;
    },
  },
  extraReducers: {
    [getinterest.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getinterest.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.interest = payload;
      state.isLoading = false;
    },
    [getinterest.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },

    [deleteinterest.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [deleteinterest.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.interest = payload;
      state.isLoading = false;
    },
    [deleteinterest.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function

// export const { addTemplate, getTemplate, updateTemplate, deleteTemplate } =
//   templateSlice.actions;
export const { activeinterestFun } = interestSlice.actions;
export default interestSlice.reducer;
