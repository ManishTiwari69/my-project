import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const Navigate=useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
        const response=await fetch('http://localhost:3000/SignUp',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        if(response.ok){
            console.log('Sign Up success!!');
            alert('Sign up success!!');
            Navigate('/');
        }
        else{
            alert('Sign up failed!!');
        }
    }catch(err){
        console.log("Error occured"+err);
    }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 p-4">
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Sign Up</h1>
                <p className="text-center text-gray-600 mb-6">Create an account to get started</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full px-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-900"
                            required
                        />
                        <i className="bx bx-user absolute top-1/2 left-4 transform -translate-y-1/2 text-black text-lg"></i>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="w-full px-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-900"
                            required
                        />
                        <i className="bx bx-home absolute top-1/2 left-4 transform -translate-y-1/2 text-black text-lg"></i>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full px-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-900"
                            required
                        />
                        <i className="bx bx-phone absolute top-1/2 left-4 transform -translate-y-1/2 text-black text-lg"></i>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-900"
                            required
                        />
                        <i className="bx bx-envelope absolute top-1/2 left-4 transform -translate-y-1/2 text-black text-lg"></i>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full px-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-900"
                            required
                        />
                        <i className="bx bx-lock absolute top-1/2 left-4 transform -translate-y-1/2 text-black text-lg"></i>
                    </div>
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition duration-300">
                        Sign Up
                    </button>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

