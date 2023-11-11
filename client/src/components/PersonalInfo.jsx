import React from 'react'
import { BiSolidHot, BiChevronRight, BiArrowBack, BiRightArrowAlt } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';
const CartItems = () => {
    return <>
        <div className='w-full  sm:text-xs text-[0.65rem] md:text-sm flex justify-between'>
            <div className='flex gap-3 '>
                <div className='flex items-center'>
                    <span className=' p-3 sm:p-6 m-2 bg-red-400'></span>
                </div>
                <div className='flex flex-col  justify-center items-start'>
                    <h2>Johan & Nystrim caravan</h2>
                    <p className='sm:text-[0.65rem] text-[0.45rem] md:text-xs'>Quntity: 2</p>
                </div>
            </div>
            <div className='flex gap-5 '>
                <h2 className="flex items-center">$21.02</h2>
            </div>
        </div>
    </>
}
const PersonalInfo = () => {
    return (
        <div className="flex md:flex-row font-mono flex-col justify-evenly  w-full gap-10  ">
            <div className=' w-full flex flex-col pb-5 px-5 py-3  overflow-y-auto bg-blue-100 gap-5 md:gap-10'>
                <div className="flex justify-start">
                    <div className="flex justify-center items-center gap-1 px-2 text-2xl">
                        <BiSolidHot />
                        <h1> Hotbeans</h1>
                    </div>
                </div>
                <div className="flex justify-start text-[0.50rem] sm:text-sm items-center gap-1 ">
                    <BiChevronRight className='text-2xl' />
                    <span>Cart</span>
                    <BiChevronRight className='text-2xl' />
                    <span className="text-red-800 ">Personal information</span>
                    <BiChevronRight className='text-2xl' />
                    <span>Shipping</span>
                    <BiChevronRight className='text-2xl' />
                    <span>Payment</span>
                </div>
                <div className="flex flex-col text-xs gap-5">
                    <div className="flex text-xs sm:text-xl justify-between">
                        <h2 className="text-sm lg:text-xl font-semibold ">Contact Information</h2>
                        <h3 className=" text-[0.55rem] sm:text-sm">Already have an account? <span className="text-red-800  font-bold cursor-pointer">Log In</span></h3>
                    </div>
                    <div className="flex w-full items-center">
                        <input
                            type="text"
                            className="border-black p-2 w-full bg-transparent border-2 "
                            placeholder="Email or mobile phone number"
                        // value={editedCoupon.discountValue}
                        // onChange={(e) => setEditedCoupon({ ...editedCoupon, discountValue: e.target.value })}
                        />
                    </div>
                    <div>
                        <div className="flex justify-start gap-2   text-[0.55rem] md:text-sm  items-center">
                            <input type="checkbox" />
                            <label>Keep me up to date on news and offers</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col text-[0.55rem] md:text-sm gap-5">
                    <div className="flex justify-start">
                        <h2 className="text-sm lg:text-xl font-semibold">Shipping Address</h2>
                    </div>
                    <div className="flex flex-col gap-4 w-full items-center">
                        <input
                            type="text"
                            className="border-black p-2 w-full bg-transparent border-2 "
                            placeholder="Full Name"
                        />
                        <input
                            type="text"
                            className="border-black p-2 w-full bg-transparent border-2 "
                            placeholder="Company /Organization (optional)"
                        />
                        <input
                            type="text"
                            className="border-black p-2 w-full bg-transparent border-2 "
                            placeholder="Address"
                        />
                        <div className="flex w-full gap-2 ">
                            <input
                                type="text"
                                className="border-black p-2 w-full bg-transparent border-2 "
                                placeholder="Postal Code"
                            /> <input
                                type="text"
                                className="border-black p-2 w-full bg-transparent border-2 "
                                placeholder="City"
                            />
                        </div>
                        <input
                            type="text"
                            className="border-black p-2 w-full bg-transparent border-2 "
                            placeholder="Country/Region"
                        />
                    </div>
                    <div>
                        <div className="flex justify-start gap-2 items-center">
                            <input type="checkbox" />
                            <label>Save this information for next time</label>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div className=' flex flex-col sm:flex-row justify-around items-center text-xs md:text-sm  gap-2 mx-8'>
                    <h2 className='p-3 w-full items-center flex cursor-pointer justify-center rounded-lg text-white bg-black hover:bg-slate-800'> Continue to Shipping</h2>
                    <Link to="/cart" className='p-3 w-full items-center flex justify-center sm:justify-end pr-2 gap-2 '>
                        <BiArrowBack className="text-xl cursor-pointer font-bold" />
                        <h2 className=' cursor-pointer'>Back to Cart</h2>
                    </Link>
                </div>
            </div>
            <div className='w-full gap-3 flex flex-col pr-10 px-5 md:pl-2 md:px-3 opacity-100 transition-opacity max-h-screen overflow-y-auto md:pt-6 '>
                <CartItems />  <CartItems />  <CartItems />  <CartItems />  <CartItems />
                <hr className='border-gray-400 my-2' />
                <div className='w-full flex flex-col md:pl-2 pb-10 text-xs md:text-sm  gap-5'>
                    <div className=" w-full flex gap-2 items-center justify-between">
                        <h3>Discount applied to cart </h3>

                        <div className="flex gap-5 items-center text-xs">
                            <button className="flex gap-1 hover:text-green-700">
                                <BiRightArrowAlt className='text-lg' /> My Coupons
                            </button>
                            <button className="flex gap-1 hover:text-red-700">
                                <MdClose className='text-lg' /> close
                            </button>
                        </div>

                    </div>
                    <div className=" w-full flex justify-between">
                        <h3>Value </h3>
                        <h3 className="text-green-600">- $300.03</h3>
                    </div>
                    <hr className='border-gray-400 my-2' />
                    <div className=" w-full flex justify-between">
                        <h3>Subtotal </h3>
                        <h3 > $250.13</h3>
                    </div> <div className=" w-full flex justify-between">
                        <h3>All your discounts </h3>
                        <h3 className="text-green-600">- $20.11</h3>
                    </div> <div className=" w-full flex justify-between">
                        <h3>Shipping </h3>
                        <h3 > $0.00</h3>
                    </div>
                    <hr className='border-gray-400 my-2' />
                    <div className=" w-full flex justify-between">
                        <h3>Grand total </h3>
                        <h3 >$322.03</h3>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default PersonalInfo;
