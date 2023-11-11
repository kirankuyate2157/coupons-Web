import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BiPlus, BiMinus, BiSolidCartAlt, BiRightArrowAlt } from "react-icons/bi";
import { PiSealWarningDuotone } from "react-icons/pi";
import { MdOutlineDeleteOutline, MdCelebration } from "react-icons/md";
import { Link } from "react-router-dom";

const cartItemes = [
    {
        name: "Johan & Nystrim caravan",
        description: "20 oz bag",
        price: 21.02,
        quantity: 2,
    },
    {
        name: "French Roast Noir",
        description: "3 oz bottle",
        price: 15.99,
        quantity: 1,
    },
    {
        name: "Caramel Macchiato",
        description: "12 oz bottle",
        price: 8.75,
        quantity: 3,
    },
    {
        name: "Test Item",
        description: "5 oz bottle",
        price: 5.49,
        quantity: 5,
    },
    {
        name: "Hazelnut Heaven",
        description: "15 oz Pouches",
        price: 9.99,
        quantity: 2,
    },
    {
        name: "Colombian Sunrise",
        description: "32 oz bottle",
        price: 18.49,
        quantity: 1,
    },
];

const SummaryItem = ({ name, description, price, quantity, onRemove, onQuntity }) => {
    const [count, setCount] = useState(quantity || 0);

    useEffect(() => {
        // console.log("changing qintity : ", name);
        onQuntity(name, count);
    }, [count]);

    return (
        <>
            <div className='w-full sm:text-xs text-[0.55rem] md:text-sm flex justify-between'>

                <div className='flex gap-3 '>
                    <div className='flex items-center'>
                        <span className=' p-3 sm:p-6 m-2 bg-red-400'></span>
                    </div>
                    <div className='flex flex-col  justify-center items-start'>
                        <h2>{name}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                <div className='flex gap-5 '>
                    <div className='flex border gap-2 items-center rounded-sm my-5 px-2'>
                        <BiMinus onClick={() => { setCount(count > 0 ? count - 1 : 0) }} />
                        <span>{count}</span>
                        <BiPlus onClick={() => { setCount(count + 1) }} />
                    </div>
                    <h2 className="flex items-center">${price}</h2>
                    <div className="flex items-center gap-1 mr-2" onClick={onRemove}>
                        <MdOutlineDeleteOutline className="text-xl" />
                        <h2>Remove</h2>
                    </div>
                </div>
            </div>
            <hr className='border-gray-400 my-2' />
        </>
    );
};

