import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoginFun, getMeFun } from "./AuthAPI";
interface Login {
  user: any;
  isLoading: Boolean;
  error: string;
  status: string;
}

const initialState: Login = {
  user: {},
  isLoading: false,
  status: "",
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [LoginFun.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [LoginFun.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
      state.isLoading = false;
    },
    [LoginFun.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [getMeFun.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getMeFun.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
      state.isLoading = false;
    },
    [getMeFun.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function

// export const { addTemplate, getTemplate, updateTemplate, deleteTemplate } =
//   templateSlice.actions;

export default authSlice.reducer;
