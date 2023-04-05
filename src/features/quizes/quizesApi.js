/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/quizzes"
    }),
    getQuizzesByVideoId: builder.query({
      query: (videoId) => ({
        url: `/quizzes?video_id=${videoId}`,
        force: true
      }),

      refetchOnMountOrArgChange: true
    }),
    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;

          // all Video pessimistic cache update start
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              draft.push(video.data);
            })
          );
          // pessimistic cache update end
        } catch (err) {
          console.log(err);
        }
      }
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quiz = await queryFulfilled;

          // all Video pessimistic cache update start
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              const draftTask = draft.find((c) => c.id == arg.id);

              const updatedTask = { ...draftTask, ...quiz.data };
              // Replace the old task with the updated one
              const taskIndex = draft.findIndex((c) => c.id == arg.id);
              draft[taskIndex] = updatedTask;
              return draft;
            })
          );
          dispatch(
            apiSlice.util.updateQueryData("getQuiz", arg.id, (draft) => {
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
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE"
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quiz = await queryFulfilled;

          // all Video pessimistic cache update start
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
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
  useAddQuizMutation,
  useDeleteQuizMutation,
  useEditQuizMutation,
  useGetQuizQuery,
  useGetQuizzesQuery,
  useGetQuizzesByVideoIdQuery
} = quizzesApi;
