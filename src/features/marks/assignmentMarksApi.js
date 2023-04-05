/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMark: builder.query({
      query: (id) => `/assignmentMark?student_id=${id}`
    }),
    getAssignmentMarkByAssignmentId: builder.query({
      query: ({ userId, assignmentId }) =>
        `/assignmentMark?student_id=${userId}&assignment_id=${assignmentId}`,
      providesTags: ["AssignmentMark"]
    }),
    getAssignmentMarks: builder.query({
      query: () => "/assignmentMark"
    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["AssignmentMark"]
    }),
    updateAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const mark = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentMarks",
              undefined,
              (draft) => {
                const draftTask = draft.find((c) => c.id == arg.id);

                const updatedTask = { ...draftTask, ...mark.data };
                // Replace the old task with the updated one
                const taskIndex = draft.findIndex((c) => c.id == arg.id);
                draft[taskIndex] = updatedTask;
                return draft;
              }
            )
          );
        } catch (err) {
          // ignore
        }
      }
    })
  })
});

export const {
  useAddAssignmentMarkMutation,
  useGetAssignmentMarkQuery,
  useGetAssignmentMarksQuery,
  useUpdateAssignmentMarkMutation,
  useGetAssignmentMarkByAssignmentIdQuery
} = quizzesApi;
