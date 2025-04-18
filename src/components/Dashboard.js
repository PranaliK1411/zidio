/* import React from "react";
import { Link } from "react-router-dom";
import { FaTasks, FaUsers, FaProjectDiagram, FaCalendarAlt, FaCog, FaUser, FaUsersCog } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const pieData = [
        { name: "Completed Tasks", value: 60 },
        { name: "Pending Tasks", value: 25 },
        { name: "Overdue Tasks", value: 15 }
    ];
    const COLORS = ["#00C49F", "#FFBB28", "#FF4444"];

    const barData = [
        { name: "Jan", completed: 12, pending: 6 },
        { name: "Feb", completed: 18, pending: 9 },
        { name: "Mar", completed: 22, pending: 11 },
        { name: "Apr", completed: 20, pending: 10 },
        { name: "May", completed: 30, pending: 15 },
    ];

    return (
        <div className="dashboard-container">
            <h1>Dashboard Overview</h1>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <FaTasks className="icon" />
                    <h2>Tasks</h2>
                    <p>85 Total</p>
                    <Link to="/tasks" className="view-link">View Tasks</Link>
                </div>
                <div className="stat-card">
                    <FaUsers className="icon" />
                    <h2>Employees</h2>
                    <p>20 Total</p>
                    <Link to="/employees" className="view-link">View Employees</Link>
                </div>
                <div className="stat-card">
                    <FaProjectDiagram className="icon" />
                    <h2>Projects</h2>
                    <p>15 Ongoing</p>
                    <Link to="/projects" className="view-link">View Projects</Link>
                </div>
                <div className="stat-card">
                    <FaCalendarAlt className="icon" />
                    <h2>Meetings</h2>
                    <p>7 Scheduled</p>
                    <Link to="/meetings" className="view-link">View Meetings</Link>
                </div>
                <div className="stat-card">
                    <FaCog className="icon" />
                    <h2>Features</h2>
                    <p>10 Available</p>
                    <Link to="/features" className="view-link">View Features</Link>
                </div>
                <div className="stat-card">
                    <FaUser className="icon" />
                    <h2>Profile</h2>
                    <p>Admin</p>
                    <Link to="/profile" className="view-link">View Profile</Link>
                </div>
                <div className="stat-card">
                    <FaUsersCog className="icon" />
                    <h2>Teams</h2>
                    <p>5 Active Teams</p>
                    <Link to="/teams" className="view-link">View Teams</Link>
                </div>
            </div>

            <div className="charts-container">
                <div className="chart-box">
                    <h2>Task Overview</h2>
                    <PieChart width={400} height={400}>
                        <Pie data={pieData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value" label>
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>

                <div className="chart-box">
                    <h2>Monthly Task Performance</h2>
                    <BarChart width={500} height={300} data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" fill="#00C49F" name="Completed Tasks" />
                        <Bar dataKey="pending" fill="#FFBB28" name="Pending Tasks" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
 */


import React from "react";
import { Link } from "react-router-dom";
import { FaTasks, FaUsers, FaProjectDiagram, FaCalendarAlt, FaCog, FaUser, FaUsersCog } from "react-icons/fa";
import TaskOverviewChart from "../components/TaskOverviewChart";
import MonthlyTaskPerformanceChart from "../components/MonthlyTaskPerformanceChart";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const pieData = [
        { name: "Completed Tasks", value: 60 },
        { name: "Pending Tasks", value: 25 },
        { name: "Overdue Tasks", value: 15 }
    ];

    const barData = [
        { name: "Jan", completed: 12, pending: 6 },
        { name: "Feb", completed: 18, pending: 9 },
        { name: "Mar", completed: 22, pending: 11 },
        { name: "Apr", completed: 20, pending: 10 },
        { name: "May", completed: 30, pending: 15 },
    ];

    return (
        <div className="dashboard-container">
            <h1>Dashboard Overview</h1>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <FaTasks className="icon" />
                    <h2>Tasks</h2>
                    <p>85 Total</p>
                    <Link to="/tasks" className="view-link">View Tasks</Link>
                </div>
                <div className="stat-card">
                    <FaUsers className="icon" />
                    <h2>Employees</h2>
                    <p>20 Total</p>
                    <Link to="/employees" className="view-link">View Employees</Link>
                </div>
                <div className="stat-card">
                    <FaProjectDiagram className="icon" />
                    <h2>Projects</h2>
                    <p>15 Ongoing</p>
                    <Link to="/projects" className="view-link">View Projects</Link>
                </div>
                <div className="stat-card">
                    <FaCalendarAlt className="icon" />
                    <h2>Meetings</h2>
                    <p>7 Scheduled</p>
                    <Link to="/meetings" className="view-link">View Meetings</Link>
                </div>
                <div className="stat-card">
                    <FaCog className="icon" />
                    <h2>Features</h2>
                    <p>10 Available</p>
                    <Link to="/features" className="view-link">View Features</Link>
                </div>
                <div className="stat-card">
                    <FaUser className="icon" />
                    <h2>Profile</h2>
                    <p>Admin</p>
                    <Link to="/profile" className="view-link">View Profile</Link>
                </div>
                <div className="stat-card">
                    <FaUsersCog className="icon" />
                    <h2>Teams</h2>
                    <p>5 Active Teams</p>
                    <Link to="/teams" className="view-link">View Teams</Link>
                </div>
            </div>

            <div className="charts-container">
                <TaskOverviewChart data={pieData} />
                <MonthlyTaskPerformanceChart data={barData} />
            </div>
        </div>
    );
};

export default Dashboard;
