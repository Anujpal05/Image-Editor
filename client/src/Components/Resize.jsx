import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { ImageContext } from '../context/ImageContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Resize = () => {
    const [showSet, setshowSet] = useState(false);
    const [showType, setshowType] = useState("dimention");
    const { image, setimage } = useContext(ImageContext);
    const [dimention, setdimention] = useState();
    const [range, setrange] = useState(100);
    const [originalDim, setoriginalDim] = useState();
    const [lock, setlock] = useState(false)
    const [size, setsize] = useState(0);
    const [type, settype] = useState("jpeg")

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const img = new Image();
            img.src = image;
            setdimention({ height: img.height, width: img.width });

            const base64Data = image.split(";base64,").pop();

            const sizeInBytes = (base64Data.length * 3) / 4;
            const sizeInKB = (sizeInBytes / 1024).toFixed(2);
            setsize(sizeInKB)
            let quality = Math.round((size / sizeInKB) * 100);
            console.log(quality)
            setoriginalDim({ height: img.height, width: img.width, size: sizeInKB });

        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        if (!image) {
            navigate("/");
        }
    }, [])



    const manageDimention = ({ e, key }) => {
        const ratio = originalDim.width / originalDim.height;
        if (dimention.height > 10000) {
            setdimention({ ...dimention, height: 2000 })
        }
        if (dimention.width > 10000) {
            setdimention({ ...dimention, width: 2000 })
        }

        if (key != "percentage" && lock) {
            key == "height" ? setdimention({ ...dimention, height: e.target.value }) : setdimention({ ...dimention, width: e.target.value });
            return;
        }
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
            if (dimention.height < 80) {
                toast.error("Please provide Image height greater than 80!");
                return;
            }
            if (dimention.width < 80) {
                toast.error("Please provide Image width greater than 80!");
                return;
            }

            if (originalDim.size < 5 && size < 5) {
                toast.error("Please provide width greater than 5!");
                return;
            }

            console.log(Math.round((size / originalDim.size) * 100))

            const { data } = await axios.post('http://localhost:5000/edit-image', { baseUrl: image, dimention, quality: Math.round((size / originalDim.size) * 100), type });
            setimage(data.resizedImage);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className=' py-1 px-5 relative'>
            <h2 className=' text-2xl font-semibold'>Resize Settings</h2>
            <div className=' bg-gray-800 p-1 rounded-md text-lg font-semibold flex justify-around my-3'>
                <button className={` outline-none ${showType == "dimention" ? "bg-gray-900" : "hover:bg-gray-700 "} cursor-pointer  p-2 px-5 rounded-md`} onClick={() => setshowType("dimention")}>By Dimentions</button>
                <button className={`  outline-none ${showType == "percentage" ? "bg-gray-900" : "hover:bg-gray-700 "} cursor-pointer  p-2 px-5 rounded-md`} onClick={() => setshowType("percentage")}>As Percentage</button>
            </div>
            {showType == "dimention" && <div>
                <div className=' flex justify-around gap-4 '>
                    <div className=' flex flex-col gap-3 w-[40%]'>
                        <label htmlFor="height">Height</label>
                        <input type="number" name="height" min={100} max={2000} value={dimention?.height} id="height" className=' w-[90%] bg-gray-800 outline-none p-1 rounded-md' placeholder='height' onChange={(e) => manageDimention({ e, key: "height" })} />
                    </div>
                    <div className=' flex flex-col gap-3 w-[40%] '>
                        <div className=' flex justify-between px-2'>
                            <label htmlFor="width">Width</label>
                            <select name="width" id="width" className=' w-fit h-fit outline-none'>
                                <option value="pixel" className=' bg-gray-800 text-center px-5 hover:bg-gray-900'>px</option>
                                <option value="inch" className=' bg-gray-800 text-center px-5 hover:bg-gray-900'>inch</option>
                                <option value="cm" className=' bg-gray-800 text-center px-5 hover:bg-gray-900'>centimeter</option>
                                <option value="mm" className=' bg-gray-800 text-center px-5 hover:bg-gray-900'>milimeter </option>
                            </select>
                        </div>
                        <input type="number" name="width" min={100} max={2000} value={dimention?.width} id="" className=' w-[90%] bg-gray-800 outline-none p-1 rounded-md' placeholder='width' onChange={(e) => manageDimention({ e, key: "width" })} />
                    </div>
                </div>

                <div className=' flex px-4 items-center gap-3 py-4'>
                    <label htmlFor="sizeInKB" className=' font-semibold'>Size (KB)</label>
                    <input type="number" name="sizeInKB" min={5} max={8000} id="sizeInKB" value={size} className=' w-[40%] bg-gray-800 outline-none p-1 rounded-md' placeholder='size in kb' onChange={(e) => setsize(e.target.value)} />
                </div>

                {dimention && <div className=' flex gap-2 text-gray-300'>
                    <p className=' text-sm font-semibold py-1 text-gray-200'>Make my image original size ({dimention.height} x {dimention.width} px)</p> <button className=' cursor-pointer transition-all duration-300 ease-in outline-none hover:rotate-180' onClick={() => setdimention(originalDim)}><GrPowerReset /></button>
                </div>}

                <div className=' flex items-center gap-2'>
                    <input type="checkbox" name="lock" id="lock" className=' ' onClick={() => setlock(!lock)} />
                    <label htmlFor="lock">Lock Aspect Ratio</label>
                </div>
            </div>}

            {showType == "percentage" && <div className=' py-6'>
                <h3 className=' text-xl font-semibold p-2'>Size</h3>
                <div className=' flex bg-gray-800 p-5 rounded-lg'>
                    <input type="range" name="" id="" min={0} max={100} onChange={(e) => manageDimention({ e, key: "percentage" })} className=' w-[80%] bg-blue-400 ' />
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
                    <select name="" id="" className=' bg-gray-800 w-[70%] rounded-md p-2 my-2 outline-none' onChange={(e) => settype(e.target.value)}>
                        <option value="jpeg">Original</option>
                        <option value="jpg">JPG</option>
                        <option value="png">PNG</option>
                        <option value="webp">WEBP</option>
                        <option value="avif">AVIF</option>
                    </select>
                </div>

                <button className=' bg-blue-400 w-full p-2 rounded-md text-xl font-semibold outline-none my-10 cursor-pointer' onClick={updateImage}>
                    Update Image
                </button>
            </div>
        </div>
    )
}

export default Resize
