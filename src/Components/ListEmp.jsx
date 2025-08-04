// 1. Import React (needed to use JSX syntax)
import React, { useEffect, useState } from 'react'
import { deleteEmployee, fetchEmployees } from '../services/EmployeeService';
// used to navigate to another page
import { useNavigate } from 'react-router-dom';
// 2. Define a functional component named ListEmp
const ListEmp = () => {
  
  
        // Initial empty state
        const [employees, setEmployees] = useState([]);
        const navigate = useNavigate();
        //load employees on mount
        // Fetch employees when component loads
          useEffect(()=>{
            loadEmployees();
          },[]);
          //Helper to fetch and set employees
          const loadEmployees = () =>{
            fetchEmployees().then((response)=>{
              console.log("API Response", response.data);
              //Defensive check exract array from response structure 
              //const empList = Array.isArray(response.data) 
              //? response.data
              //: Array.isArray(response.data.data)
              //? response.data.data
              //: [];
              setEmployees(response.data);
            }).catch(error=>{
              console.error("Error fetching employees..", error);
            })
          };
          //navigate to an add new employee page.
          const addNewEmployee=()=>{
            navigate('/add-employee');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            // make sure this route exist in your router
          };
          // navigate to edit employee page
          const editEmployee = (id) => {
            navigate(`/edit-employee/${id}`);
          };
          //Delete Handler
          const handleDelete = (id) =>{
            if(!window.confirm(
              'Are you sure you want to delete this employee'
            ))
            return;// Exit if user cancels
            // Call backend API to delete the employee
            deleteEmployee(id)
            .then((res)=>{
              // reload employees from backend after deletion
              loadEmployees();
            })
            .catch((error)=>{
              console.error("Error deleting employee");
              alert("Failed to delete employee. please try again");
            });
          };
      
 // 4. Return the JSX UI to be rendered in browser
  return (
    <div className='container mt-5'>
        {/* Heading */}
        <h1 className='text-center mb-4'>List of Employees</h1>
        {/* button for adding new employee */}
        <button className='btn btn-primary mb-2'onClick={addNewEmployee}>
          Add New Employee
        </button>
        {/* table to display employee data */}
        <table className='table table-striped table-bordered shadow'>
          <thead className='table-dark'>
            <tr>
              {/* column for id */}
              <th>ID</th> 
              {/* column for first name */}
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              {/* new column for buttons */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.length > 0 ?(
              // iterate over dummy data array and render each employee as table row
              //Loop through each employee and display a table row
              employees.map(emp=>(
                // unique key helps react to identify each row
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>
                    {/* Show a green or red badge based on activeState
                    <span className={`badge ${emp.activeState ? 'bg-success' : 'bg-danger'}`}>
                      {emp.activeState ? 'Active' : 'Inactive'}
                    </span> */}
                  <td>
                    {/* Edit button */}
                    <button
                    className='btn btn-sm btn-warning me-2'
                    onClick={()=>editEmployee(emp.id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    {/* Delete button */}
                    <button
                    className='btn btn-danger'
                    onClick={()=>handleDelete(emp.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='text-center'>No Employee Found</td>
              </tr>
            )
            }
          </tbody>
        </table>
    </div>
  )
}
// export component so it can be imported in other files
export default ListEmp