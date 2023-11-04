import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BiPlus, BiMinus, BiSolidCartAlt, BiRightArrowAlt } from "react-icons/bi";

import { MdOutlineDeleteOutline } from "react-icons/md";

const SummaryItem = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className='w-full sm:text-xs text-[0.55rem] md:text-sm flex justify-between'>
                <div className='flex items-center'>
                    <span className=' p-3 sm:p-6 m-2 bg-red-400'></span>
                </div>
                <div className='flex flex-col  justify-center items-start'>
                    <h2>Johan & Nystrim caravan </h2>
                    <p>20 oz bag </p>
                </div>
                <div className='flex border gap-2  items-center rounded-sm my-5 px-2'>
                    <BiMinus onClick={() => { setCount(count > 0 ? count - 1 : 0) }} />
                    <span>{count}</span>
                    <BiPlus onClick={() => { setCount(count + 1) }} />
                </div>
                <h2 className="flex items-center">$21.02</h2>
                <div className="flex items-center gap-1 mr-2 ">
                    <MdOutlineDeleteOutline className="text-xl" />
                    <h2>Remove</h2>
                </div>

            </div>
            <hr className=' border-gray-400 my-2 ' />
        </>
    );
};

const OrderSummary = () => {
    const [couponValue, setCouponValue] = useState("");
    const [discount, setDiscount] = useState(0);

    const applyCoupon = () => {
        // Verify and apply the coupon by making a POST API request
        const bodyData = { couponCode: "J54KEV8142", orderTotal: 500.87 };

        axios
            .get("/kkcoupon/api/v1/coupons/verify", bodyData)
            .then((response) => {
                // Handle the API response and set the discount
                setDiscount(response.data.discountAmount);
            })
            .catch((error) => {
                console.log("error body data: ", bodyData, JSON.stringify(error));
                // Handle errors here (e.g., invalid coupon code)
                alert("Invalid coupon code");
                setDiscount(0);
            });
    };

    return <>
        <div className='flex text-xs md:text-sm border border-gray-500 p-5 rounded-md flex-col gap-5'>
            <div className=" flex justify-between">
                <h3>Subtotal: </h3>
                <h3>$93.87</h3>
            </div>
            <div className=" flex justify-between">
                <h3>Shipping: </h3>
                <h3>Calculated at next step</h3>
            </div>
            <div>
                <h3>Coupon Code:</h3>
                <div className=" border my-2 flex w-full">
                    <input value={couponValue} name="couponCode" className="w-full focus:outline-none px1 "
                        onChange={(e) => { setCouponValue(e.target.value) }}
                    />
                    < BiRightArrowAlt className="bg-black text-white h-full text-4xl"
                        onClick={() => { applyCoupon() }} />
                </div>
            </div>
            <div className="text-xs md:text-sm">
                <h3>Promotions:</h3>
                <div className=" p-1 flex justify-between items-center w-full">
                    <h3 className="flex border px-2 bg-gray-300 boarder border-violet-950 text-violet-950 rounded gap-1 items-center"><BiSolidCartAlt /> NEWSALE_12A4 <span>(-5%)</span></h3>
                    <h3 className="text-green-400 ">-${discount}</h3>
                </div>
            </div>
            <hr className=' border-gray-400 my-1' />
            <div className=" flex justify-between items-center">
                <h3>Subtotal: </h3>
                <h3 className="text-green-500 ">$93.87</h3>
            </div>
            <div className=" flex justify-between">
                <h3>Subtotal: </h3>
                <h3>$93.87</h3>
            </div>
        </div>
    </>
}
const Cart = () => {
    return (
        <div className=' font-mono '>
            <Navbar />
            <div className='sm:px-10 px-4'>
                <div className=' flex w-full justify-center items-center  text-extrabold text-3xl p-10 '>
                    <h1>Cart</h1>
                </div>
                <div className='lg:flex-row flex flex-col-reverse  w-full  justify-between'>
                    <div className=' w-full lg:w-[60%] md:p-6'>
                        <h2 className='my-2'>Item summary(3)</h2>
                        <hr className=' border-gray-400 my-2' />
                        <SummaryItem />   <SummaryItem />   <SummaryItem />   <SummaryItem />   <SummaryItem />   <SummaryItem />
                    </div>
                    <div className=' w-full lg:w-[38%] md:p-6'>
                        <h2 className='my-3'>Order summary</h2>

                        <OrderSummary />
                        <div className=' flex justify-center rounded-lg text-white bg-black hover:bg-slate-800 my-4'>
                            <h2 className='p-3'> CheckOut</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
