import React, { useEffect, useState } from "react";
import TaskManager from "./TaskManager";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from JSON Server
    useEffect(() => {
        fetch("http://localhost:5000/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error("Error fetching tasks:", error));
    }, []);

    return (
        <div>
           
            <TaskManager></TaskManager>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> - {task.assignee} → {task.assignedTo} ({task.duration}) 
                        <span style={{ color: task.status === "Completed" ? "green" : "red" }}> {task.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
