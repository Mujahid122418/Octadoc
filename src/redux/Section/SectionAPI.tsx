import axios from "axios";
import { Baseurl } from "../../utils/BaseUrl";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSection = createAsyncThunk(
  "section/getSection",
  async (data: any) => {
    try {
      const response = await axios.get(
        Baseurl +
          `/section/section/?page=${data.page}&pageSize=${data.pageSize}&template_id=${data.tempplate_id}`
      );

      return response.data?.data;
    } catch (error) {
      console.log("section  error", error);

      console.log(error);
    }
  }
);

export const addSection = createAsyncThunk(
  "section/addSection",
  async (data: any) => {
    console.log("send data section", data);

    try {
      const response = await axios.post(Baseurl + "/section/section", data);
      console.log("response.data?.data section", response.data?.data);

      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteSection = createAsyncThunk(
  "section/deleteSection",
  async (data: any) => {
    console.log("data select", data);

    try {
      const response = await axios.delete(Baseurl + `/section/section/${data}`);
      console.log("delete section ==> ", response.data);

      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
