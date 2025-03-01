import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { ImageContext } from '../context/ImageContext';
import axios from 'axios';

const Resize = () => {
    const [showSet, setshowSet] = useState(false);
    const [showType, setshowType] = useState("dimention");
    const { image, setimage } = useContext(ImageContext);
    const [dimention, setdimention] = useState();
    const [range, setrange] = useState(100);
    const [originalDim, setoriginalDim] = useState();

    useEffect(() => {
        try {
            const img = new Image();
            img.src = image;
            setdimention({ height: img.height, width: img.width });
            setoriginalDim({ height: img.height, width: img.width })


        } catch (error) {
            console.log(error)
        }
    }, [])


    const manageDimention = ({ e, key }) => {
        const ratio = originalDim.width / originalDim.height;

        switch (key) {
            case "percentage":
                const newRange = e.target.value;
                setrange(newRange);
                setdimention({ height: Math.floor((originalDim.height * range) / 100), width: Math.floor((originalDim.width * range) / 100) })
                break;
            case "height":
                const newHeight = e.target.value;
                setdimention({ height: newHeight, width: Math.floor(newHeight * ratio) });
                break;
            case "width":
                const newWidth = e.target.value;
                setdimention({ height: Math.floor(newWidth / ratio), width: newWidth });
                break;
            default:
                break;
        }
    }

    const updateImage = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/edit-image', { baseUrl: image, dimention });
            console.log(data.resizedImage)
            setimage(data.resizedImage);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=' p-5 relative'>
            <h2 className=' text-2xl font-semibold'>Resize Settings</h2>
            <div className=' bg-gray-800 p-1 rounded-md text-lg font-semibold flex justify-around my-3'>
                <button className={` outline-none ${showType == "dimention" ? "bg-gray-900" : "hover:bg-gray-700 "} cursor-pointer  p-2 px-5 rounded-md`} onClick={() => setshowType("dimention")}>By Dimentions</button>
                <button className={`  outline-none ${showType == "percentage" ? "bg-gray-900" : "hover:bg-gray-700 "} cursor-pointer  p-2 px-5 rounded-md`} onClick={() => setshowType("percentage")}>As Percentage</button>
            </div>
            {showType == "dimention" && <div>
                <div className=' flex justify-around gap-4 '>
                    <div className=' flex flex-col gap-3 '>
                        <label htmlFor="height">Height</label>
                        <input type="number" name="height" value={dimention?.height} id="height" className=' w-[90%] bg-gray-800 outline-none p-1 rounded-md' placeholder='height' onChange={(e) => manageDimention({ e, key: "height" })} />
                    </div>
                    <div className=' flex flex-col gap-3 '>
                        <div className=' flex justify-between px-2'>
                            <label htmlFor="width">Width</label>
                            <select name="width" id="width" className=' w-fit h-fit outline-none'>
                                <option value="pixel" className=' bg-gray-800 text-center px-5 hover:bg-gray-900'>px</option>
                                <option value="inch" className=' bg-gray-800 text-center px-5 hover:bg-gray-900'>inch</option>
                                <option value="cm" className=' bg-gray-800 text-center px-5 hover:bg-gray-900'>centimeter</option>
                                <option value="mm" className=' bg-gray-800 text-center px-5 hover:bg-gray-900'>milimeter </option>
                            </select>
                        </div>
                        <input type="number" name="width" value={dimention?.width} id="" className=' w-[90%] bg-gray-800 outline-none p-1 rounded-md' placeholder='width' onChange={(e) => manageDimention({ e, key: "width" })} />
                    </div>
                </div>

                {dimention && <p className=' text-sm font-semibold py-3 text-gray-200'>Make my image original size ({dimention.height} x {dimention.width} px)</p>}

                <div className=' flex items-center gap-2 py-3'>
                    <input type="checkbox" name="lock" id="lock" className=' ' />
                    <label htmlFor="lock">Lock Aspect Ratio</label>
                </div>
            </div>}

            {showType == "percentage" && <div className=' py-6'>
                <h3 className=' text-xl font-semibold p-2'>Size</h3>
                <div className=' flex bg-gray-800 p-5 rounded-lg'>
                    <input type="range" name="" id="" min={0} max={200} onChange={(e) => manageDimention({ e, key: "percentage" })} className=' w-[80%] bg-blue-400 ' />
                    <p className=' font-semibold px-3'>{range}%</p>
                </div>

                {dimention && <p className=' text-sm font-semibold py-3 text-gray-200'>Make my image {range}% of original size ({dimention.height} x {dimention.width} px)</p>}
            </div>}

            <div >
                <div className=' flex justify-between items-center' onClick={() => setshowSet(!showSet)}>
                    <h2 className=' text-2xl font-semibold py-5'>Export Settings</h2>
                    {!showSet && <FaChevronDown />}
                    {showSet && <FaChevronUp />}
                </div>
                <div className={`${showSet ? " opacity-100" : " opacity-0"}`}>
                    <h3>Save Image As</h3>
                    <select name="" id="" className=' bg-gray-800 w-[70%] rounded-md p-2 my-2 outline-none'>
                        <option value="Original">Original</option>
                        <option value="JPG">JPG</option>
                        <option value="PNG">PNG</option>
                        <option value="WEBP">WEBP</option>
                    </select>
                </div>

                <button className=' bg-blue-400 w-full p-2 rounded-md text-xl font-semibold outline-none my-10' onClick={updateImage}>
                    Update Image
                </button>
            </div>
        </div>
    )
}

export default Resize
