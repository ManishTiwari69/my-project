import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const [bookedPackages, setBookedPackages] = useState([]);

    const menuBtn = () => {
        const ulList = document.getElementById("ulList");
        if (ulList) {
            ulList.classList.toggle("hidden");
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/auth/me", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Error:", err);
            }
        };

        checkUser();
    }, []);

    useEffect(() => {
        const getBookedPackages = async () => {
            if (!user) return; // Ensure user exists before fetching data
    
            try {
                const response = await fetch("http://localhost:3000/userBookedPackages", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ email: user.email }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setBookedPackages(Object.values(data));

                } else {
                    console.error("Failed to fetch booked packages.");
                }
            } catch (err) {
                console.error("Error fetching booked packages:", err);
            }
        };
    
        getBookedPackages();
    }, [user]);
     
     

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/logout", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                alert("Logged out successfully");
                localStorage.setItem('auth','false');
                setUser(null);
            } else {
                alert("Logout failed");
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    };


    return (
        <>
            <header className="flex items-center justify-between py-3 px-5 w-full lg:py-5 lg:px-10 h-[10vh] bg-[#f8f8f8] z-40 fixed">
                {/* Logo Section */}
                <div className="px-3 lg:px-12">
                    <Link to="/">
                        <img src="/logo.png" className="h-12 w-18" alt="logo" />
                    </Link>
                </div>

                {/* Navigation */}
                <nav>
                    <ul className="hidden lg:flex items-center justify-center space-x-4 text-gray-700 font-rale font-bold">
                        <li><a href="/allpackage" className="hover:text-blue-700 transition">Packages</a></li>
                        <li><a href="/Search" className="hover:text-blue-700 transition">Search</a></li>
                        <li><a href="#" className="hover:text-blue-700 transition">About Us</a></li>
                        <li><a href="#" className="hover:text-blue-700 transition">Contact Us</a></li>
                    </ul>
                </nav>

                {/* User Section */}
                <div className="hidden lg:block px-12 relative">
                    {user ? (
                        <>
                            <button onClick={toggleDropdown} className="flex items-center p-1 rounded-full">
                                <p className="text-gray-700 font-bold mr-2">Hello, {user.name}</p>
                                <img
                                    src={user.profilePic || "https://avatar.iran.liara.run/public/boy?username=Ash"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-teal-400 shadow-md"
                                />
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                    <button
                                        onClick={() => setShowProfileCard(true)}
                                        className="block px-4 py-2 text-gray-800 w-full text-left hover:bg-gray-200"
                                    >
                                        User Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700 ml-2 text-lg font-semibold"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden" id="icon">
                    <i className="bx bx-menu text-3xl cursor-pointer" onClick={menuBtn}></i>
                </div>

                <div className="hidden absolute left-0 top-[10vh] w-[100vw] lg:hidden" id="ulList">
                    <ul className="h-full w-full text-center font-sans font-semibold text-lg flex flex-col justify-center text-white">
                        <li className="bg-slate-800 border border-white p-4"><a href="/Package">Packages</a></li>
                        <li className="bg-slate-800 border border-white p-4"><a href="/Search">Search</a></li>
                        <li className="bg-slate-800 border border-white p-4"><a href="#">About Us</a></li>
                        <li className="bg-slate-800 border border-white p-4"><a href="#">Contact Us</a></li>
                    </ul>
                </div>
            </header>

            {/* Profile Card Modal */}
            {showProfileCard && user && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%] text-center">
                        {/* Profile Picture */}
                        <img
                            src={user.profilePic || "https://avatar.iran.liara.run/public/boy?username=Ash"}
                            alt="Profile"
                            className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 shadow-md"
                        />

                        <h2 className="text-xl font-bold mt-4">User Profile</h2>
                        <p><strong>Full Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>

                        <h3 className="text-lg font-semibold mt-4">Booked Packages</h3>
                        <ul className="list-disc ml-5 text-left">
                        {bookedPackages?.length > 0 ? (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {bookedPackages.map((pkg, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Booking {index + 1}</h3>
                <ul className="space-y-2">
                    <li><strong>Booking ID:</strong> {pkg.booking_id}</li>
                    <li><strong>Full Name:</strong> {pkg.First_Name} {pkg.Last_Name}</li>
                    <li><strong>Email:</strong> {pkg.Email}</li>
                    <li><strong>Country:</strong> {pkg.Country}</li>
                    <li><strong>Phone Number:</strong> {pkg.Phone_Number}</li>
                    <li><strong>Address:</strong> {pkg.Address}</li>
                    <li><strong>Postal Code:</strong> {pkg.Postal_Code}</li>
                    <li><strong>Package Name:</strong> {pkg.Package_Name}</li>
                    <li><strong>Start Date:</strong> {pkg.Start_Date}</li>
                    <li><strong>Number of People:</strong> {pkg.Num_People}</li>
                    <li><strong>Price:</strong> {pkg.price}</li>
                    <li><strong>Transaction ID:</strong> {pkg.Transaction_Id}</li>
                </ul>
            </div>
        ))}
    </div>
) : (
    <p>No packages booked.</p>
)}




                        </ul>

                        <button onClick={() => setShowProfileCard(false)} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 w-full">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
