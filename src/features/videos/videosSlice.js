/* eslint-disable no-param-reassign */
/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    addVideoToShow: (state, action) => action.payload
  }
});

export const { addVideoToShow } = videosSlice.actions;
export default videosSlice.reducer;
