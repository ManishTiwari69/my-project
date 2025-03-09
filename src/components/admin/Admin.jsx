import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideBar from './SideBar';
import TopBar from './TopBar';
import Recommendations from './Recommendations';
import PackageDetail from './PackageDetails';
import UserManagement from './UserManagement';
import BookedPackage from './BookedPackage';
import Dashboard from './Dashboard';

const Admin = () => {
    return (
        <div className="flex">
                <SideBar  />
            <div className='flex-grow'>
                <TopBar />
                <div>
                    <Routes>
                        <Route path="/recommendations" element={<Recommendations />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/package_detail' element={<PackageDetail />}/>
                        <Route path='/UserManagement' element={<UserManagement />}/>
                        <Route path='/bookedpackage' element={<BookedPackage />}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;
