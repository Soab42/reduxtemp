/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import { apiSlice } from "../api/apiSlice";
import { addVideoToShow } from "./videosSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const videos = await queryFulfilled;
        dispatch(addVideoToShow(videos?.data[0]));
      }
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;

          // all Video pessimistic cache update start
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(video.data);
            })
          );
          // pessimistic cache update end
        } catch (err) {
          console.log(err);
        }
      }
    }),
    updateVideo: builder.mutation({
      query: ({ id, videoData }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: videoData
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;

          // all Video pessimistic cache update start
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              const draftTask = draft.find((c) => c.id == arg.id);

              const updatedTask = { ...draftTask, ...video.data };
              // Replace the old task with the updated one
              const taskIndex = draft.findIndex((c) => c.id == arg.id);
              draft[taskIndex] = updatedTask;
              return draft;
            })
          );
          dispatch(
            apiSlice.util.updateQueryData("getVideo", arg.id, (draft) => {
              draft = quiz.data;
              return draft;
            })
          );
          // pessimistic cache update end
        } catch (err) {
          console.log(err);
        }
      }
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE"
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;

          // all Video pessimistic cache update start
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              const draftTask = draft.filter((c) => c.id !== arg);

              return draftTask;
            })
          );
          // pessimistic cache update end
        } catch (err) {
          console.log(err);
        }
      }
    })
  })
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation
} = videosApi;
