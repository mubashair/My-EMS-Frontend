import axios from 'axios'
// Base URL of your Spring Boot backend
const BASE_URL = 'http://localhost:8080/api/employees';
//fetch all employees
export const fetchEmployees = () => axios.get(BASE_URL);
// create a new employee
export const createEmployee = (employee) => axios.post(BASE_URL, employee);
//get employee by id
export const getEmployeeById = (id) => axios.get(`${BASE_URL}/${id}`);
//update an employee
export const updateEmployee = (id, employee) => axios.put(`${BASE_URL}/${id}`, employee);
//delete an employee
export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`);

