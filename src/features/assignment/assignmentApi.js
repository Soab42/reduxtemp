/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments"
    }),
    getAssignmentsByVideoId: builder.query({
      query: (videoId) => ({
        url: `/assignments?video_id=${videoId}`,
        force: true
      }),

      refetchOnMountOrArgChange: true
    }),
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;

          // all Video pessimistic cache update start
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                draft.push(video.data);
              }
            )
          );
          // pessimistic cache update end
        } catch (err) {
          console.log(err);
        }
      }
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const assignment = await queryFulfilled;

          // all Video pessimistic cache update start
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                const draftTask = draft.find((c) => c.id == arg.id);

                const updatedTask = { ...draftTask, ...assignment.data };
                // Replace the old task with the updated one
                const taskIndex = draft.findIndex((c) => c.id == arg.id);
                draft[taskIndex] = updatedTask;
                return draft;
              }
            )
          );
          dispatch(
            apiSlice.util.updateQueryData("getAssignment", arg.id, (draft) => {
              draft = assignment.data;
              return draft;
            })
          );
          // pessimistic cache update end
        } catch (err) {
          console.log(err);
        }
      }
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE"
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const assignment = await queryFulfilled;

          // all Video pessimistic cache update start
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                const draftTask = draft.filter((c) => c.id !== arg);

                return draftTask;
              }
            )
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
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useGetAssignmentsByVideoIdQuery
} = assignmentsApi;
