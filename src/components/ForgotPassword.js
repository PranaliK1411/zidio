import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Auth.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();

        const storedUser = localStorage.getItem("userData");

        if (storedUser) {
            const { email: savedEmail } = JSON.parse(storedUser);

            if (email === savedEmail) {
                // Store the email in session storage for reset password
                sessionStorage.setItem("resetEmail", email);
                navigate("/reset-password"); // Navigate to reset password page
            } else {
                Swal.fire("❌ Error", "No user found with this email.", "error");
            }
        } else {
            Swal.fire("❌ Error", "No user found. Please register first.", "error");
        }
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleReset}>
                <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Next</button>
                <p onClick={() => navigate("/")}>Back to Login</p>
            </form>
        </div>
    );
};

export default ForgotPassword;
