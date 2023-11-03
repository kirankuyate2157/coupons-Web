import {
    // BiChevronUp,
    BiSolidHot,
    BiChevronDown,
    BiSolidUser,
    BiSolidCartAlt,
} from "react-icons/bi";

const Navbar = () => {
    return (
        <div className="bg-yellow-100">
            <div className="flex  font-mono flex-row justify-between  mx-10   ">
                <div className="flex justify-center items-center gap-1 px-2 text-xl">
                    <BiSolidHot />
                    <h1> Hotbeans</h1>
                </div>
                <div className="flex justify-between gap-8 items-center  pt-4 p-2   px-1">
                    <button className="flex justify-center items-center mx-2 text-md">
                        Bestsellers
                    </button>
                    <button className="flex justify-center items-center text-md gap-1">
                        Shop all <BiChevronDown className="flex text-2xl items-center" />
                    </button>
                    <button className="flex justify-center items-center text-md gap-1">
                        % Sales <BiChevronDown className="flex text-2xl items-center" />
                    </button>
                    <div className="flex justify-center items-center text-md gap-2">
                        <BiSolidUser className="text-xl" />
                        <h2>Hi kiran</h2>
                    </div>
                    <div className="relative flex items-baseline justify-center">
                        <div className="flex justify-center  text-3xl mr-2 gap-1">
                            <BiSolidCartAlt className="z-10 " />
                            <span
                                className="absolute top-1 right-1 bg-yellow-400 mr-1 text-white p-2 rounded-full  text-xs "
                                style={{
                                    transform: 'translate(50%, -50%)',
                                    width: '1.2rem',
                                    height: '1.2rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            > 3
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
