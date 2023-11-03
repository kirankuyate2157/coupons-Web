import React from 'react'
import Navbar from '../components/Navbar';
import { FiChevronRight } from "react-icons/fi";
import DiscCard from '../components/DiscCard';

const Coupons = () => {
    return (
        <div className=" font-mono bg-orange-100">
            <Navbar />
            <div className="sm:px-10">
                <div className=" flex w-full justify-center items-center  text-extrabold text-3xl p-10 ">
                    <h1>My Discounts</h1>
                </div>
                <div className="w-full  bg-red-100">
                    <div className="flex justify-start text-lg font-bold i p-1 text-bold items-center">
                        <FiChevronRight className="text-2xl" />
                        <h2>My Coupons</h2>
                    </div>
                    <div className="bg-red-100 p-3 px-5 flex flex-wrap  gap-4 justify-start">
                        <DiscCard />
                        <DiscCard />
                        <DiscCard />
                        <DiscCard />
                        <DiscCard />
                        <DiscCard />
                        <DiscCard />
                        <DiscCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coupons;
