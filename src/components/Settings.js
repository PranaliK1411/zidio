import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../styles/Settings.css";

const Settings = () => {
    const [settings, setSettings] = useState({
        username: "",
        email: "",
        darkMode: false,
        notifications: {
            email: true,
            push: false,
            reminders: "daily",
        },
        privacy: {
            twoFactorAuth: false,
            activeSessions: ["Web - Chrome", "Mobile - iOS"],
        },
        language: "English",
        timeFormat: "12hr",
        timezone: "GMT",
    });

    useEffect(() => {
        const storedSettings = JSON.parse(localStorage.getItem("userSettings"));
        if (storedSettings) {
            setSettings(storedSettings);
        }
    }, []);

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleToggle = (field) => {
        setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleNotificationChange = (field) => {
        setSettings((prev) => ({
            ...prev,
            notifications: { ...prev.notifications, [field]: !prev.notifications[field] },
        }));
    };

    const handleSaveSettings = () => {
        localStorage.setItem("userSettings", JSON.stringify(settings));
        Swal.fire("Success!", "Settings updated successfully.", "success");
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>

            {/* Account Settings */}
            <div className="settings-section">
                <h3>Account Settings</h3>
                <label>Username</label>
                <input type="text" name="username" value={settings.username} onChange={handleChange} />

                <label>Email</label>
                <input type="email" name="email" value={settings.email} disabled />
                <small>Email is not editable</small>
            </div>

            {/* Notifications */}
            <div className="settings-section">
                <h3>Notifications</h3>
                <label>
                    <input type="checkbox" checked={settings.notifications.email} onChange={() => handleNotificationChange("email")} />
                    Email Notifications
                </label>
                <label>
                    <input type="checkbox" checked={settings.notifications.push} onChange={() => handleNotificationChange("push")} />
                    Push Notifications
                </label>
                <label>
                    Task Reminders:
                    <select name="reminders" value={settings.notifications.reminders} onChange={handleChange}>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="off">Off</option>
                    </select>
                </label>
            </div>

            {/* Theme Settings */}
            <div className="settings-section">
                <h3>Theme</h3>
                <label>
                    <input type="checkbox" checked={settings.darkMode} onChange={() => handleToggle("darkMode")} />
                    Enable Dark Mode
                </label>
            </div>

            {/* Privacy & Security */}
            <div className="settings-section">
                <h3>Privacy & Security</h3>
                <label>
                    <input type="checkbox" checked={settings.privacy.twoFactorAuth} onChange={() => handleToggle("privacy.twoFactorAuth")} />
                    Enable Two-Factor Authentication
                </label>
                <h4>Active Sessions:</h4>
                <ul>
                    {settings.privacy.activeSessions.map((session, index) => (
                        <li key={index}>{session}</li>
                    ))}
                </ul>
            </div>

            {/* System Preferences */}
            <div className="settings-section">
                <h3>System Preferences</h3>
                <label>
                    Language:
                    <select name="language" value={settings.language} onChange={handleChange}>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                </label>
                <label>
                    Time Format:
                    <select name="timeFormat" value={settings.timeFormat} onChange={handleChange}>
                        <option value="12hr">12 Hour</option>
                        <option value="24hr">24 Hour</option>
                    </select>
                </label>
                <label>
                    Timezone:
                    <input type="text" name="timezone" value={settings.timezone} onChange={handleChange} />
                </label>
            </div>

            {/* Save Button */}
            <button className="save-btn" onClick={handleSaveSettings}>Save Settings</button>
        </div>
    );
};

export default Settings;
