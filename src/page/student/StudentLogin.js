/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/ui/Error";
import { useStudentLoginMutation } from "../../features/auth/authApi";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [studentLogin, { data, isLoading, error: responseError, isError }] =
    useStudentLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.message) {
      setError(responseError.message);
    } else if (data?.accessToken && data?.user) {
      navigate("/");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    studentLogin({
      email,
      password,
      role: "student"
    });
  };
  return (
    <>
      <Helmet>
        <title>Student Login</title>
      </Helmet>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img
              className="h-12 mx-auto"
              src="../assets/image/learningportal.svg"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Student Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="login-input rounded-b-md"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
            <div className="flex items-center justify-end mt-2">
              <div className="text-sm">
                Don't have an account?
                <Link
                  to="/registration"
                  className="font-medium text-violet-600 hover:text-violet-500 ml-2"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
          {!isError ? "" : <Error message={error} />}
        </div>
      </section>
    </>
  );
}
