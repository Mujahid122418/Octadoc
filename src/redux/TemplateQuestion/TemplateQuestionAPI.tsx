import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Baseurl } from "../../utils/BaseUrl";

export const addQuestionFunAPI = createAsyncThunk(
  "question/addQuestion",
  async (data: any) => {
    try {
      console.log("receive data", data);

      const response = await axios.post(Baseurl + `/question/question`, data);
      console.log("res add question", response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getQuestion = createAsyncThunk(
  "question/getQuestion",
  async (data: any) => {
    try {
      const response = await axios.get(
        Baseurl +
          `/question/question?page=${data.page}&pageSize=${data.pageSize}`
      );

      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addAnswerFunAPI = createAsyncThunk(
  "answer/addAnswer",
  async (data: any) => {
    try {
      const response = await axios.post(Baseurl + `/answer/answer`, data);
      console.log("res add question", response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAnswerFunAPI = createAsyncThunk(
  "answer/getAnswer",
  async (data: any) => {
    try {
      const response = await axios.post(Baseurl + `/answer/answer`, data);
      console.log("res add question", response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
