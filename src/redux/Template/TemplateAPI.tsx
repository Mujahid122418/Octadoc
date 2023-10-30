import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Baseurl } from "../../utils/BaseUrl";
export interface ITemplate {
  template_name: number;
  description: string;
  category_id: string;
  template_type: any;
  isapprove: any;
  user_id: string;
}
export const headers = {
  "Access-Control-Allow-Origin": "*",
  // "Content-Type": "application/json",
};

export const getTemplates = createAsyncThunk(
  "template/getTemplates",
  async () => {
    try {
      
      const response = await axios.get(Baseurl + "/template/template", 
      );
      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  "template/deleteTemplate",
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
export const addTemplate = createAsyncThunk(
  "template/addTemplate",
  async (data: any) => {
    try {
      const response = await axios.post(Baseurl + `/template/template`, data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateTemplate = createAsyncThunk(
  "template/updateTemplate",
  async (data: any) => {
    try {
      const response = await axios.put(
        Baseurl + `/template/template/${data?.id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
