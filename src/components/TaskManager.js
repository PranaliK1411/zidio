 import React, { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import "../styles/TaskManager.css";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const updateTaskStatus = (taskId, status) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status } : task)));
    };

    return (
        <div>
            <h1>Task Management</h1>
            <AddTask onAdd={addTask} />
            <TaskList tasks={tasks} onDelete={deleteTask} onUpdateStatus={updateTaskStatus} />
        </div>
    );
};

export default TaskManager;
 
