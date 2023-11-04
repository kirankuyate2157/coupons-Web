import React, { useState, useEffect } from 'react';
import Navbar from './../components/Navbar';
import axios from 'axios';
import DiscCard from '../components/DiscCard';
import DummyCard from '../components/DummyCard';
import { FiChevronRight } from "react-icons/fi"
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
                const active = coupons.filter(coupon => new Date(coupon.expirationDate) > currentDate);
                const expired = coupons.filter(coupon => new Date(coupon.expirationDate) <= currentDate);
                setActiveCoupons(active);
                setExpiredCoupons(expired);
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
            <div className="p-5">
                <h1 className="text-2xl font-bold mb-4">Create Coupons</h1>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Create New Coupon</h2>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        {/* ... (your input fields) */}
                    </div>
                </div>

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
    );
}

export default CreateCoupons;
