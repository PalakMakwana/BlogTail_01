
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase1";
import { signOut } from 'firebase/auth';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const userName = JSON.parse(localStorage.getItem('user'));

    // Logout functionality
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('loggedin');
                navigate('/');
            })
            .catch((error) => {
                console.log('Error during logout:', error.message);
            });
    };

    return (
        <nav className="bg-gray-800 h-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center  mt-2">
                     
                        <img className="h-14 w-14 mt-2 rounded-full animate-jump-in animate-twice animate-ease-linear" onClick={()=>navigate('/home')} src="https://www.shutterstock.com/image-vector/b-letter-eco-logo-blue-600nw-2326768567.jpg" alt="Workflow" />
                        <p className="text-white mt-2 ml-3 text-xs">Oh My BlOG !</p>
                    </div>

                    {userName && (
                        <div className="flex items-center mt-2">
                            <h2 className="text-white mr-96">Welcome, {userName}!</h2>
                           
                        </div>
                    )}

  
<div className="ml-10 mt-2  flex space-x-12">
                            <button className="text-white" onClick={() => navigate('/dashboard')}>My post</button>
                            <button className="text-white" onClick={() => navigate('/home')}>Home</button>
                            <button className="text-white" onClick={() => navigate('/megamenu')}>Add Blog</button>
                           
                        </div>
<button className="text-white mt-2" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
