import React, { useContext } from 'react'
import { ImageContext } from '../context/ImageContext'

const ImgPreview = () => {
    const { image } = useContext(ImageContext);


    return (
        <div className='  h-full w-full border-2 border-gray-800 bg-gray-900  rounded-md'>
            <div className=' flex justify-center items-center h-[75vh]'>
                <img src={image} alt="" className=' max-h-[70vh] max-w-full rounded-md p-1' />
            </div>
        </div>
    )
}

export default ImgPreview
