import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/users?role_ne=admin"
    }),
    getStudent: builder.query({
      query: (email) => `/users?email=${email}`
    })
  })
});

export const { useGetStudentsQuery, useGetStudentQuery } = usersApi;
