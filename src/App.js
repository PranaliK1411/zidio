import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Features from "./components/Features";
import Tasks from "./components/Tasks";
import Employees from "./components/Employee";
import Teams from "./components/Teams";
import Projects from "./components/Projects";
import Meetings from "./components/Meeting";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import Register from "./components/Register";
import CustomNavbar from "./components/Navbar";
import TaskManager from "./components/TaskManager";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import TaskOverviewChart from "./components/TaskOverviewChart";
import MonthlyTaskPerformanceChart from "./components/MonthlyTaskPerformanceChart";
import VideoMeeting from "./components/VideoMeeting";



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Router>
       
 
            {/* Your other components */}
  
            {isLoggedIn ? (
                <div style={{ display: "flex" }}>
                    <Sidebar onLogout={handleLogout} />
                    
                    <div style={{ flex: 1, padding: "20px", marginLeft: "250px" }}>
                            <CustomNavbar />
                        <Routes>
                        
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/features" element={<Features />} />
                            <Route path="/employees" element={<Employees />} />
                            <Route path="/teams" element={<Teams />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/meetings" element={<Meetings />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/profile" element={<Profile />} /> {/* Add Profile Route */}
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/" element={<TaskManager />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/tasks" element={<TaskManager />} />  {/* Route TaskManager to /tasks */}
                            <Route path="*" element={<Navigate to="/dashboard" />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/taskOverviewChart" element={<TaskOverviewChart />} />
                            <Route path="/videoMeeting" element={<VideoMeeting />} />

                            <Route path="/MonthlyTaskPerformanceChart" element={<MonthlyTaskPerformanceChart />} />

                        </Routes>
                    </div>
                </div>
            ) : (
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;
