import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const Navigate=useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleLogout=()=>{
        axios.get('http://localhost:3000/logout')
        .then(response=>{
            if(response.status==200){
                console.log('Log out Success!!');
                sessionStorage.removeItem('auth');
                Navigate('/login');
            }

            else{   
                console.log('Log out Unsucess!!');

            }
        }).catch(error=>{
            console.log("Error occured"+error);
        })
        

    }

    return (
        <div className="h-[8.5vh] w-full bg-slate-100 p-4 relative">
            <div className="flex items-center justify-end gap-4">
                <span className="text-xl font-semibold">Hello, Manish Tiwari</span>
                <button onClick={handleDropdownToggle}>
                    <img src="/p1.png" className="h-10 rounded-full border-2 border-black relative mr-20" alt="user" />
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 top-20 w-52 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <a href="#" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 text-semibold " onClick={handleLogout}><i className='bx bx-log-out'></i>Sign Out</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;
