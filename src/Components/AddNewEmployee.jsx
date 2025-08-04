import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createEmployee} from '../services/EmployeeService';
const AddNewEmployee = () => {
//  state to hold form input values
const [employee, setEmployee] = useState({
  firstName : '',
  lastName : '',
  email : ''

});
 // State to show any error messages (like duplicate email)
 const[errorMessage, setErrorMessage] = useState('');
 //state to show success message after form submission
const[successMessage, setSuccessMessage] = useState('');
// Hook to navigate programtically after form submission
 // Hook to navigate to another page (e.g. home page)
const navigate = useNavigate();
// Handle input field changes
//Handle input changes for all fields
const handleChange = (e)=>{
  const {name, value} = e.target;
  //Update only changed field in the employee object
  setEmployee((prev)=>({
    // spread operator
    ...prev,//Keep existing data
    [name] : value//update the field by name(firstName/lastName/email)
  }));
};
// handle form submission
const handleSubmit = (e) => {
  e.preventDefault();//prevent page reload on form submit
  //clear any previous error message
  setErrorMessage('');
  //Clear any previous success message
  setSuccessMessage('');
  // Call the backend API to save employee/to create a new employee 
  createEmployee(employee)
  .then(()=>{
    //alert("Employee added successfully!");
    //show the success message
    setSuccessMessage("Employee added successfully");
    //clear/reset the form
    setEmployee({
      firstName : '',
      lastName : '',
      email : ''
    });
    //wait 2 seconds and then redirect to home page
    // Redirect back to employee list
    //if successful navigate to home page(employee list)
    // setTimeout(()=>{
    //    navigate('/');
    // }, 2000);
  })
  .catch((error)=>{
    //Handle duplicate email error (Http 409 conflict)
    if(error.response && error.response.status == 409){
      setErrorMessage("Email already exist. Please use different one");
    }
    else{
      
      alert("Something went wrong please try again.");
      setErrorMessage("An error occured. Please try again later");
    }
    //log the full error to browser console for debugging
    console.error("Error creating employee..", error);
    
  });
};
  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>Please Add New Employee</h2>
      {/* show error message if exists */}
      {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
      {/* show success message if exists */}
      {successMessage && (<div className='alert alert-success'>
      {successMessage}
      <br/>
      <button className='btn btn-outline-success mt-3'
      onClick={()=>navigate('/')}>
        Go Back to Employeen List
      </button>
      </div>
      )}
      {/* form for entering employee data */}
      <form onSubmit={handleSubmit}>
        {/* first name */}
        <div className='mb-3'>
          <label htmlFor='firstName' className='formLabel'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            name='firstName'
            value={employee.firstName}
            onChange={handleChange}
            required
          />
        </div>
        {/* last name */}
        <div className='mb-3'>
          <label htmlFor='lastName' className='formLabel'>Last Name</label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            name='lastName'
            value={employee.lastName}
            onChange={handleChange}
            required
          />
        </div>
        {/* email */}
        <div className='mb-3'>
          <label htmlFor='email' className='formLabel'>Email</label>
          <input
            type='text'
            className='form-control'
            id='email'
            name='email'
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* submit button */}
        <button type='submit' className='btn btn-primary'>Create</button>
      </form>

    </div>
  );
};

export default AddNewEmployee