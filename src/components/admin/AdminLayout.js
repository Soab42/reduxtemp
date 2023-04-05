/* eslint-disable react/prop-types */
import React from "react";
import { Helmet } from "react-helmet";
import { Outlet, useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const location = useLocation();
  const pageName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  let content;
  if (pageName === "admin") {
    content = "Dashboard";
  } else if (pageName === "videos") {
    content = "Videos";
  } else if (pageName === "quiz") {
    content = "Quiz";
  } else if (pageName === "amark") {
    content = "Assignment Mark";
  } else if (pageName === "assignment") {
    content = "Assignment";
  } else {
    content = pageName;
  }

  return (
    <div>
      <Helmet titleTemplate="%s | LWS Admin Panel">
        <title>{content}</title>
      </Helmet>
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