const OrderSummary = ({ totalPrice }) => {
    const [couponValue, setCouponValue] = useState("");
    const [subtotal, setSubtotal] = useState(totalPrice | 0);
    const [appliedDiscount, setAppliedDiscount] = useState(totalPrice | 0);
    const [discount, setDiscount] = useState(0);
    const [discData, setDiscData] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleShowError = () => {
        setIsError(true);
        setTimeout(() => {
            setIsError(false);
        }, 2000);
    };
    const handleShowSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 4000);
    };
    useEffect(() => {
        setSubtotal(totalPrice);
        if (subtotal > 0 && couponValue)
            applyCoupon();
        else
            setAppliedDiscount(totalPrice);
    }, [totalPrice])
    const applyCoupon = () => {
        // Verify and apply the coupon by making a POST API request
        // const bodyData = { couponCode: "J54KEV8142", orderTotal: 500.87 };
        if (!couponValue) {
            console.log("provide valid data..");
            return;
        } else {
            console.log(`veifying coupon code: ${couponValue} for the amaunt:${subtotal} `);
        }
        axios.get(`/kkcoupon/api/v1/coupons/verify/${couponValue}/${subtotal}`)
            .then((response) => {
                // Handle the API response and set the discount
                const data = response.data;
                console.log("data  disc .. got : ", data);
                setDiscount(data.discount);
                let disc = data.discountType === "percentage" ? `${data.discountValue} %` : ` $ ${data.discountValue}`
                setDiscData(disc);
                setAppliedDiscount(subtotal - discount)
                if (data.discount >= subtotal) {
                    setDiscData("100 %");
                    setDiscount(subtotal);
                    setAppliedDiscount(0);
                    handleShowSuccess();
                }

            })
            .catch((error) => {
                console.log("error body data: ", JSON.stringify(error));
                // Handle errors here (e.g., invalid coupon code)
                setDiscount(0);
                appliedDiscount(subtotal);
                setErrorMessage(error.response.data.error);
                handleShowError();
                // alert("Invalid coupon code");

            });
    }

    return <>
        <div className='flex text-xs md:text-sm border border-gray-500 p-5 rounded-md flex-col gap-5'>
            <div className=" flex justify-between">
                <h3>Subtotal: </h3>
                <h3>${subtotal}</h3>
            </div>
            <div className=" flex justify-between">
                <h3>Shipping: </h3>
                <h3>Calculated at next step</h3>
            </div>
            <div>
                <h3>Coupon Code:</h3>
                <div className=" border my-2 flex w-full">
                    <input value={couponValue} name="couponCode" className="w-full focus:outline-none px-2 "
                        onChange={(e) => { setCouponValue(e.target.value) }}
                    />
                    < BiRightArrowAlt className="bg-black text-white h-full text-4xl"
                        onClick={() => { applyCoupon() }} />
                </div>
            </div>
            <div className="text-xs md:text-sm">
                <h3>Promotions:</h3>
                <div className=" p-1 flex justify-between items-center w-full">
                    <h3 className="flex border px-2 bg-gray-300 boarder border-violet-950 text-violet-950 rounded gap-1 items-center"><BiSolidCartAlt /> {couponValue} <span>{discData}</span></h3>
                    <h3 className="text-green-400 ">-${discount}</h3>
                </div>
            </div>
            <hr className=' border-gray-400 my-1' />
            <div className=" flex justify-between items-center">
                <h3>applied subtotal: </h3>
                <h3 className="text-green-500 ">${appliedDiscount}</h3>
            </div>
            <div className=" flex justify-between">
                <h3>Final total: </h3>
                <h3>${appliedDiscount}</h3>
            </div>
            {isError && (
                <div className="fixed top-[16%] left-1/2 transform -translate-x-1/2 px-4 p-1 bg-yellow-400 text-white rounded-lg text-[0.80rem] md:text-xs flex items-center">
                    <PiSealWarningDuotone className="text-2xl mr-2" />
                    <span>{errorMessage}</span>
                </div>
            )} {success && (<div className="fixed top-[16%] left-1/2 transform -translate-x-1/2 px-4 p-1 bg-green-600 text-white rounded-lg text-[0.80rem] md:text-xs flex items-center">
                <MdCelebration className="text-2xl mr-2" />
                <span>You won the Free of Cost coupons Apply it.</span>
            </div>)
            }
        </div>
    </>
}

const Cart = () => {

    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([...cartItemes]);


    const calculateTotalPrice = () => {

        const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        setTotalPrice(total);
        return total;
    };
    // Function to remove an item from the cart
    const removeFromCart = (item) => {
        if (item.quantity > 1) {
            const updatedCart = cartItems.map((cartItem) => {
                if (cartItem === item) {
                    if (cartItem.quantity > 1) {
                        return { ...cartItem, quantity: cartItem.quantity - 1 };
                    }
                }
                let total = cartItem.quantity * cartItem.quantity;
                if (totalPrice - total > 0)
                    setTotalPrice(totalPrice - total);
            });
        }

        const updatedCart = cartItems.filter((cartItem) => cartItem !== item);
        setCartItems(updatedCart);
    };
    const changeQuantity = (item, count) => {
        const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.name === item) {
                return { ...cartItem, quantity: count };
            }
            return cartItem;
        });
        setCartItems(updatedCart);

    };
    useEffect(() => {
        localStorage.setItem("cartCount", JSON.stringify(cartItems.length));

    }, [cartItems.length]);

    useEffect(() => {
        calculateTotalPrice();

    }, [totalPrice, cartItems]);


    return (
        <div className=' font-mono '>
            <Navbar />
            <div className='sm:px-10 px-4'>
                <div className=' flex w-full justify-center items-center  text-extrabold text-3xl p-10 '>
                    <h1>Cart</h1>
                </div>
                <div className='lg:flex-row flex flex-col-reverse  w-full  justify-between'>
                    <div className=' w-full lg:w-[60%] md:p-6'>
                        <h2 className='my-2'>Item summary({cartItems.length})</h2>
                        <hr className=' border-gray-400 my-2' />
                        {cartItems.map((item, index) => (
                            <SummaryItem
                                key={index}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                quantity={item.quantity}
                                onRemove={() => removeFromCart(item)}
                                onQuntity={(item, count) => changeQuantity(item, count)}
                            />
                        ))}
                    </div>
                    <div className=' w-full lg:w-[38%] md:p-6'>
                        <h2 className='my-3'>Order summary</h2>

                        <OrderSummary totalPrice={totalPrice} />
                        <Link to="/cart/info" className=' flex justify-center rounded-lg text-white bg-black hover:bg-slate-800 my-4'>
                            <h2 className='p-3'> CheckOut</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
