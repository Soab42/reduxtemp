/* eslint-disable react/prop-types */
import React from "react";
import { Helmet } from "react-helmet";
import { Outlet, useLocation } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";

const StudentLayout = () => {
  const location = useLocation();
  const pageName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  let content;
  if (pageName === "") {
    content = "Course Video Tutorial";
  } else if (pageName === "leaderboard") {
    content = "LeaderBoard";
  } else if (pageName === "quiz") {
    content = "Quiz";
  }
  return (
    <div>
      <Helmet titleTemplate="%s | LWS Learning Portal">
        <title>{content}</title>
      </Helmet>
      <StudentNavbar />
      <Outlet />
    </div>
  );
};

export default StudentLayout;
