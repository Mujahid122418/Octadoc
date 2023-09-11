import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Baseurl } from "../../utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface IAuth {
  user: any;
}

export const addcategory = createAsyncThunk(
  "category/category",
  async (data: any) => {
    try {
      const response = await axios.post(Baseurl + `/category/category`, data);

      if (response?.data?.success) {
        toast.success("Category Added Successfully");
      } else {
        toast.error("Error");
      }
      return response.data.user;
    } catch (error) {
      console.log("error auth api", error);
      toast.error("Server Error");
    }
  }
);

export const getcategories = createAsyncThunk(
  "/category/category",
  async (page: any) => {
    try {
      const response = await axios.get(
        Baseurl + `/category/category?page=1&pageSize=${page.pagesize}`
      );

      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/category",
  async (id: string) => {
    try {
      await axios.delete(Baseurl + `/category/category/${id}`);
      toast.success("Category Deleted Successfully");
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const updatecategory = createAsyncThunk(
  "category/category",
  async (data: any) => {
    try {
      const response = await axios.put(
        Baseurl + `/category/category/${data.id}`,
        data
      );
      if (response.data?.success) {
        toast.success("category Updated Successfully");
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
