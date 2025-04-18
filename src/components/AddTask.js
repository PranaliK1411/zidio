import React, { useState } from "react";
import Swal from "sweetalert2";

const AddTask = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [assignedBy, setAssignedBy] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !assignedBy || !assignedTo || !duration) {
            Swal.fire("Error", "Please fill all fields", "error");
            return;
        }

        onAdd({ id: Date.now(), title, assignedBy, assignedTo, duration, status: "Pending" });

        Swal.fire("Success", "Task Added Successfully!", "success");
        setTitle("");
        setAssignedBy("");
        setAssignedTo("");
        setDuration("");
    };

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Assigned By" value={assignedBy} onChange={(e) => setAssignedBy(e.target.value)} required />
                <input type="text" placeholder="Assigned To" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required />
                <input type="number" placeholder="Duration (in days)" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
 
