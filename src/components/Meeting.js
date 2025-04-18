import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaVideo } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/Meetings.css";
import VideoMeeting from "./VideoMeeting"; // 👈 Import VideoMeeting

const API_URL = "http://localhost:5000/meetings"; // JSON Server URL

const Meetings = () => {
    const [meetings, setMeetings] = useState([]);
    const [newMeeting, setNewMeeting] = useState({
        title: "",
        date: "",
        time: "",
        attendees: "",
        agenda: "",
        status: "Scheduled",
    });

    const [selectedMeetingRoom, setSelectedMeetingRoom] = useState(null); // 👈 New State

    useEffect(() => {
        fetchMeetings();
    }, []);

    const fetchMeetings = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Failed to fetch meetings");
            const data = await response.json();
            setMeetings(data);
        } catch (error) {
            console.error("Error fetching meetings:", error);
        }
    };

    const handleInputChange = (e) => {
        setNewMeeting({ ...newMeeting, [e.target.name]: e.target.value });
    };

    const addMeeting = async () => {
        if (!newMeeting.title || !newMeeting.date || !newMeeting.time || !newMeeting.attendees) {
            Swal.fire("Error!", "All fields are required.", "error");
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMeeting),
            });

            if (!response.ok) throw new Error("Failed to add meeting");
            const addedMeeting = await response.json();
            setMeetings([...meetings, addedMeeting]);
            setNewMeeting({ title: "", date: "", time: "", attendees: "", agenda: "", status: "Scheduled" });

            Swal.fire("Success!", "Meeting scheduled successfully.", "success");
        } catch (error) {
            console.error("Error adding meeting:", error);
        }
    };

    const deleteMeeting = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
                    setMeetings(meetings.filter((meeting) => meeting.id !== id));
                    Swal.fire("Deleted!", "Meeting has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting meeting:", error);
                }
            }
        });
    };

    const updateMeetingStatus = async (id, newStatus) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            setMeetings(
                meetings.map((meeting) =>
                    meeting.id === id ? { ...meeting, status: newStatus } : meeting
                )
            );
            Swal.fire("Updated!", "Meeting status updated.", "success");
        } catch (error) {
            console.error("Error updating meeting status:", error);
        }
    };

    const startVideoCall = (meeting) => {
        // You can use title or ID to generate a unique room name
        const roomName = `MeetingRoom-${meeting.id}`;
        setSelectedMeetingRoom(roomName);
    };

    return (
        <div className="meetings-container">
            <h1>Meetings</h1>
            <p>Schedule and manage your meetings efficiently.</p>

            <div className="add-meeting">
                <input type="text" name="title" placeholder="Meeting Title" value={newMeeting.title} onChange={handleInputChange} />
                <input type="date" name="date" value={newMeeting.date} onChange={handleInputChange} />
                <input type="time" name="time" value={newMeeting.time} onChange={handleInputChange} />
                <input type="text" name="attendees" placeholder="Attendees" value={newMeeting.attendees} onChange={handleInputChange} />
                <textarea name="agenda" placeholder="Agenda" value={newMeeting.agenda} onChange={handleInputChange}></textarea>
                <button className="add-btn" onClick={addMeeting}><FaPlus /> Schedule Meeting</button>
            </div>

            <div className="table-container">
                <table className="meetings-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Attendees</th>
                            <th>Agenda</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.length > 0 ? (
                            meetings.map((meeting) => (
                                <tr key={meeting.id}>
                                    <td>{meeting.title}</td>
                                    <td>{meeting.date}</td>
                                    <td>{meeting.time}</td>
                                    <td>{meeting.attendees}</td>
                                    <td>{meeting.agenda}</td>
                                    <td>
                                        <select
                                            value={meeting.status}
                                            onChange={(e) => updateMeetingStatus(meeting.id, e.target.value)}
                                        >
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Canceled">Canceled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="edit-btn"><FaEdit /></button>
                                        <button className="delete-btn" onClick={() => deleteMeeting(meeting.id)}>
                                            <FaTrash />
                                        </button>
                                        <button className="video-btn" onClick={() => startVideoCall(meeting)}>
                                            <FaVideo />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No meetings found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedMeetingRoom && (
                <VideoMeeting
                    roomName={selectedMeetingRoom}
                    onClose={() => setSelectedMeetingRoom(null)}
                />
            )}
        </div>
    );
};

export default Meetings;
