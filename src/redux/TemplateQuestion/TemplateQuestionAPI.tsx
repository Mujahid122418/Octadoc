import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Baseurl } from "../../utils/BaseUrl";
import { toast } from "react-toastify";

export const addQuestionFunAPI = createAsyncThunk(
  "/addQuestion",
  async (data: any) => {
    try {
      const response = await axios.post(Baseurl + `/question`, data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const UpdateQuestionFunAPI = createAsyncThunk(
  "/addQuestion",
  async (data: any) => {
    try {
      const response = await axios.put(Baseurl + `/question/${data?.id}`, data);
      toast.success("Updated successfully");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getQuestion = createAsyncThunk(
  "/getQuestion",
  async (data: any) => {
    try {
      const response = await axios.get(
        Baseurl + `/question?page=${data.page}&pageSize=${data.pageSize}`
      );

      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAnswers = createAsyncThunk("/getAnswers", async (data: any) => {
  try {
    // alert("ans");
    const response = await axios.get(
      Baseurl + `/answer/answer?page=${data?.page}&pageSize=${data?.pageSize}`
    );

    return response.data?.data;
  } catch (error) {
    console.log("error getanswer", error);
  }
});
export const getSingleQuestionFun = createAsyncThunk(
  "/singleQueston",
  async (data: any) => {
    console.log("data call", data);

    try {
      const response = await axios.get(
        Baseurl +
          `/singleQueston/${data?.id}?page=${data.page}&pageSize=${data.pageSize}`
      );
      console.log(" response api", response.data?.data);

      return response.data?.data;
    } catch (error) {
      console.log("error in api", error);
    }
  }
);

export const addAnswerFunAPI = createAsyncThunk(
  "answer/addAnswer",
  async (data: any) => {
    console.log(data, "data===>");
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
        Baseurl + `/answer/answer/${data?.id}`,
        data
      );
      // toast.success("Answer Updated SuccessFully");
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
export const DeleteAnswer = createAsyncThunk(
  "answer/answer",
  async (id: any) => {
    try {
      const response = await axios.delete(Baseurl + `/answer/answer/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const add_FollowUp_FunAPI = createAsyncThunk(
  "question/followUp",
  async (data: any) => {
    try {
      const response = await axios.post(Baseurl + `/followup/followup`, data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
