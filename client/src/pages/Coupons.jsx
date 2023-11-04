import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { FiChevronRight } from "react-icons/fi";
import { MdDone } from "react-icons/md"
import DiscCard from '../components/DiscCard';

const Coupons = () => {
    const [isNotify, setIsNotify] = useState(false);
    const handleShowNotification = () => {
        setIsNotify(true);
        setTimeout(() => {
            setIsNotify(false);
        }, 4000);
    };
    return (
        <div className=" font-mono ">
            <Navbar />
            <div className="sm:px-10">
                <div className=" flex w-full justify-center items-center  text-extrabold text-3xl p-10 ">
                    <h1>My Discounts</h1>
                </div>
                <div className="w-full">
                    <div className="flex justify-start text-lg font-bold i p-1 text-bold items-center">
                        <FiChevronRight className="text-2xl" />
                        <h2>My Coupons</h2>
                    </div>
                    <div className=" p-3 px-5 flex flex-wrap  gap-4 justify-start">
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                    </div>
                </div>
                <div className="w-full my-4 ">
                    <div className="flex py-2 justify-start text-lg font-bold i p-1 text-bold items-center">
                        <FiChevronRight className="text-2xl" />
                        <h2>Unlock more coupons</h2>
                    </div>
                    <div className=" p-3 px-5 flex flex-wrap  gap-4 justify-start">
                        <DiscCard onClick={() => { showNotifications() }} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                        <DiscCard onClick={handleShowNotification} />
                    </div>
                </div>
            </div>
            {isNotify && (
                <div className="fixed top-[16%] left-1/2 transform -translate-x-1/2 px-4 p-1 bg-green-700 text-white rounded-lg text-[0.60rem] md:text-xs  flex  items-center">
                    <MdDone className="text-2xl mr-2" />
                    <span>
                        You successfully applied Code: NEWCUSTOMER_2023 to your cart
                    </span>
                </div>
            )}


        </div>
    )
}

export default Coupons;
