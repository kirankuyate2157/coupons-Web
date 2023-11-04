import React, { useState } from 'react';

import { BiRightArrowAlt } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { MdFlashOn } from "react-icons/md";
const DiscCard = ({ onClick }) => {
    const [isTextCopy, setIsTextCopy] = useState(false);
    const copyInterval = () => {
        setIsTextCopy(true);
        setTimeout(() => {
            setIsTextCopy(false);
        }, 7000); // Reduce the time for the copy notification
    }
    return (
        <div className="p-4 sm:p-5 font-sans border border-gray-400 bg-slate-50  shadow-lg rounded-lg sm:w-1/2 md:w-[48%] lg:w-[30%]"
            onClick={onClick}>
            <div className="flex flex-col gap-4 pb-2 ">
                <div className="text-2xl sm:text-3xl font-semibold">
                    5% OFF
                </div>
                <div className="text-xs font-semibold
                . sm:text-sm text-gray-500">
                    FOR WHOLE ORDER
                </div>
                <div className="flex flex-wrap text-sm items-center gap-2">
                    <div className="flex gap-3  items-center">
                        <div className="text-xs sm:text-sm">Code:</div>
                        <span className={`flex ${isTextCopy ? "text-green-400 bg-green-50 px-1 rounded" : "text-black"}`}>
                            ANRSALE2023
                        </span>
                    </div>
                    <div className="flex flex-grow justify-end gap-2">
                        <span className="flex gap-1 items-center" onClick={() => {
                            const couponCode = "ANRSALEs023"; // Replace with the actual coupon code
                            navigator.clipboard.writeText(couponCode);
                            copyInterval();
                        }}>
                            <FaRegCopy className={`text-md sm:text-lg ${isTextCopy ? "text-green-400" : "text-black"}`} /> Copy
                        </span>
                        <span className="flex gap-1 items-center">
                            <BiRightArrowAlt className="text-xl sm:text-2xl" /> Apply
                        </span>
                    </div>
                </div>
                <div className=" bg-yellow-300 flex  justify-between font-bold text-[0.60rem] p-1">
                    <div className="flex justify-start items-center">
                        <MdFlashOn className='text-sm mx-1' />
                        <h2> Flash sale</h2>
                    </div>
                    <div>
                        Ends in 01 h 08 m 59 s
                    </div>
                </div>
                <div className="flex flex-col text-xs text-gray-500">
                    <ul className="pl-2 list-disc">
                        <li>05/08/2023 04:00 - 09/11/2023 12:00</li>
                        <li>For all products.</li>
                        <li>
                            Combinations: Get 20% off when you spend over $169.00 or get 15%
                            off when you spend over $89.00.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DiscCard;
