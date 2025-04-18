import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Auth.css";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();

        const resetEmail = sessionStorage.getItem("resetEmail");
        if (!resetEmail) {
            Swal.fire("⚠️ Error", "Session expired! Try again.", "error");
            navigate("/forgot-password");
            return;
        }

        localStorage.setItem("userData", JSON.stringify({ email: resetEmail, password: newPassword }));
        sessionStorage.removeItem("resetEmail");

        Swal.fire("✅ Success", "Password has been reset successfully!", "success");
        navigate("/");
    };

    return (
        <div className="auth-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleReset}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
                <p onClick={() => navigate("/")}>Back to Login</p>
            </form>
        </div>
    );
};

export default ResetPassword;
