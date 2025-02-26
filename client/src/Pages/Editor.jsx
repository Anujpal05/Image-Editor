import React from 'react'
import Sidebar from '../Components/Sidebar'

const Editor = () => {
    return (
        <div className=' h-screen w-screen'>
            <div className=' w-[30%] h-full bg-gray-900'>
                <Sidebar />
            </div>
        </div>
    )
}

export default Editor
