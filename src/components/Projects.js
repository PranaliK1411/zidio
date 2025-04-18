import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/Projects.css";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        assignedTeam: "",
        status: "Not Started",
        priority: "Medium",
        projectManager: "",
        budget: "",
        clientName: "",
        technologyStack: "",
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:5000/projects");
            if (!response.ok) throw new Error("Failed to fetch projects");
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    // Handle Input Change
    const handleInputChange = (e) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    // Add Project
    const addProject = async () => {
        if (!newProject.name || !newProject.description || !newProject.startDate || !newProject.endDate || !newProject.assignedTeam) {
            Swal.fire("Error!", "All required fields must be filled!", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject),
            });

            if (!response.ok) throw new Error("Failed to add project");
            const addedProject = await response.json();
            setProjects([...projects, addedProject]);
            setNewProject({
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                assignedTeam: "",
                status: "Not Started",
                priority: "Medium",
                projectManager: "",
                budget: "",
                clientName: "",
                technologyStack: "",
            });
            Swal.fire("Success!", "Project added successfully.", "success");
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    // Delete Project
    const deleteProject = (id) => {
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
                    await fetch(`http://localhost:5000/projects/${id}`, { method: "DELETE" });
                    setProjects(projects.filter((project) => project.id !== id));
                    Swal.fire("Deleted!", "Project has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting project:", error);
                }
            }
        });
    };

    return (
        <div className="projects-container">
            <h1>Projects</h1>
            <p>Manage your projects efficiently.</p>

            {/* Add Project Form */}
            <div className="add-project">
                <input type="text" name="name" placeholder="Project Name" value={newProject.name} onChange={handleInputChange} />
                <input type="text" name="description" placeholder="Description" value={newProject.description} onChange={handleInputChange} />
                <input type="date" name="startDate" value={newProject.startDate} onChange={handleInputChange} />
                <input type="date" name="endDate" value={newProject.endDate} onChange={handleInputChange} />
                <input type="text" name="assignedTeam" placeholder="Assigned Team" value={newProject.assignedTeam} onChange={handleInputChange} />
                <select name="status" value={newProject.status} onChange={handleInputChange}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                </select>
                <select name="priority" value={newProject.priority} onChange={handleInputChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
                <input type="text" name="projectManager" placeholder="Project Manager" value={newProject.projectManager} onChange={handleInputChange} />
                <input type="number" name="budget" placeholder="Budget" value={newProject.budget} onChange={handleInputChange} />
                <input type="text" name="clientName" placeholder="Client Name" value={newProject.clientName} onChange={handleInputChange} />
                <input type="text" name="technologyStack" placeholder="Technology Stack" value={newProject.technologyStack} onChange={handleInputChange} />
                <button className="add-btn" onClick={addProject}><FaPlus /> Add Project</button>
            </div>

            {/* Projects Table */}
            <div className="table-container">
                <table className="projects-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Assigned Team</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Project Manager</th>
                            <th>Budget</th>
                            <th>Client</th>
                            <th>Technology Stack</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <tr key={project.id}>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                    <td>{project.startDate}</td>
                                    <td>{project.endDate}</td>
                                    <td>{project.assignedTeam}</td>
                                    <td>{project.status}</td>
                                    <td>{project.priority}</td>
                                    <td>{project.projectManager}</td>
                                    <td>{project.budget}</td>
                                    <td>{project.clientName}</td>
                                    <td>{project.technologyStack}</td>
                                    <td>
                                        <button className="edit-btn"><FaEdit /></button>
                                        <button className="delete-btn" onClick={() => deleteProject(project.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12">No projects found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Projects;
