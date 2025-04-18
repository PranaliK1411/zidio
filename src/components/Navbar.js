/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBell, FaUserCircle, FaBars, FaTimes, FaCamera, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // ✅ Store search input

    // Fetch logged-in user from localStorage
    const employee = JSON.parse(localStorage.getItem("user")) || {
        fullName: "John Doe",
        username: "johndoe123",
        email: "john.doe@example.com",
        tasksCompleted: 15,
    };

    // Handle Profile Photo Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    // Toggle Profile Dropdown
    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
    };

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem("loggedInUserId"); // Clear user session
        localStorage.removeItem("user"); // Remove stored user data
        navigate("/login"); // Redirect to Login page
    };

    // ✅ Handle Search Function
    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            alert("Please enter a search term!"); // Prevent empty search
            return;
        }
        navigate(`/search?query=${searchQuery}`); // Navigate to search results page
    };

    return (
        <nav className="navbar">
            {/* Back & Forward Buttons */}
            <div className="nav-left">
                <button onClick={() => navigate(-1)} className="nav-btn"><FaArrowLeft /></button>
                <button onClick={() => navigate(1)} className="nav-btn"><FaArrowRight /></button>
            </div>

            {/* Navbar Brand */}
            <div className="nav-brand">Task Manager</div>

            {/* ✅ Search Bar */}
            <div className="nav-search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery} // Bind state
                    onChange={(e) => setSearchQuery(e.target.value)} // Update state
                />
                <button onClick={handleSearch}>Search</button> {/* ✅ Handle click */}
            </div>

            {/* Notification & Profile */}
            <div className="nav-right">
                <FaBell className="nav-icon" />

                {/* Profile Dropdown */}
                <div className="profile-dropdown">
                    <button className="profile-btn" onClick={toggleProfile}>
                        <FaUserCircle />
                    </button>

                    {profileOpen && (
                        <div className="dropdown-content">
                            {/* Profile Image with Upload Options */}
                            <div className="profile-photo">
                                <img src={profilePic || "https://via.placeholder.com/100"} alt="Profile" />
                                <div className="upload-options">
                                    <label htmlFor="file-upload">
                                        <FaUpload /> Upload
                                    </label>
                                    <input id="file-upload" type="file" accept="image/*" onChange={handleFileUpload} hidden />

                                    <label htmlFor="camera-upload">
                                        <FaCamera /> Camera
                                    </label>
                                    <input id="camera-upload" type="file" accept="image/*" capture="user" onChange={handleFileUpload} hidden />
                                </div>
                            </div>

                            {/* Employee Details */}
                            <p><strong>Full Name:</strong> {employee.fullName}</p>
                            <p><strong>Username:</strong> {employee.username}</p>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Tasks Completed:</strong> {employee.tasksCompleted}</p>

                            <hr />
                            <a onClick={() => navigate("/settings")}>Settings</a>
                            <a onClick={handleLogout}>Logout</a>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <a onClick={() => navigate("/profile")}>View Profile</a>
                <a onClick={() => navigate("/settings")}>Settings</a>
                <a onClick={handleLogout}>Logout</a>
            </div>
        </nav>
    );
};

export default Navbar;
