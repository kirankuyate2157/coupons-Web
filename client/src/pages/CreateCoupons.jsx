import React, { useState, useEffect } from 'react';
import Navbar from './../components/Navbar';
import axios from 'axios';

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
                    <h2 className="text-xl font-semibold">Active Coupons</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeCoupons.map(coupon => (
                            <div key={coupon._id} className="border p-4 rounded-lg shadow-md">
                                <p className="text-xl font-semibold">{coupon.couponCode}</p>
                                <p>Discount Type: {coupon.discountType}</p>
                                <p>Expires on {new Date(coupon.expirationDate).toDateString()}</p>
                                <p>Minimum Amount: ${coupon.minimumAmount}</p>
                                <p>Created By: {coupon.createdBy}</p>
                                <p>Max Usage Count: {coupon.maxUsageCount}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Expired Coupons</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {expiredCoupons.map(coupon => (
                            <div key={coupon._id} className="border p-4 rounded-lg shadow-md">
                                <p className="text-xl font-semibold">{coupon.couponCode}</p>
                                <p>Discount Type: {coupon.discountType}</p>
                                <p>Expired on {new Date(coupon.expirationDate).toDateString()}</p>
                                <p>Minimum Amount: ${coupon.minimumAmount}</p>
                                <p>Created By: {coupon.createdBy}</p>
                                <p>Max Usage Count: {coupon.maxUsageCount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCoupons;
