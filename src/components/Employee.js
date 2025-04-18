import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/Employees.css";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        email: "",
        role: "",
        department: "",
        joiningDate: "",
        status: "Active",
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:5000/employees");
            if (!response.ok) throw new Error("Failed to fetch employees");
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleInputChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const addEmployee = async () => {
        if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.department || !newEmployee.joiningDate) {
            Swal.fire("Error!", "All fields are required.", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEmployee),
            });

            if (!response.ok) throw new Error("Failed to add employee");
            const addedEmployee = await response.json();
            setEmployees([...employees, addedEmployee]);
            setNewEmployee({ name: "", email: "", role: "", department: "", joiningDate: "", status: "Active" });
            Swal.fire("Success!", "Employee added successfully.", "success");
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    const deleteEmployee = (id) => {
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
                    await fetch(`http://localhost:5000/employees/${id}`, { method: "DELETE" });
                    setEmployees(employees.filter((employee) => employee.id !== id));
                    Swal.fire("Deleted!", "Employee has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting employee:", error);
                }
            }
        });
    };

    return (
        <div className="employees-container">
            <h1>Employees</h1>
            <p>Manage your employees efficiently.</p>

            <div className="add-employee">
                <input type="text" name="name" placeholder="Employee Name" value={newEmployee.name} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={newEmployee.email} onChange={handleInputChange} />
                <input type="text" name="role" placeholder="Role" value={newEmployee.role} onChange={handleInputChange} />
                <input type="text" name="department" placeholder="Department" value={newEmployee.department} onChange={handleInputChange} />
                <input type="date" name="joiningDate" placeholder="Joining Date" value={newEmployee.joiningDate} onChange={handleInputChange} />
                <button className="add-btn" onClick={addEmployee}><FaPlus /> Add Employee</button>
            </div>

            <div className="table-container">
                <table className="employees-table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Joining Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.joiningDate}</td>
                                    <td>{employee.status}</td>
                                    <td>
                                        <button className="edit-btn"><FaEdit /></button>
                                        <button className="delete-btn" onClick={() => deleteEmployee(employee.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No employees found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employees;
