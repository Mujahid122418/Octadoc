import axios from "axios";
import { Baseurl } from "../../utils/BaseUrl";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getinterest = createAsyncThunk(
  "interest/getinterest",
  async (data: any) => {
    try {
      const response = await axios.get(
        Baseurl +
          `/interest/interest/?page=${data.page}&pageSize=${data.pageSize}&template_id=${data.tempplate_id}`
      );

      return response.data?.data;
    } catch (error) {
      console.log("interest  error", error);

      console.log(error);
    }
  }
);

export const addinterest = createAsyncThunk(
  "interest/addinterest",
  async (data: any) => {
    console.log("send data interest", data);

    try {
      const response = await axios.post(Baseurl + "/interest/interest", data);
      console.log("response.data?.data interest", response.data?.data);

      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateinterest = createAsyncThunk(
  "interest/updateinterest",
  async (data: any) => {
    try {
      const response = await axios.put(
        Baseurl + `/interest/interest/${data.id}`,
        data
      );
      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteinterest = createAsyncThunk(
  "interest/deleteinterest",
  async (data: any) => {
    console.log("data select", data);

    try {
      const response = await axios.delete(
        Baseurl + `/interest/interest/${data}`
      );
      console.log("delete interest ==> ", response.data);

      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
