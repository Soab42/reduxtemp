/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Error from "../../components/ui/Error";
import { useRegisterMutation } from "../../features/auth/authApi";

export default function StudentRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isError, error }] = useRegisterMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, password, email, role: "student" };
    if (confirmPassword === password) {
      register(data);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Student Registration</title>
      </Helmet>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img
              className="h-12 mx-auto"
              src="../assets/image/learningportal.svg"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Student Registration Form
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Student Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="login-input"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="login-input "
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="sr-only">Password</label>
                <input
                  id="password"
                  name="ConfirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="login-input rounded-b-md"
                  placeholder="ConfirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <input type="checkbox" required />
                <label className="ml-2">
                  I agree to the
                  <Link
                    className="font-medium text-violet-600 hover:text-violet-500 ml-2"
                    to="#"
                  >
                    Terms &amp; Conditions
                  </Link>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Register
              </button>
            </div>
          </form>
          <div className="flex items-center justify-end mt-2">
            <div className="text-sm">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-violet-600 hover:text-violet-500 ml-2"
              >
                Login
              </Link>
            </div>
          </div>
          {!isError ? "" : <Error message={error.data} />}
        </div>
      </section>
    </div>
  );
}
