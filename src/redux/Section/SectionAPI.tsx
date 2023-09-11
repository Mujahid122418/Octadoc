import axios from "axios";
import { Baseurl } from "../../utils/BaseUrl";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSection = createAsyncThunk(
  "section/getSection",
  async (data: any) => {
    try {
      const response = await axios.get(Baseurl + "/section/section");
      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addSection = createAsyncThunk(
  "section/addSection",
  async (data: any) => {
    console.log("send data", data);

    try {
      const response = await axios.post(Baseurl + "/section/section", data);
      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
