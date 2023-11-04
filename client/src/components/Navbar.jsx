import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidHot, BiChevronDown, BiChevronUp, BiSolidUser, BiSolidCartAlt, BiMenu } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';

const Navbar = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="bg-yellow-100">
            <div className="flex font-mono flex-row justify-between mx-10">
                <div className="flex justify-center items-center gap-1 px-2 text-xl">
                    <BiSolidHot />
                    <h1> Hotbeans</h1>
                </div>

                <div className="flex justify-between gap-2 text-sm md:gap-8 items-center pt-4 p-2 px-1">
                    <div className="hidden sm:flex justify-between gap-2 text-sm md:gap-8 items-center px-1">
                        <Link to="/" className={`flex justify-center items-center mx-2 text-md ${location.pathname === '/' ? 'text-red-600' : ''}`}>
                            Bestsellers
                        </Link>
                        <Link to="/shope" className={`flex justify-center items-center text-md gap-1 ${location.pathname === '/shope' ? 'text-red-600' : ''}`}>
                            Shop all {location.pathname === '/shope' ? (<BiChevronUp className="flex text-2xl items-center" />) : (<BiChevronDown className="flex text-2xl items-center" />)}
                        </Link>
                        <Link to="/seller" className={`flex justify-center items-center text-md gap-1 ${location.pathname === '/seller' ? 'text-red-600' : ''}`}>
                            % Sales  {location.pathname === '/seller' ? (<BiChevronUp className="flex text-2xl items-center" />) : (<BiChevronDown className="flex text-2xl items-center" />)}

                        </Link>
                        <div className="flex justify-center items-center text-md gap-2">
                            <BiSolidUser className="text-xl" />
                            <h2>Hi kiran</h2>
                        </div>
                    </div>

                    <div className="relative flex items-center">
                        <Link to="/cart" className="flex justify-center text-3xl gap-1 cursor-pointer">
                            <BiSolidCartAlt className={`z-10 ${location.pathname === '/cart' ? 'text-red-600' : ''}`} />
                            <span
                                className="absolute top right-1 bg-yellow-400 mr-1 text-white p-2 rounded-full text-xs"
                                style={{
                                    transform: 'translate(50%, -50%)',
                                    width: '1.2rem',
                                    height: '1.2rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                3
                            </span>
                        </Link>
                    </div>
                    <BiMenu className="flex sm:hidden justify-center text-3xl gap-1 cursor-pointer" onClick={toggleMobileMenu} />
                </div>
            </div>
            {isMobileMenuOpen && (
                <div>
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-500 bg-opacity-95 p-5">
                        <div className="bg-white flex flex-col justify-start items-start rounded-lg px-6 gap-3 py-10">
                            <Link to="/" className={`text-lg rounded-lg px-2 hover:bg-yellow-50 hover:text-yellow-600  ${location.pathname === '/' ? 'text-red-600' : ''}`} onClick={closeMobileMenu}>
                                Bestsellers
                            </Link>
                            <Link to="/shope" className={`text-lg rounded-lg px-2 hover:bg-yellow-50 hover:text-yellow-600  ${location.pathname === '/shope' ? 'text-red-600' : ''}`} onClick={closeMobileMenu}>
                                Shop all
                            </Link>
                            <Link to="/seller" className={`text-lg rounded-lg px-2 hover:bg-yellow-50 hover:text-yellow-600  ${location.pathname === '/seller' ? 'text-red-600' : ''}`} onClick={closeMobileMenu}>
                                % Sales
                            </Link>
                        </div>
                    </div>
                    <GrClose className="fixed top-3 right-3 text-2xl" onClick={closeMobileMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
