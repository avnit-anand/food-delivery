import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = 'https://food-delivery-admin-5xwj.onrender.com/'
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />}></Route>
          <Route path="/list" element={<List url={url} />}></Route>
          <Route path="/order" element={<Order url={url} />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
