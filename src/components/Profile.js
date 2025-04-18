import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../styles/Profile.css";

const Profile = () => {
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        phone: "",
        role: "",
        department: "",
        profilePicture: "",
        joiningDate: "",
        status: "Active",
        password: "",
        newPassword: "",
    });

    useEffect(() => {
        // Simulate fetching user data from localStorage or API
        const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
        if (storedProfile) {
            setProfile(storedProfile);
        }
    }, []);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = () => {
        localStorage.setItem("userProfile", JSON.stringify(profile));
        Swal.fire("Success!", "Profile updated successfully.", "success");
    };

    const handleChangePassword = () => {
        if (!profile.password || !profile.newPassword) {
            Swal.fire("Error!", "Both password fields are required.", "error");
            return;
        }
        Swal.fire("Success!", "Password changed successfully.", "success");
        setProfile({ ...profile, password: "", newPassword: "" });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, profilePicture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            <div className="profile-card">
                <div className="profile-picture">
                    <img src={profile.profilePicture || "https://via.placeholder.com/150"} alt="Profile" />
                    <input type="file" accept="image/*" onChange={handleFileUpload} />
                </div>

                <div className="profile-info">
                    <label>Full Name</label>
                    <input type="text" name="fullName" value={profile.fullName} onChange={handleInputChange} />

                    <label>Email</label>
                    <input type="email" name="email" value={profile.email} disabled />
                    <small>Contact admin to update email</small>

                    <label>Phone</label>
                    <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} />

                    <label>Role</label>
                    <input type="text" name="role" value={profile.role} disabled />
                    <small>Assigned by admin</small>

                    <label>Department</label>
                    <input type="text" name="department" value={profile.department} onChange={handleInputChange} />

                    <label>Joining Date</label>
                    <input type="date" name="joiningDate" value={profile.joiningDate} onChange={handleInputChange} />

                    <label>Status</label>
                    <select name="status" value={profile.status} onChange={handleInputChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <button className="update-btn" onClick={handleProfileUpdate}>Update Profile</button>
                </div>

                <div className="change-password">
                    <h3>Change Password</h3>
                    <input type="password" name="password" placeholder="Current Password" value={profile.password} onChange={handleInputChange} />
                    <input type="password" name="newPassword" placeholder="New Password" value={profile.newPassword} onChange={handleInputChange} />
                    <button className="password-btn" onClick={handleChangePassword}>Change Password</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
