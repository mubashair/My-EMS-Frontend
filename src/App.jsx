import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hell from './Hello'
import ListEmp from './Components/ListEmp'
import AddNewEmployee from './Components/AddNewEmployee'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditEmployee from './Components/EditEmployee'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element = {<ListEmp/>}/>
          <Route path='/add-employee' element = {<AddNewEmployee/>}/>
          <Route path='/edit-employee/:id' element = {<EditEmployee/>}/>
        </Routes>
         
      </Router>
      
      
    </>
  )
}

export default App
