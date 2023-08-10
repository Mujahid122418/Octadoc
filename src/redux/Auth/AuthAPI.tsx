import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Baseurl } from "../../utils/BaseUrl";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export interface IAuth {
  user: any;
}

// export const getTemplates = createAsyncThunk(
//   "template/getTemplates",
//   async () => {
//     try {
//       const response = await axios.get(Baseurl + "/template/template");

//       return response.data?.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// export const deleteEmployee = createAsyncThunk(
//   "template/deleteTemplate",
//   async (id: string) => {
//     try {
//       console.log("id delete", id);

//       const response = await axios.delete(Baseurl + `/template/template/${id}`);
//       console.log("response", response?.data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   }
// );
export const LoginFun = createAsyncThunk("auth/login", async (data: any) => {
  try {
    const response = await axios.post(Baseurl + `/auth/login`, data);

    if (response?.data?.success) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("user", response?.data?.user?._id);
    }
    return response.data.user;
  } catch (error) {
    console.log("error auth api", error);
  }
});
export const getMeFun = createAsyncThunk("auth/getme", async (data: any) => {
  try {
    const response = await axios.post(Baseurl + `/auth/getme`, data);

    if (response?.data?.success) {
      return response.data.data;
    }
  } catch (error) {
    console.log("error auth getme api", error);
  }
});

// export const updateTemplate = createAsyncThunk(
//   "template/updateTemplate",
//   async (data: any) => {
//     try {
//       const response = await axios.put(
//         Baseurl + `/template/template/${data?.id}`,
//         data
//       );
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
