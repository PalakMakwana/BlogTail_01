import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase1";
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import toast from "react-hot-toast";

function Nav() {
    const navigate = useNavigate();
    const userName = JSON.parse(localStorage.getItem('user'));
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('loggedin');
                navigate('/');
                toast.success('User Logged Out')
            })
            .catch((error) => {
                console.log('Error during logout:', error.message);
            });
    };

    return (
        <nav className="bg-white  shadow-lg shadow-blue-500/20  p-2">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        className="h-9 w-9 mb-3 justify-center items-center rounded-full animate-jump-in animate-twice animate-ease-linear cursor-pointer"
                        onClick={() => navigate('/home')}
                        src="https://www.shutterstock.com/image-vector/b-letter-eco-logo-blue-600nw-2326768567.jpg"
                        alt="Logo"
                    />
                    <p className="text-black ml-3 mb-3 text-xs cursor-pointer" onClick={() => navigate('/home')}>
                        Oh My BlOG!
                    </p>
                </div>

                {userName && (
                    <div className="hidden lg:block">
                        <h2 className="text-black mr-96 font-semibold mb-3 capitalize">Welcome, {userName}!</h2>
                    </div>
                )}

               
                <button
                    className="lg:hidden focus:outline-none"
                    onClick={() => setMobileNavOpen(!isMobileNavOpen)}
                >
                    <svg
                        className="w-6 h-6 text-[#265073]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>

              
                <div className={`ml-10 mb-4 flex space-x-10 lg:flex lg:space-x-10 ${isMobileNavOpen ? 'block' : 'hidden'}`}>
                    <button
                        className="px-2 w-20 h-10 sm:px-2 py-2.5 sm:py-2 relative rounded-full group overflow-hidden font-medium text-[#265073] inline-block"
                        onClick={() => navigate('/dashboard')}
                    >
                        <span
                            className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#265073] group-hover:h-full opacity-100"
                        ></span>
                        <span
                            className="relative group-hover:text-white"
                        >
                            USER
                        </span>
                    </button>

                    <button
                        className="px-2 h-10 sm:px-5 py-2.5 sm:py-2 relative rounded-full group overflow-hidden font-medium text-[#265073] inline-block"
                        onClick={() => navigate('/home')}
                    >
                        <span
                            className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#265073] group-hover:h-full opacity-100"
                        ></span>
                        <span
                            className="relative group-hover:text-white"
                        >
                            HOME
                        </span>
                    </button>

                    {/* <button
                        className="relative mb-4 w-28 mr-5 inline-flex px-6 py-2 overflow-hidden text-sm font-medium text-[#265073] rounded-full hover:text-white group hover:bg-gray-50"
                        onClick={handleLogout}
                    >
                        <span
                            className="absolute left-0 block w-44 h-0 transition-all bg-[#265073] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"
                        ></span>
                        <span
                            className="absolute right-0 flex items-center justify-start w-12 h-8 duration-300 transform translate-x-full group-hover:translate-x-1 ease"
                        >
                            <svg
                                className="w-10 h-4 mb-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 4 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </span>
                        <span
                            className="relative w-12 h-2 mr-4 mt-3 text-xl  flex items-center"
                        >
                            Logout
                        </span>
                    </button> */}


<a href="#_" class="relative px-5 py-1 overflow-hidden font-medium text-[#265073] bg-transparent  border-none rounded-full group">
<span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
<span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
<span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
<span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
<span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#265073] opacity-0 group-hover:opacity-100"></span>
<span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease text-lg "onClick={handleLogout}>Logout</span>
</a>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
