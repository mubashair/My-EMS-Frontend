import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById } from '../services/EmployeeService';
import { updateEmployee } from '../services/EmployeeService';

const EditEmployee = () => {
    //1-Get the employee ID from the route like /edit-employee/1
    const{id} = useParams();//This gives employee ID from route
    const navigate = useNavigate();

    //2-state to hold employee data
    //always initialize the state with defaults 
    //so input stay controlled
    const[employee, setEmployee] = useState({
      firstName : '',
      lastName : '',
      email : '',
      activeState : false
    });
    //3- state for errors or success messages
    const[errorMessage, setErrorMessage] = useState('');
    const[successMessage, setSuccessMessage] = useState('');
    
    // 4- Fetch employee details when component mounts
    //// Fetch existing employee once when component mounts 
    // (or when id changes)
    useEffect(()=>{
      // guard: no id nothing to load
      if(!id) return; 
      getEmployeeById(id)
      .then(response => {
        const emp = response.data;
        //defensive assignment: ensure no undefined values
        setEmployee({
          firstName : emp.firstName ?? '',
          lastName : emp.lastName ?? '',
          email : emp.email ?? '',
          activeState : emp.activeState ?? false
        });//populate form
      })
      .catch(error=>{
        console.error("Failed to load employee data", error);
        setErrorMessage("Unable to fetch employee details");
      });
      
    }, [id]);
    // 5- Handle form field change
    // Handle input change
    const HandleChange = (e) => {
        const{name, value, type, checked} = e.target;
        setEmployee(prev=>({
          ...prev,
          // support checkbox if you have active state as checkbox
          [name] : type === 'checkbox' ? checked : value

        }));
    };

    //6-Handle the form submit
    //submit the updated employee
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrorMessage('');
      setSuccessMessage('');

      updateEmployee(id, employee)
      .then(()=>{
        setSuccessMessage("Employee updated successfully");
        // Go back to list after a moment (optional)
        setTimeout(()=>{
          navigate('/');
        }, 1200)
      })
      .catch(error=>{
        console.error("Update failed..", error);
        setErrorMessage("Something went wrong. Please try again");
      });
    };

  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>Edit Employee</h2>
      {/* Show messages */}
      {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
      {successMessage && <div className='alert alert-success'>{successMessage}</div>}
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='firstName' className='form-label'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            name='firstName'
            value={employee.firstName}
            onChange={HandleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='lastName' className='form-label'>Last Name</label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            name='lastName'
            value={employee.lastName}
            onChange={HandleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input
            type='text'
            className='form-control'
            id='email'
            name='email'
            value={employee.email}
            onChange={HandleChange}
            required
          />
        </div>
         {/* Optional activeState checkbox */}
        <div className="mb-3 form-check">
          <input
            id="activeState"
            name="activeState"
            type="checkbox"
            className="form-check-input"
            checked={employee.activeState}
            onChange={HandleChange}

          />
          <label htmlFor="activeState" className="form-check-label">
            Active
          </label>
        </div>
        <button type='submit' className='btn btn-primary'>Update</button>
        <button type='button' className='btn btn-secondary ms-2'
        onClick={()=> navigate('/')}>
        Cancel
        </button>
      </form>
    </div>
  );
};
export default EditEmployee