import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Baseurl } from "../../utils/BaseUrl";

export const addQuestionFunAPI = createAsyncThunk(
  "question/addQuestion",
  async (data: any) => {
    try {
      const response = await axios.post(Baseurl + `/question/question`, data);

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
export const getSingleQuestionFun = createAsyncThunk(
  "question/singleQueston",
  async (data: any) => {
    try {
      const response = await axios.get(
        Baseurl +
          `/question/singleQueston/${data}?page=${data.page}&pageSize=${data.pageSize}`
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

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateAnswerFunAPI = createAsyncThunk(
  "answer/answer",
  async (data: any) => {
    try {
      const response = await axios.put(
        Baseurl + `/answer/answer/${data.id}`,
        data
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const DeleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (id: any) => {
    try {
      const response = await axios.delete(Baseurl + `/question/question/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
