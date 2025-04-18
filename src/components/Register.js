import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Clear form fields when the component mounts
    useEffect(() => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Validate Registration Form
    const validateForm = () => {
        setError(""); // Clear previous errors
        const { name, email, phone, password, confirmPassword } = formData;

        if (!name || !email || !phone || !password || !confirmPassword) {
            setError("⚠️ All fields are required.");
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("❌ Enter a valid email address.");
            return false;
        }

        // Phone number validation (10-digit number)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            setError("📞 Enter a valid 10-digit phone number.");
            return false;
        }

        // Strong password validation (at least 8 characters, one number, one special character)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password.match(passwordRegex)) {
            setError("🔒 Password must be at least 8 characters, include a number and a special character.");
            return false;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("⚠️ Passwords do not match.");
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true); // Prevent multiple submissions

        setTimeout(() => {
            // 🔹 Check if email is already registered
            const existingUser = localStorage.getItem("registeredUser");
            if (existingUser) {
                const { email: savedEmail } = JSON.parse(existingUser);
                if (formData.email === savedEmail) {
                    setError("⚠️ This email is already registered.");
                    setLoading(false);
                    return;
                }
            }

            // Store new user in localStorage
            localStorage.setItem("registeredUser", JSON.stringify(formData));

            alert("✅ Registration Successful! Redirecting to login...");
            navigate("/"); // Redirect to login page

            setLoading(false);
        }, 1500); // Simulating API delay
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} autoComplete="off">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required autoComplete="off"/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required autoComplete="off"/>
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required autoComplete="off"/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required autoComplete="new-password"/>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required autoComplete="new-password"/>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                <p>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/")}>Login</span>
                </p>
            </form>
        </div>
    );
};

export default Register;
