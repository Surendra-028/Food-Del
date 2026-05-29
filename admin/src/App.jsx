import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Additem/Additem'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import List from './pages/List/List'
import Order from './pages/Order/Order'

const App = () => {

  const url = "http://localhost:4000"

  return (
    <div className='app'>
      <div>
        <ToastContainer autoClose = {3000}/>
      </div>
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <div className="page-display">
          <Routes>
            <Route path="/add" element={<Add url = {url}/>} />
            <Route path='/list' element = {<List url = {url}/>}/>
            <Route path='/order' element = {<Order url = {url}/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App