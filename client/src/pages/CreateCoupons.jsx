import React, { useState, useEffect } from 'react';
import Navbar from './../components/Navbar';
import axios from 'axios'; // Import Axios for API calls

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
        // Fetch active and expired coupons from the API
        // Replace the URL with your actual API endpoint
        axios.get('/kkcoupon/api/v1/coupons/getall')
            .then((response) => {
                const coupons = response.data;
                console.log("api Fected data : ", coupons)
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
        // Send a POST request to create a new coupon
        // Replace the URL with your actual API endpoint
        axios.post('/kkcoupon/api/v1/coupons', newCoupon)
            .then((response) => {
                // Add the newly created coupon to the active coupons
                setActiveCoupons([...activeCoupons, response.data]);
                // Reset the newCoupon state
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

                {/* Create new coupon form */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Create New Coupon</h2>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                            type="text"
                            className="border p-2"
                            placeholder="Coupon Code"
                            value={newCoupon.couponCode}
                            onChange={(e) => setNewCoupon({ ...newCoupon, couponCode: e.target.value })}
                        />
                        <input
                            type="text"
                            className="border p-2"
                            placeholder="Discount Type"
                            value={newCoupon.discountType}
                            onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                        />
                        <input
                            type="number"
                            className="border p-2"
                            placeholder="Discount Value"
                            value={newCoupon.discountValue}
                            onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                        />
                        <input
                            type="date"
                            className="border p-2"
                            placeholder="Expiration Date"
                            value={newCoupon.expirationDate}
                            onChange={(e) => setNewCoupon({ ...newCoupon, expirationDate: e.target.value })}
                        />
                        <input
                            type="number"
                            className="border p-2"
                            placeholder="Minimum Amount"
                            value={newCoupon.minimumAmount}
                            onChange={(e) => setNewCoupon({ ...newCoupon, minimumAmount: e.target.value })}
                        />
                        <input
                            type="text"
                            className="border p-2"
                            placeholder="Created By"
                            value={newCoupon.createdBy}
                            onChange={(e) => setNewCoupon({ ...newCoupon, createdBy: e.target.value })}
                        />
                        <input
                            type="number"
                            className="border p-2"
                            placeholder="Max Usage Count"
                            value={newCoupon.maxUsageCount}
                            onChange={(e) => setNewCoupon({ ...newCoupon, maxUsageCount: e.target.value })}
                        />
                        <button
                            onClick={handleCreateCoupon}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
                        >
                            Create
                        </button>
                    </div>
                </div>

                {/* Active Coupons */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Active Coupons</h2>
                    {activeCoupons.map(coupon => (
                        <div key={coupon._id} className="border p-2 mt-2">
                            <p>{coupon.couponCode}</p>
                            <p>{coupon.discountType}</p>
                            <p>Expires on {new Date(coupon.expirationDate).toDateString()}</p>
                            <p>Minimum Amount: ${coupon.minimumAmount}</p>
                            <p>Created By: {coupon.createdBy}</p>
                            <p>Max Usage Count: {coupon.maxUsageCount}</p>
                        </div>
                    ))}
                </div>

                {/* Expired Coupons */}
                <div>
                    <h2 className="text-xl font-semibold">Expired Coupons</h2>
                    {expiredCoupons.map(coupon => (
                        <div key={coupon._id} className="border p-2 mt-2">
                            <p>{coupon.couponCode}</p>
                            <p>{coupon.discountType}</p>
                            <p>Expired on {new Date(coupon.expirationDate).toDateString()}</p>
                            <p>Minimum Amount: ${coupon.minimumAmount}</p>
                            <p>Created By: {coupon.createdBy}</p>
                            <p>Max Usage Count: {coupon.maxUsageCount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CreateCoupons;
