import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../styles/Teams.css";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState({
        name: "",
        lead: "",
        members: "",
        department: "Development",
        createdDate: "",
        status: "Active",
    });

    useEffect(() => {
        // Fetch existing teams from local storage (or API)
        const savedTeams = JSON.parse(localStorage.getItem("teams")) || [];
        setTeams(savedTeams);
    }, []);

    const handleAddTeam = () => {
        if (!newTeam.name || !newTeam.lead || !newTeam.members || !newTeam.createdDate) {
            Swal.fire("Error!", "All fields are required.", "error");
            return;
        }

        const updatedTeams = [...teams, { ...newTeam, id: Date.now() }];
        setTeams(updatedTeams);
        localStorage.setItem("teams", JSON.stringify(updatedTeams));

        setNewTeam({
            name: "",
            lead: "",
            members: "",
            department: "Development",
            createdDate: "",
            status: "Active",
        });

        Swal.fire("Success!", "Team added successfully.", "success");
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won’t be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTeams = teams.filter((team) => team.id !== id);
                setTeams(updatedTeams);
                localStorage.setItem("teams", JSON.stringify(updatedTeams));
                Swal.fire("Deleted!", "The team has been deleted.", "success");
            }
        });
    };

    return (
        <div className="teams-container">
            <h2>Teams Management</h2>
            <div className="add-team-form">
                <input type="text" placeholder="Team Name" value={newTeam.name} onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} />
                <input type="text" placeholder="Team Lead" value={newTeam.lead} onChange={(e) => setNewTeam({ ...newTeam, lead: e.target.value })} />
                <input type="text" placeholder="Members (comma-separated)" value={newTeam.members} onChange={(e) => setNewTeam({ ...newTeam, members: e.target.value })} />
                <select value={newTeam.department} onChange={(e) => setNewTeam({ ...newTeam, department: e.target.value })}>
                    <option>Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>HR</option>
                </select>
                <input type="date" value={newTeam.createdDate} onChange={(e) => setNewTeam({ ...newTeam, createdDate: e.target.value })} />
                <select value={newTeam.status} onChange={(e) => setNewTeam({ ...newTeam, status: e.target.value })}>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                <button className="add-btn" onClick={handleAddTeam}>Add Team</button>
            </div>

            <div className="teams-table-container">
                <table className="teams-table">
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Lead</th>
                            <th>Members</th>
                            <th>Department</th>
                            <th>Created Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.id}>
                                <td>{team.name}</td>
                                <td>{team.lead}</td>
                                <td>{team.members}</td>
                                <td>{team.department}</td>
                                <td>{team.createdDate}</td>
                                <td>{team.status}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(team.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Teams;
