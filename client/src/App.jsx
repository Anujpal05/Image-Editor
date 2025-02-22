import React from 'react'
import Navbar from './Components/Navbar'
import Editor from './Components/Editor'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div className='bg-gray-950 min-h-screen w-screen text-white'>
      <Navbar />
      <hr className=' border-gray-700' />
      <div className=' h-full w-full'>
        <Editor />
      </div>
      <hr className=' border-gray-700' />
      <Footer />
    </div>
  )
}

export default App
