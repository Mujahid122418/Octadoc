import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Baseurl } from "../../utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { headers } from "../Template/TemplateAPI";

export const getAllUsers = createAsyncThunk("/auth/allUser", async () => {
  try {
    const response = await axios.get(Baseurl + "/auth/allUser", { headers });
    return response.data?.data;
  } catch (error) {
    console.log(error);
  }
});
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
export const SignupFun = createAsyncThunk(
  "auth/register",
  async (data: any) => {
    try {
      const response = await axios.post(
        Baseurl + `/auth/register`,
        { headers },
        data
      );

      if (response?.data?.success) {
        // localStorage.setItem("token", response?.data?.token);
        // localStorage.setItem("user", response?.data?.user?._id);
        toast.success("Account Created Successfully, Login First");
      } else {
        console.log("error signup api false", response?.data);
      }
      return response.data.user;
    } catch (error) {
      console.log("error auth api", error);
      toast.error("Server Error");
    }
  }
);
export const LoginFun = createAsyncThunk("auth/login", async (data: any) => {
  try {
    const response = await axios.post(
      Baseurl + `/auth/login`,
      { headers },
      data
    );

    if (response?.data?.success) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("user", response?.data?.data?._id);
    } else {
      console.log("error login api false", response?.data);
    }
    return response.data.user;
  } catch (error) {
    toast.error("Server Error");
    console.log("error auth api", error);
  }
});
export const getMeFun = createAsyncThunk("auth/getme", async (data: any) => {
  try {
    const response = await axios.post(
      Baseurl + `/auth/getme`,
      { headers },
      data
    );

    if (response?.data?.success) {
      return response.data.data;
    }
  } catch (error) {
    console.log("error auth getme api", error);
  }
});

export const updateProfile = createAsyncThunk(
  "auth/updatedetails",
  async (data: any) => {
    try {
      console.log("data update", data);

      const response = await axios.put(
        Baseurl + `/auth/updatedetails`,
        { headers },
        data
      );
      console.log("ressss", response.data);
      if (response.data?.success) {
        toast.success("Profile Updated Successfully");
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const checkEmail = createAsyncThunk(
  "auth/forgotPassword",
  async (data: any) => {
    let d = {
      email: data.email,
    };
    try {
      const response = await axios.post(Baseurl + `/auth/forgotPassword`, d);
      // console.log("e",response?.data);

      if (response?.data?.success) {
        toast.success("OTP Code Send On Your Gmail Successfully");
        localStorage.setItem("user-id", response?.data?.user?._id);
        data.navigate("/otp");
      } else {
        console.log("error signup api false", response?.data);
      }
      return response.data.user;
    } catch (error) {
      console.log("error auth api", error);
      toast.error("Server Error");
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatepassword",
  async (data: any) => {
    try {
      const response = await axios.put(
        Baseurl + `/auth/updatepassword`,
        { headers },
        data
      );
      console.log("ressss", response.data);
      if (response.data?.success) {
        toast.success("Password Updated Successfully");
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/resetpassword",
  async (data: any) => {
    let d = {
      user_id: data._id,
      otp: data.otp,
    };
    try {
      const response = await axios.put(
        Baseurl + `/auth/resetpassword/${d?.user_id}`,
        d
      );

      if (response?.data?.success) {
        toast.success("OTP Code Send On Your Gmail Successfully");
        data.navigate("/forgot");
      } else {
        console.log("error signup api false", response?.data);
        toast.error("OTP is incorrect");
      }
      return response.data.user;
    } catch (error) {
      console.log("error auth api", error);
      toast.error("Server Error");
    }
  }
);

// =========update role ========

export const updaterole = createAsyncThunk(
  "auth/updatedetails",
  async (data: any) => {
    console.log("update data", data);

    try {
      const response = await axios.put(
        Baseurl + `/auth/updatedetails`,
        { headers },
        data
      );
      console.log("ressss", response.data);
      if (response.data?.success) {
        toast.success("Updated Successfully");
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
