import React from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import "./App.css"
import Editor from './Pages/Editor'

const App = () => {
  return (
    <div className='bg-gray-950 min-h-screen w-screen text-white'>
      <Navbar />
      <hr className=' border-gray-700' />
      {/* <div className=' h-full w-full'>
        <Home />
      </div> */}
      <div className=' h-full w-full'>
        <Editor />
      </div>
      <hr className=' border-gray-700' />
      <Footer />
    </div>
  )
}

export default App
