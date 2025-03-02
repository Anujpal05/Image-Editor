import React, { useContext } from 'react'
import { MdFileDownload } from "react-icons/md";
import { ImageContext } from '../context/ImageContext';

const Navbar = () => {
    const { image } = useContext(ImageContext);

    const handleDownload = () => {
        const link = document.createElement("a");
        console.log(image)
        link.href = image;
        link.download = "Resized-image";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className=' text-3xl flex justify-between font-semibold p-3'>
            <div>QuickEdit</div>
            <button className=' text-xl flex items-center gap-2 p-2 mx-2 lg:mx-10 outline-none bg-blue-500 rounded-md cursor-pointer hover:text-gray-200 transition-all duration-300 ease-in ' onClick={handleDownload}>
                <p>Download</p>
                <MdFileDownload />
            </button>
        </div>
    )
}

export default Navbar
