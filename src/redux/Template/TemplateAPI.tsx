import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Baseurl } from "../../utils/BaseUrl";

export const getTemplates = createAsyncThunk(
  "template/getTemplates",
  async () => {
    try {
      const response = await axios.get(Baseurl + "/template/template");
      console.log("response.data", response.data);

      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id: string) => {
    try {
      console.log("id delete", id);

      const response = await axios.delete(Baseurl + `/template/template/${id}`);
      console.log("response", response?.data);
    } catch (error) {
      console.log("error", error);
    }
  }
);
