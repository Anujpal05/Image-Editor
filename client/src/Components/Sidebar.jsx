import React, { useContext } from 'react'
import { PiImages } from "react-icons/pi";
import { RiCropLine } from "react-icons/ri";
import { MdOutlineRotateRight } from "react-icons/md";
import Resize from './Resize';
import { ImageContext } from '../context/ImageContext';


const Sidebar = () => {
    const { image } = useContext(ImageContext);

    return (
        <div className=''>
            <div className=' flex justify-around text-semibold text-xl py-2'>
                <button className=' flex items-center gap-2 outline-none focus:bg-gray-950 hover:bg-gray-800 p-3 rounded-md transition-all duration-300'><PiImages className=' text-2xl ' /><span>Resize</span></button>
                <button className=' flex items-center gap-2 outline-none focus:bg-gray-950 hover:bg-gray-800 p-3 rounded-md transition-all duration-300'><RiCropLine className=' text-2xl ' /><span>Crop</span></button>
                <button className=' flex items-center gap-2 outline-none focus:bg-gray-950 hover:bg-gray-800 p-3 rounded-md transition-all duration-300'><MdOutlineRotateRight className=' text-2xl ' /><span>Flip & Rotate</span></button>
            </div>
            <hr className=' border-gray-700' />
            <Resize />
        </div>
    )
}

export default Sidebar
