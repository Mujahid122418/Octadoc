import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  LoginFun,
  getMeFun,
  updateProfile,
  SignupFun,
  getAllUsers,
  checkEmail,
  sendOtp,
  updatePassword,
} from "./AuthAPI";
interface Login {
  user: any;
  isLoading: Boolean;
  error: string;
  status: string;
  allUsers: any[];
  checkEmail: string;
  isPurchasedModel: Boolean;
}

const initialState: Login = {
  user: {},
  isLoading: false,
  status: "",
  error: "",
  allUsers: [],
  checkEmail: "",
  isPurchasedModel: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handelUpdateUser: (state, action) => {
      state.allUsers = action.payload;
    },
    isPurchasedModelFun: (state, action) => {
      state.isPurchasedModel = action.payload;
    },
  },
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
    [checkEmail.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [checkEmail.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
      state.isLoading = false;
    },
    [checkEmail.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [sendOtp.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [sendOtp.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
      state.isLoading = false;
    },
    [sendOtp.rejected.type]: (state, action) => {
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
    [updatePassword.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [updatePassword.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
      state.isLoading = false;
    },
    [updatePassword.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [getAllUsers.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getAllUsers.fulfilled.type]: (state, payload) => {
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

export const { handelUpdateUser, isPurchasedModelFun } = authSlice.actions;

export default authSlice.reducer;
