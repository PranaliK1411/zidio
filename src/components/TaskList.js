import React, { useState } from "react";
import "../styles/TaskManager.css";
import Swal from "sweetalert2";

const TaskList = ({ tasks, onDelete, onUpdateStatus }) => {
    const handleStatusChange = (taskId, status) => {
        Swal.fire({
            title: `Mark task as ${status}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                onUpdateStatus(taskId, status);
                Swal.fire("Updated!", `Task marked as ${status}.`, "success");
            }
        });
    };

    return (
        <div>
            <h2>Task List</h2>
            {tasks.length === 0 ? <p>No tasks available</p> : null}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <strong>{task.title}</strong> - Assigned by: {task.assignedBy}, Assigned to: {task.assignedTo}
                        <br />
                        Duration: {task.duration} days
                        <br />
                        Status: <span className={`status ${task.status}`}>{task.status}</span>
                        <br />
                        <button onClick={() => handleStatusChange(task.id, "Completed")}>Completed</button>
                        <button onClick={() => handleStatusChange(task.id, "Rejected")}>Rejected</button>
                        <button onClick={() => onDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
