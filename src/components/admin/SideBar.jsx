import { useState } from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [showUser, setShowUser] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showBooking, setShowBooking] = useState(false);

    function toggleContent() {
        setShowContent(!showContent);
    }

    function toggleBooking() {
        setShowBooking(!showBooking);
    }

    function toggleUser() {
        setShowUser(!showUser);
    }

    return (
        <>
            <div className="bg-gray-800 text-white min-h-screen min-w-fit pl-4 pt-5 relative border-r-2 border-gray-700">
            <a href="http://localhost:5173/">
      <img src="/logo.png" className="h-14" alt="Logo" />
    </a>
                <div className="sm:text-lg lg:text-xl mt-10 flex flex-col gap-4 p-2">
                    <p className="hover:text-gray-400 cursor-pointer"><i className='bx bxs-dashboard'></i><Link to='/admin/dashboard'> Dashboard</Link></p>
                    <p className="cursor-pointer hover:text-gray-400" onClick={toggleUser}><i className='bx bxs-user'></i> User Management</p>
                    {showUser && (
                        <ul className="pl-8">
                            <li className='hover:text-gray-400 cursor-pointer'><i className='bx bxs-user-plus p-2'></i><Link to="/admin/userManagement">Add and Modify User</Link></li>
                    
                           
                        </ul>
                    )}
                    <p className="cursor-pointer hover:text-gray-400" onClick={toggleContent}><i className='bx bxs-book-content'></i> Content Management</p>
                    {showContent && (
                        <ul className='pl-8'>
                            <li className='hover:text-gray-400 cursor-pointer'><i className='bx bxs-edit-alt p-2'></i><Link to="/admin/recommendations">Recommendations</Link></li>
                            <li className='hover:text-gray-400 cursor-pointer'><i className='bx bxs-edit-alt p-2'></i><Link to="/admin/package_detail">Package Details</Link></li>
                        </ul>
                    )}
                    <p onClick={toggleBooking} className="cursor-pointer hover:text-gray-400"><i className='bx bxs-wallet'></i> Booking Management</p>
                    {showBooking && (
                        <ul className='pl-8'>
                            <li className='hover:bg-gray-700 active:bg-gray-600 cursor-pointer transition-colors rounded-lg'><i className='bx bx-check p-2'></i><Link to="/admin/bookedpackage">Booked Packages</Link></li>
                        </ul>
                    )}
                    
                </div>
            </div>
        </>
    );
}

export default SideBar;
