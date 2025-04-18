import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
    FaTachometerAlt, FaTasks, FaUsers, 
    FaProjectDiagram, FaCog, FaSignOutAlt, FaBars, FaTimes , FaUserCircle
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Hamburger Menu Button */}
            <button className="menu-btn" onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <h2>Task Manager</h2>
                <ul>
                    <li><Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
                    <li><Link to="/features"><FaTasks /> Features</Link></li>
                    <li><Link to="/employees"><FaUsers /> Employees</Link></li>
                    <li><Link to="/tasks"><FaTasks /> Tasks</Link></li>
                    <li><Link to="/teams"><FaUsers /> Teams</Link></li>
                
                    <li><Link to="/profile"><FaUserCircle /> Profile</Link></li>

            
                    {/* Divider Line */}
                    <hr className="sidebar-divider" />

                    <li><Link to="/projects"><FaProjectDiagram /> Projects</Link></li>
                    <li><Link to="/meetings"><FaTasks /> Meetings</Link></li>
                    <li><Link to="/settings"><FaCog /> Settings</Link></li>
                    <li className="logout" onClick={onLogout}><FaSignOutAlt /> Logout</li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
