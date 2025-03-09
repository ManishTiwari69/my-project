import { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [data, setData] = useState([]);
    const[updateId,setUpdateId]=useState(null);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        address: '',
        phone_number: '',
        role: 'user'  
    });
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch(isUpdate ? 'http://localhost:3000/updateUserInfo' : 'http://localhost:3000/addUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(isUpdate?{...formData,id:updateId}:formData)
            });
            if (response.ok) {
                alert(isUpdate?'Data Updated successfully':'Data Added Successfully');
                window.location.reload();
            } else {
                console.log('Unsuccess');
                alert('Data not added');
            }
        } catch (error) {
            console.log('Error occurred: ' + error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3000/userInfo') 
            .then(response => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error('Expected data to be an array:', response.data);
                }
            })
            .catch(error => {
                console.error('Data Fetch error:', error); 
            });
    }, []); 

    const limitWords = (str, num) => {
        return str.split(" ").slice(0, num).join(" ") + (str.split(" ").length > num ? "..." : "");
    };

    const handleUpdate = (item) => {
        setFormData({
            full_name: item.Full_Name,
            email: item.email,
            password: item.password,
            address: item.address,
            phone_number: item.Phone_number,
            role: item.role
        });
        setIsUpdate(true);
        setUpdateId(item.id);
    };

    const handleDelete = async(id) => {
        try{
            const response=await fetch('http://localhost:3000/deleteUserInfo',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({id:parseInt(id)})
            })
            if(response.ok){
                alert("User Deleted Successfully");
                window.location.reload();
            }
            else{
                alert('USer Deletion Failed');
            }
        }
        catch(error){
            console.log('Error:'+error);
        }
    };

    return (
        <>
            <div className="flex font-roboto flex-col">
                <div className="w-full mx-auto p-6 bg-gray-100">
                    <div className="bg-white shadow-xl rounded-lg p-7">
                        <p className="text-4xl font-semibold">{isUpdate ? 'Update User Info' : 'Add User Info'}</p>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="full_name" className="block text-lg">Full Name:</label>
                                <input type="text" id="full_name" name="full_name" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.full_name} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-lg">Email:</label>
                                <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-lg">Password:</label>
                                <input type="password" id="password" name="password" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-lg">Address:</label>
                                <input type="text" id="address" name="address" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.address} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone_number" className="block text-lg">Phone Number:</label>
                                <input type="tel" id="phone_number" name="phone_number" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.phone_number} onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="role" className="block text-lg">Role:</label>
                                <select id="role" name="role" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.role} onChange={handleChange} required>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <input type="submit" value={isUpdate ? 'Update Info' : 'Add Info'} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 cursor-pointer" />
                        </form>
                    </div>
                </div>
                <div className="max-w-full px-2 py-4 bg-white shadow-lg mt-10 overflow-x-auto">
                    <p className="text-4xl font-semibold mb-4">User Information</p>
                    <table className="w-full border-2 border-gray-200 overflow-x-auto">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className='py-1 px-2'>id</th>
                                <th className="py-1 px-2">Full Name</th>
                                <th className="py-1 px-2">Email</th>

                                <th className="py-1 px-2">Address</th>
                                <th className="py-1 px-2">Phone Number</th>
                                <th className="py-1 px-2">Role</th>
                                <th className="py-1 px-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Array.isArray(data) ? (
                                data.map((item) => (
                                    <tr key={item.email} className="hover:bg-gray-100">
                                         <td className="py-3 px-6 border">{item.id}</td>
                                        <td className="py-3 px-6 border">{item.Full_Name}</td>
                                        <td className="py-3 px-6 border">{item.email}</td>

                                        <td className="py-3 px-6 border">{limitWords(item.address, 10)}</td>
                                        <td className="py-3 px-6 border">{item.Phone_number}</td>
                                        <td className="py-3 px-6 border">{item.role}</td>
                                        <td className="py-4 px-8 border">
                                            <button className="bg-blue-500 px-4 py-2 text-white rounded-md font-bold mr-2" onClick={() => handleUpdate(item)}>Update</button>
                                            <button className="bg-red-500 px-4 py-2 text-white rounded-md mt-2" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="py-3 px-6 border" colSpan="6">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UserManagement;
