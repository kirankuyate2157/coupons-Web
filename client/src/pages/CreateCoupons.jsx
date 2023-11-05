import React, { useState, useEffect } from 'react';
import Navbar from './../components/Navbar';
import axios from 'axios';
import DummyCard from '../components/DummyCard';
import { FiChevronRight } from "react-icons/fi"
import EditCoupon from '../components/EditeCoupon';
const CreateCoupons = () => {
    const [activeCoupons, setActiveCoupons] = useState([]);
    const [expiredCoupons, setExpiredCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({
        couponCode: '',
        discountType: '',
        discountValue: 0,
        expirationDate: '',
        minimumAmount: 0,
        createdBy: '',
        maxUsageCount: 0,
    });

    useEffect(() => {
        axios.get('/kkcoupon/api/v1/coupons/getall')
            .then((response) => {
                const coupons = response.data;
                const currentDate = new Date();
                const sortedCoupons = coupons.map(coupon => {
                    // Calculate the date difference in milliseconds
                    const dateDifference = new Date(coupon.expirationDate) - currentDate;
                    // Add the dateDifference as a new property to the coupon object
                    return { ...coupon, dateDifference };
                });
                // Sort the coupons by dateDifference in ascending order
                const sortedByDate = sortedCoupons.sort((a, b) => a.dateDifference - b.dateDifference);
                // Split the coupons into active and expired based on dateDifference
                const active = sortedByDate.filter(coupon => coupon.dateDifference > 0);
                const expired = sortedByDate.filter(coupon => coupon.dateDifference <= 0);
                setActiveCoupons(active);
                setExpiredCoupons(expired);
                // console.log("active : ", active);
                // console.log("expired : ", expired);
            })
            .catch((error) => {
                console.error('Error fetching coupons: ', error);
            });


    }, []);


    const handleCreateCoupon = () => {
        axios.post('/kkcoupon/api/v1/coupons', newCoupon)
            .then((response) => {
                setActiveCoupons([...activeCoupons, response.data]);
                setNewCoupon({
                    couponCode: '',
                    discountType: '',
                    discountValue: 0,
                    expirationDate: '',
                    minimumAmount: 0,
                    createdBy: '',
                    maxUsageCount: 0,
                });
            })
            .catch((error) => {
                console.error('Error creating a coupon: ', error);
            });
    };

    return (
        <div>
            <Navbar />
            <div className='sm:px-10 px-4'>
                <div className=' flex w-full justify-center items-center  text-extrabold text-3xl p-10 '>
                    <h1>Make  Coupons </h1>
                </div>
            </div>
            {/*  coupon Cards */}
            <div className='lg:flex-row flex flex-col-reverse  w-full opacity-100 transition-opacity lg:max-h-screen lg:overflow-y-auto justify-between'>
                <div className=' w-full  md:p-6 '>
                    <div className="w-full">
                        <div className="mb-4">
                            <div className="w-full">
                                <div className="flex justify-start text-lg font-bold i p-1 text-bold items-center">
                                    <FiChevronRight className="text-2xl" />
                                    <h2>Active Coupons</h2>
                                </div>
                                <div className=" p-3 px-5 flex flex-wrap  gap-4 justify-start">
                                    {activeCoupons.map((coupon, index) => (
                                        <DummyCard key={index} data={coupon} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="w-full">
                                <div className="flex justify-start text-lg font-bold i p-1 text-bold items-center">
                                    <FiChevronRight className="text-2xl" />
                                    <h2>Expired Coupons</h2>
                                </div>
                                <div className=" p-3 px-5 flex flex-wrap  gap-4 justify-start">
                                    {expiredCoupons.map((coupon, index) => (
                                        <DummyCard key={index} data={coupon} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* create new coupons */}

                <div className='w-full lg:w-[650px] p-2 mb-5 md:p-6  lg:sticky top-2 '>
                    <div className="flex justify-start text-lg font-bold i p-1 text-bold items-center">
                        <FiChevronRight className="text-2xl" />
                        <h2>Create Coupons</h2>
                    </div>
                    <div className='flex justify-center md:justify-end'>
                        <EditCoupon />
                        <div className="w-1/2 mx-2 hidden  md:flex lg:hidden font-mono">
                            <div className="rounded-lg p-4 md:p-6 ">
                                <h2 className="text-xl font-semibold mb-4">How to Create and Share Coupons</h2>
                                <ul className="pl-5 list-disc">
                                    <li className="mb-2">
                                        Fill in Coupon Details
                                    </li>
                                    <li className=" mb-4">Start by entering the coupon details.</li>
                                    <li className="mb-2">
                                        Review and Confirm
                                    </li>
                                    <li className=" mb-4">Review the entered coupon details and confirm the creation.</li>
                                    <li className="mb-2">
                                        Share Coupons
                                    </li>
                                    <li className="">Once the coupon is created, share it with others through various means, such as email, social media, or other communication channels.</li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCoupons;
