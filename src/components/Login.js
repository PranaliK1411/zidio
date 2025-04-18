import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";


const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("⚠️ Email and password are required.");
            return;
        }

        setLoading(true);
        setError("");

        setTimeout(() => {
            const storedUser = localStorage.getItem("registeredUser");

            if (storedUser) {
                const { email: savedEmail, password: savedPassword } = JSON.parse(storedUser);

                if (email === savedEmail && password === savedPassword) {
                    localStorage.setItem("user", JSON.stringify({ email }));
                    onLogin(email);
                    navigate("/dashboard");
                } else {
                    setError("❌ Invalid email or password.");
                }
            } else {
                setError("❌ No user found. Please register first.");
            }

            setLoading(false);
        }, 1500);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin} autoComplete="off">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
                    Forgot Password?
                </p>

                <p>
                    Don't have an account?{" "}
                    <span className="forgot-password" onClick={() => navigate("/forgot-password")}></span>
                    <span className="register-link" onClick={() => navigate("/register")}>
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
