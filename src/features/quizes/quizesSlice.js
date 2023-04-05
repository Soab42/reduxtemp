/* eslint-disable no-param-reassign */
/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuizMark: (state, action) => action.payload
  }
});

export const { addQuizMark } = quizSlice.actions;
export default quizSlice.reducer;
