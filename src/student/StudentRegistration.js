/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function StudentRegistration() {
  const home = useLocation().pathname === "/";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [data, setData] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [passError, setPassError] = useState(false);
  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setPassError(false);
    setError(setError);
    setData();
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const finalData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    // Configure the request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    };
    if (formData.password === formData.confirmPassword) {
      await fetch("http://localhost:4000/registration", requestOptions)
        .then((response) => {
          if (!response.ok) {
            setError(true);
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the response as JSON
        })
        .then((responseData) => {
          setData(responseData); // Update the state with the fetched data
          setLoading(false); // Set loading to false
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setError(true);

          setLoading(false); // Handle errors and set loading to false
        });
    } else {
      setPassError(true);
    }

    console.log(formData);
  };
  return (
    <div className="main">
      <nav className="flex h-10 justify-center items-center w-full gap-5 bg-cyan-600/20 mb-2">
        <div className={`btn ${home && "active"}`}>
          <Link to="/">Home</Link>
        </div>
        <div className={`btn ${!home && "active"}`}>
          <Link to="/registration">Registration</Link>
        </div>
      </nav>
      {data?.name && (
        <div className="pl-1/2 text-center p-3 bg-green-400/90 animate-left absolute top-20 -left-96">
          Welcome!{" "}
          <span className="font-bold text-blue-700 capitalize">
            {data?.name}
          </span>
          . Registration Successful
        </div>
      )}
      {isError && (
        <div className="pl-1/2 text-center p-3  bg-red-300/90 animate-left absolute top-20 -left-96">
          Sorry! Registration Unsuccessful
        </div>
      )}
      <div className="w-full flex justify-center">
        <form
          className="w-1/3 flex flex-col gap-2 items-center shadow-lg pb-20 px-4 shadow-black/20 rounded-xl text-sky-600"
          onSubmit={onSubmitHandler}
        >
          <div className="title w-1/2 text-sky-600">
            Student Registration Form
          </div>
          <div className="flex flex-col w-4/5 justify-center gap-2">
            <label htmlFor="">Name</label>
            <input
              onChange={onchangeHandler}
              className="h-10 bg-black/20 text-slate-500"
              type="text"
              value={formData.name}
              name="name"
            />
            <label htmlFor="">Email</label>
            <input
              onChange={onchangeHandler}
              className="h-10 bg-black/20 text-slate-500"
              type="email"
              name="email"
              id=""
              value={formData.email}
            />
            <label>Password</label>
            <input
              onChange={onchangeHandler}
              className="h-10 bg-black/20 text-slate-500"
              type="password"
              name="password"
              id=""
              value={formData.password}
            />
            <label>Confirm Password</label>
            <input
              onChange={onchangeHandler}
              className="h-10 bg-black/20 text-slate-500"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              id=""
            />
            {passError && (
              <div className="bg-red-300 text-center p-1 text-slate-700">
                Password don&apos;match
              </div>
            )}
            <button
              className="bg-green-400 opacity-80 hover:opacity-100 duration-500 text-black font-bold spacing-2 tracking-[.61em] p-2"
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
