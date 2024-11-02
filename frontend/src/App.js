// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard"; // Import Dashboard
import AdminDashboard from "./AdminDashboard"; // Import Admin Navbar
import BookRoom from "./BookRoom";
import RoomDetails from "./RoomDetails";
import ComplaintRegistration from "./ComplaintRegistration"; // Import complaint registration
import ManageComplaints from "./ManageComplaints"; // Import admin dashboard
import StudentIssueDetails from "./StudentIssueDetails";

const App = () => {
  const userRole = localStorage.getItem('role'); // Assuming you store the user role in local storage after login

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="book-room" element={<BookRoom />} />
          <Route path="room-details" element={<RoomDetails />} />
          <Route path="complaint-registration" element={<ComplaintRegistration />} />
          <Route path="complaint-details" element={<StudentIssueDetails />} />
        </Route>
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="issue-details" element={<ManageComplaints />} />
          <Route path="room-details" element={<RoomDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;