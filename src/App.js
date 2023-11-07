import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import StudentDashboard from "./student/StudentDashboard";
import StudentRegistration from "./student/StudentRegistration";

function App() {
  return (
    <Router>
      <Routes>
        {/* // student routes */}
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/registration" element={<StudentRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
