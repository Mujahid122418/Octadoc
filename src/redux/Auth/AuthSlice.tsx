import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoginFun, getMeFun, updateProfile, SignupFun , getAllUsers } from "./AuthAPI";
interface Login {
  user: any;
  isLoading: Boolean;
  error: string;
  status: string;
  allUsers :any[];
}

const initialState: Login = {
  user: {},
  isLoading: false,
  status: "",
  error: "",
  allUsers : [],
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
    [SignupFun.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [SignupFun.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
      state.isLoading = false;
    },
    [SignupFun.rejected.type]: (state, action) => {
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
    [updateProfile.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [updateProfile.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
      state.isLoading = false;
    },
    [updateProfile.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [getAllUsers.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getAllUsers.fulfilled.type]: (state,  payload ) => {
      state.status = "success";
      state.allUsers = payload.payload;
      state.isLoading = false;
    },
    [getAllUsers.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function

// export const { addTemplate, getTemplate, updateTemplate, deleteTemplate } =
//   templateSlice.actions;

export default authSlice.reducer;
