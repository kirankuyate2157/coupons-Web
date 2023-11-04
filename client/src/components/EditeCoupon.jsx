import React, { useState, useEffect } from 'react';
import { FiRepeat } from "react-icons/fi";
import { PiSealWarningDuotone } from "react-icons/pi";
import { MdDone } from "react-icons/md"
import axios from 'axios';

function generateCouponCode(length, lastDigitsCount) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = length - lastDigitsCount;
    let couponCode = '';

    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        couponCode += characters[randomIndex];
    }

    for (let i = 0; i < lastDigitsCount; i++) {
        couponCode += Math.floor(Math.random() * 10);
    }

    return couponCode;
}

const Notification = ({ message, type }) => {
    return <>
        <div className={`fixed top-[16%] left-1/2 transform -translate-x-1/2 px-4 p-1  text-white rounded-lg text-[0.80rem] md:text-xs flex items-center ${type == "done" ? "bg-green-600" : "bg-yellow-400"}`}>
            <PiSealWarningDuotone className="text-2xl mr-2" />
            <span>{message}</span>
        </div>
    </>
}

const EditCoupon = ({ coupon, onSave, onCancel, isNew }) => {
    const [editedCoupon, setEditedCoupon] = useState(coupon ? { ...coupon } : {
        couponCode: generateCouponCode(10, 4),
        discountType: '',
        discountValue: '',
        expirationDate: '',
        minimumAmount: '',
        createdBy: '',
        maxUsageCount: 0
    });
    const [isWarning, setIsWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    if (!coupon) isNew = true;
    const handleSave = () => {
        if (
            editedCoupon.couponCode &&
            editedCoupon.discountType &&
            editedCoupon.discountValue &&
            editedCoupon.expirationDate &&
            editedCoupon.minimumAmount &&
            editedCoupon.maxUsageCount &&
            editedCoupon.createdBy
        ) {
            if (coupon) {
                // Editing an existing coupon
                // onSave(editedCoupon, isNew, true);
            } else {
                // Creating a new coupon
                const data = {
                    "couponCode": "5K695P7277",
                    "discountType": "fixed",
                    "discountValue": "22",
                    "expirationDate": "2023-12-04T12:03",
                    "minimumAmount": "200",
                    "createdBy": "mankys sonar",
                    "maxUsageCount": 0
                };
                postCouponData(editedCoupon);
                console.log("data is created : ", editedCoupon);
                // onSave(editedCoupon, isNew, false);
            }
        } else {
            handleShowWarning();
        }
    };
    const postCouponData = (dataToPost) => {
        return axios.post('/kkcoupon/api/v1/coupons/', dataToPost)
            .then((response) => {
                console.log("Data is posted successfully ✔️", response.data);
                handleSuccess();
                setEditedCoupon({
                    couponCode: generateCouponCode(10, 4),
                    discountType: '',
                    discountValue: '',
                    expirationDate: '',
                    minimumAmount: '',
                    createdBy: '',
                    maxUsageCount: 0
                })

            })
            .catch((error) => {
                console.log("Error", error.message);
            });
    };



    const handleCancel = () => {
        onCancel(isNew);
    };

    const handleShowWarning = () => {
        setIsWarning(true);
        setTimeout(() => {
            setIsWarning(false);
        }, 1000);
    };
    const handleSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const genrateCode = () => {
        const code = generateCouponCode(10, 4);
        setEditedCoupon({ ...editedCoupon, couponCode: code });
    }

    return (
        <div className="p-4 sm:p-5 font-sans border border-gray-400 bg-slate-50 shadow-lg rounded-lg max-w-[400px]">
            <div className="flex flex-col w-full gap-4 pb-2">
                <div className="flex w-full gap-3 items-center">
                    <div className="text-xs sm:text-sm w-[20%]">Code:</div>
                    <input
                        type="text"
                        className={`border p-2 ${isNew ? '' : 'text-black'}`}
                        placeholder="Coupon Code"
                        value={editedCoupon.couponCode}
                        onChange={(e) => setEditedCoupon({ ...editedCoupon, couponCode: e.target.value })}
                        readOnly={!isNew}
                    />
                    {isNew && (
                        <span className="text-lg cursor-pointer" onClick={() => genrateCode()}>
                            <FiRepeat />
                        </span>
                    )}
                </div>
                <div className="flex gap-3 items-center">
                    <div className="text-xs sm:text-sm w-[20%]">Discount Type:</div>
                    <select
                        className="border p-2"
                        value={editedCoupon.discountType}
                        onChange={(e) => setEditedCoupon({ ...editedCoupon, discountType: e.target.value })}
                    >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed</option>
                    </select>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="text-xs sm:text-sm w-[20%]">Discount Value:</div>
                    <input
                        type="number"
                        className="border p-2"
                        placeholder="Discount Value"
                        value={editedCoupon.discountValue}
                        onChange={(e) => setEditedCoupon({ ...editedCoupon, discountValue: e.target.value })}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="text-xs sm:text-sm w-[20%]">Expiration Date:</div>
                    <input
                        type="datetime-local"
                        className="border p-2"
                        placeholder="Expiration Date"
                        value={editedCoupon.expirationDate}
                        onChange={(e) => setEditedCoupon({ ...editedCoupon, expirationDate: e.target.value })}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="text-xs sm:text-sm w-[20%]">Minimum Amount:</div>
                    <input
                        type="number"
                        className="border p-2"
                        placeholder="Minimum Amount"
                        value={editedCoupon.minimumAmount}
                        onChange={(e) => setEditedCoupon({ ...editedCoupon, minimumAmount: e.target.value })}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="text-xs sm:text-sm w-[20%]">Number of coupons :</div>
                    <input
                        type="number"
                        className="border p-2"
                        placeholder="number of coupons"
                        value={editedCoupon.maxUsageCount}
                        onChange={(e) => setEditedCoupon({ ...editedCoupon, maxUsageCount: e.target.value })}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="text-xs sm:text-sm w-[20%]">Created By:</div>
                    <input
                        type="text"
                        className="border p-2"
                        placeholder="Created By"
                        value={editedCoupon.createdBy}
                        onChange={(e) => setEditedCoupon({ ...editedCoupon, createdBy: e.target.value })}
                    />
                </div>
                <div className="flex gap-3 items-center justify-end">
                    <button
                        onClick={handleSave}
                        className={`${editedCoupon.couponCode &&
                            editedCoupon.discountType &&
                            editedCoupon.discountValue &&
                            editedCoupon.expirationDate &&
                            editedCoupon.minimumAmount &&
                            editedCoupon.maxUsageCount &&
                            editedCoupon.createdBy
                            ? 'bg-green-500 cursor-pointer'
                            : 'bg-gray-300 cursor-not-allowed'
                            } text-white py-1 px-4 rounded hover:bg-green-600`}
                    >
                        {isNew ? "Create" : "Save"}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-red-500 text-white py-1 px-4 rounded hover-bg-red-600 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
                {isWarning && (
                    <div className="fixed top-[16%] left-1/2 transform -translate-x-1/2 px-4 p-1 bg-yellow-400 text-white rounded-lg text-[0.80rem] md:text-xs flex items-center">
                        <PiSealWarningDuotone className="text-2xl mr-2" />
                        <span>Please enter valid data.</span>
                    </div>
                )}
                {success && (<div className="fixed top-[16%] left-1/2 transform -translate-x-1/2 px-4 p-1 bg-green-600 text-white rounded-lg text-[0.80rem] md:text-xs flex items-center">
                    <MdDone className="text-2xl mr-2" />
                    <span>Successfully done</span>
                </div>)
                }
            </div>
        </div>
    );
};

export default EditCoupon;
