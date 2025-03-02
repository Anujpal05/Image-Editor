import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import "./App.css"
import Editor from './Pages/Editor'

const App = () => {

  return (
    <div className='bg-gray-950 min-h-screen w-screen text-white'>
      <Toaster />
      <Router>
        <Navbar />
        <hr className=' border-gray-700' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor' element={<Editor />} />
        </Routes>
        <hr className=' border-gray-700' />
        <Footer />
      </Router>
    </div>
  )
}

export default App
