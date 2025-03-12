import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // To check if redirected from another page

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!validateEmail(email)) newErrors.email = 'Invalid email format';
        if (!validatePassword(password)) newErrors.password = 'Password must be at least 6 characters long';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const url = admin ? 'http://localhost:3000/adminLogin' : 'http://localhost:3000/userLogin';
        const navigatePath = admin ? '/admin/dashboard' : '/';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();
            setMessage(data.message);

            if (data.success) {
                localStorage.setItem('auth', 'true'); // Save login status
                localStorage.setItem('user', JSON.stringify(data.user)); 
                // Check if redirected from booking & restore data
                if (location.state?.redirectTo) {
                    navigate(location.state.redirectTo, { state: location.state.packageData });
                } else {
                    navigate(navigatePath);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-blue-600 text-white">
            <div className="w-[448px] p-10 bg-black bg-opacity-30 rounded-xl shadow-2xl backdrop-blur-md">
                <form id="loginForm" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold uppercase mb-6 tracking-widest">Login</h1>

                    <div className="relative mb-6">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full py-2 px-10 bg-white bg-opacity-20 text-white rounded-md outline-none focus:bg-opacity-30 border focus:border-orange-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="bx bxs-user absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-lg"></i>
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="relative mb-6">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full py-2 px-10 bg-white bg-opacity-20 text-white rounded-md outline-none focus:bg-opacity-30 border focus:border-orange-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="bx bxs-lock-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-lg"></i>
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex justify-between items-center mb-6 text-sm">
                        <label>
                            <input
                                type="checkbox"
                                id="admin"
                                name="admin"
                                className="mr-2"
                                checked={admin}
                                onChange={(e) => setAdmin(e.target.checked)}
                            /> Admin
                        </label>
                        <a href="#" className="text-orange-400 hover:text-yellow-300 transition-colors duration-300">Forgot password?</a>
                    </div>

                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-md uppercase font-bold tracking-wider transition-all duration-300 hover:from-blue-700 hover:to-blue-400">
                        Login
                    </button>

                    <div className="mt-6 text-sm">
                        <p>Don't have an account? <Link to="/SignUp" className="text-orange-400 hover:text-yellow-300 transition-colors duration-300">Register</Link></p>
                    </div>

                    {message && <p className="text-yellow-400 text-center mt-4">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
