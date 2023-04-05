import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMark: builder.query({
      query: (id) => `/quizMark?student_id=${id}`
    }),
    getQuizMarks: builder.query({
      query: () => "/quizMark"
    }),
    getQuizMarkByVideoId: builder.query({
      query: ({ userId, videoId }) =>
        `/quizMark?student_id=${userId}&video_id=${videoId}`
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data
      })
    })
  })
});

export const {
  useGetQuizMarkQuery,
  useGetQuizMarksQuery,
  useGetQuizMarkByVideoIdQuery,
  useAddQuizMarkMutation
} = quizzesApi;
