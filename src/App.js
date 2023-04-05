/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AddQuizModal from "./components/admin/AddQuiz";
import AdminLayout from "./components/admin/AdminLayout";
import StudentLayout from "./components/student/StudentLayout";
import useAuthCheck from "./hooks/useAuthCheck";
import Test from "./page/Test";
import AdminLogin from "./page/admin/AdminLogin";
import Assignment from "./page/admin/AssignmentA";
import AssignmentMark from "./page/admin/AssignmentMark";
import Dashboard from "./page/admin/Dashboard";
import Quiz from "./page/admin/Quiz";
import Videos from "./page/admin/Videos";
import CoursePlayer from "./page/student/CoursePlayer";
import LeaderBoard from "./page/student/LeaderBoard";
import Quizes from "./page/student/Quizes";
import StudentLogin from "./page/student/StudentLogin";
import StudentRegistration from "./page/student/StudentRegistration";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        // student routes
        <Route
          path="/login"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <StudentRegistration />
            </PublicRoute>
          }
        />
        //private routes
        <Route
          path="/"
          element={
            <PrivateRoute>
              <StudentLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<CoursePlayer />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="test" element={<Test />} />
          <Route path="/quiz/:video_id" element={<Quizes />} />
        </Route>
        // admin routes
        <Route path="/admin/login" element={<AdminLogin />} />
        // private routes
        <Route
          path="/admin/"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="assignment" element={<Assignment />} />
          <Route path="amark" element={<AssignmentMark />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="addquiz" element={<AddQuizModal />} />
          <Route path="videos" element={<Videos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
