import React, { useRef } from 'react'
import { FaImage } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { LuImageUpscale } from "react-icons/lu";
import { IoMdFlash } from "react-icons/io";
import { LuPencilRuler } from "react-icons/lu";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";


const Editor = () => {
    const imgRef = useRef(null);
    const handleImage = (e) => {
        const file = e.target.files[0];
        console.log(file)
    }
    return (
        <div className=' py-4 '>
            <h1 className=' text-3xl font-semibold pb-3 text-center'>Image Editor</h1>
            <p className=' text-center text-xl text-gray-400'>Easily edit image online for free.</p>
            <div className=' flex justify-center w-screen py-16'>
                <div className=' border-10 border-gray-300 w-[80%] lg:w-[40%] h-60 rounded-md bg-blue-500 py-3'>
                    <div className=' text-5xl flex justify-center py-6 '><FaImage /></div>
                    <input ref={imgRef} type="file" accept="image/*" className=' hidden' onChange={handleImage} />
                    <div className=' flex justify-center gap-4 '>
                        <button className=' flex justify-center items-center bg-gray-700 p-3 rounded-md gap-4 outline-hidden hover:bg-gray-800 transition-all duration-300 ' onClick={() => imgRef.current.click()}>
                            <span className=' font-semibold'>Select Image</span>
                            <div className=''><FaChevronDown /></div>
                        </button>
                    </div>
                    <p className=' text-center font-semibold text-black py-2'>or, drag and drop an image here</p>
                </div>
            </div>


            <div className=' grid grid-cols-1 lg:grid-cols-3 gap-14 lg:px-40'>
                <div className=' '>
                    <div className=' flex justify-center text-4xl py-2 text-gray-400 '><LuImageUpscale /></div>
                    <h3 className=" text-xl font-semibold text-center text-gray-300">Perfect quality</h3>
                    <p className=' py-3 text-center text-gray-400'>The best online image resizer to resize your images at the highest quality.</p>
                </div>
                <div>
                    <div className=' flex justify-center text-4xl py-2 text-gray-400 '><IoMdFlash /></div>
                    <h3 className=" text-xl font-semibold text-center text-gray-300">Lightning Fast</h3>
                    <p className=' py-3 text-center text-gray-400'>This cloud-hosted, highly scalable tool can resize your images within seconds!</p>
                </div>
                <div>
                    <div className=' flex justify-center text-4xl py-2 text-gray-400 '><LuPencilRuler /></div>
                    <h3 className=" text-xl font-semibold text-center text-gray-300">Easy To Use</h3>
                    <p className=' py-3 text-center text-gray-400'>Simply upload your image and enter a target size and edit image. It's as easy as that!</p>
                </div>
                <div>
                    <div className=' flex justify-center text-4xl py-2 text-gray-400 '><HiOutlineLightBulb /></div>
                    <h3 className=" text-xl font-semibold text-center text-gray-300">Works Anywhere</h3>
                    <p className=' py-3 text-center text-gray-400'>aj_photoeditor.com is browser-based (no software to install). It works on any platform (Windows, Linux, Mac).</p>
                </div>
                <div>
                    <div className=' flex justify-center text-4xl py-2 text-gray-400 '><HiOutlineCheckBadge /></div>
                    <h3 className=" text-xl font-semibold text-center text-gray-300">Privacy Guaranteed</h3>
                    <p className=' py-3 text-center text-gray-400'>Your images are uploaded via a secure 256-bit encrypted SSL connection and deleted automatically within 6 hours.</p>
                </div>
                <div>
                    <div className=' flex justify-center text-4xl py-2 text-gray-400 '><FaRegHeart /></div>
                    <h3 className=" text-xl font-semibold text-center text-gray-300">It's Free</h3>
                    <p className=' py-3 text-center text-gray-400'>You can edit images for free! There is no software to install, registrations, or watermarks.</p>
                </div>
            </div>


            <div className=' flex justify-center py-32 '>
                <div className='  flex justify-center items-center gap-7 bg-gray-900 w-fit p-10 py-20  font-thin text-gray-400 rounded-md'>
                    <div className=' text-9xl'><FaImage /></div>
                    <div className='  text-3xl '><FaArrowRight /></div>
                    <div className=' text-9xl'><LuImageUpscale /></div>
                </div>

                <div className=' flex flex-col justify-center px-10 font-semibold text-gray-400'>
                    <h2 className=' text-2xl pb-6 text-gray-400'>How to Edit an Image?</h2>
                    <h4>1. Click on the "Select Image" button to select an image.</h4>
                    <h4>2. Edit your image freely as you want.</h4>
                    <h4>3. Click the "Update Image" button to update the image.</h4>
                </div>
            </div>
        </div>
    )
}

export default Editor
