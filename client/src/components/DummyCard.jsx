import React, { useState, useEffect } from 'react';

import { BiRightArrowAlt } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { MdFlashOn, MdDone } from "react-icons/md";

const CountdownTimer = ({ expirationDate }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    function getTimeLeft() {
        const endDate = new Date(expirationDate).getTime();
        const now = new Date().getTime();
        const timeDiff = endDate - now;

        if (timeDiff <= 0) {
            return 'Expired';
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return `Ends in ${days ? days + " days" : ""} ${hours} h ${minutes} m ${seconds} s`;
    }

    return <div>{timeLeft}</div>;
};

const FormatDateTime = ({ dateTime }) => {
    const formattedDateTime = new Date(dateTime).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return <div>{formattedDateTime}</div>;
};

const DummyCard = (props, { onClick, }) => {
    const [isTextCopy, setIsTextCopy] = useState(false);
    const [isNotify, setIsNotify] = useState(false);

    const { couponCode, discountType, discountValue, expirationDate, minimumAmount, createdBy, maxUsageCount } = props.data;
    const copyInterval = () => {
        setIsTextCopy(true);
        notifyInterval();
        setTimeout(() => {
            setIsTextCopy(false);
        }, 7000);
    }

    const notifyInterval = () => {
        setIsNotify(true);
        setTimeout(() => {
            setIsNotify(false);
        }, 3000);
    }
    const endDate = new Date(expirationDate).getTime();
    const timeDiff = endDate - new Date().getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const isFlashSale = days < 7 && timeDiff > 0;

    const discount = discountType === "percentage" ? <>{discountValue}% </> : <>${discountValue}</>;

    return (
        <div className="p-4 sm:p-5 font-sans border min-w-[300px] border-gray-400 bg-slate-50  shadow-lg rounded-lg sm:w-1/2 md:w-[48%] lg:w-[30%]"

            onClick={onClick}>
            <div className="flex flex-col gap-4 pb-2 ">
                <div className="text-2xl sm:text-3xl font-semibold">
                    {discount} OFF
                </div>
                <div className="text-xs font-semibold
                . sm:text-sm text-gray-500">
                    FOR WHOLE ORDER
                </div>
                <div className="flex flex-wrap text-sm items-center gap-2">
                    <div className="flex gap-3  items-center">
                        <div className="text-xs sm:text-sm">Code:</div>
                        <span className={`flex ${isTextCopy ? "text-green-400 bg-green-100 px-2 rounded" : "text-black"}`}>
                            {couponCode}
                        </span>
                    </div>
                    <div className="flex flex-grow justify-end gap-2">
                        <span className="flex gap-1 items-center" onClick={() => {

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
                {isFlashSale && (<div className=" bg-yellow-300 flex  justify-between font-bold text-[0.60rem] p-1">
                    <div className="flex justify-start items-center">
                        <MdFlashOn className='text-sm mx-1' />
                        <h2> Flash sale</h2>
                    </div>
                    <div>
                        <CountdownTimer expirationDate={"2023-11-05T23:59:59.999Z"} />
                    </div>
                </div>)}
                <div className="flex flex-col text-xs text-gray-500">
                    <ul className="pl-2 list-disc">
                        <li > <span className=" list flex gap-1 flex-wrap">{<FormatDateTime dateTime="2023-11-01T12:30:59.999Z" />} - {<FormatDateTime dateTime={expirationDate} />} </span></li>
                        <li>For all products.</li>
                        <li>
                            Combinations: Get {discount} off when you spend over ${minimumAmount}.00 or get 15%
                            off when you spend any way over $100.00.
                        </li>
                    </ul>
                </div>
            </div>
            {isNotify && (
                <div className="fixed top-[16%] left-1/2 transform -translate-x-1/2 px-4 p-1 bg-green-700 text-white rounded-lg text-[0.60rem] md:text-xs  flex  items-center">
                    <MdDone className="text-2xl mr-2" />
                    <span>
                        {`Coupon code ${couponCode} is copied to your clipboard ... `}
                    </span>
                </div>
            )}
        </div>
    )
}

export default DummyCard;
