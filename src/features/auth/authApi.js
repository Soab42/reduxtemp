import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
              isAdmin: result.data.user.role === "admin"
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
              isAdmin: result.data.user.role === "admin"
            })
          );
        } catch (err) {
          // do nothing
        }
      }
    }),
    studentLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data
      }),
      async transformResponse(response) {
        const result = await response;
        if (result?.user.role === "admin") {
          throw new Error(
            "Access denied for Admin! Only student can access this."
          );
        }
        return result;
      },
      async transformErrorResponse(response) {
        throw new Error(response.data);
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data.user.role === "student") {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
                isAdmin: result.data.user.role === "admin"
              })
            );

            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
                isAdmin: result.data.user.role === "admin"
              })
            );
          }
        } catch (err) {
          // do nothing
        }
      }
    }),
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data
      }),
      async transformResponse(response) {
        const result = await response;
        if (result?.user.role === "student") {
          throw new Error(
            "Access denied for students! Only Admin can access this."
          );
        }
        return result;
      },
      async transformErrorResponse(response) {
        throw new Error(response.data);
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data.user.role === "admin") {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
                isAdmin: result.data.user.role === "admin"
              })
            );

            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
                isAdmin: result.data.user.role === "admin"
              })
            );
          }
        } catch (err) {
          // do nothing
        }
      }
    })
  })
});

export const {
  useStudentLoginMutation,
  useAdminLoginMutation,
  useRegisterMutation
} = authApi;
