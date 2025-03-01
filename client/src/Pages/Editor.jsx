import React, { useContext, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import ImgPreview from '../Components/ImgPreview'
import { useNavigate } from 'react-router-dom'
import { ImageContext } from '../context/ImageContext'

const Editor = () => {
    const navigate = useNavigate();
    const { image } = useContext(ImageContext);

    useEffect(() => {
        if (!image) {
            navigate('/')
        }
    }, [])


    return (
        <div className=' flex flex-col lg:flex-row'>
            <div className='order-2 lg:order-1 lg:w-[30%] h-[90%] bg-gray-900'>
                <Sidebar />
            </div>
            <div className=' order-1 lg:order-2 lg:w-[70%] h-full bg-gray-950 p-10'>
                <ImgPreview />
            </div>
        </div>
    )
}

export default Editor
