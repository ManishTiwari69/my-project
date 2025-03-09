import { useState,useEffect } from "react";

const BookedPackage=()=>{
    const [bookData,setBookData]=useState(null);
    const[updatePress,setUpdatePress]=useState(false);
    const [id,setId]=useState(null);
    const[formData,setFormData]=useState({
        First_Name:'',
        Last_Name:'',
        Email:'',
        Country:'',
        Phone_Number:'',
        Address:'',
        Postal_Code:'',
        Package_Name:'',
        Start_Date:'',
        Num_People:'',
        id:''

    })
    useEffect(()=>{
        const bookingFetch=async()=>{
            try{
                const response=await fetch('http://localhost:3000/bookingDetails',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                    }
                });
                if(response.ok){
                    const data=await response.json();
                    setBookData(data);
                }
                else{
                    setBookData(null);
                }
            }
            catch(err){
                console.log("error"+err);
            }
        };
        bookingFetch();
    },[]);
    const handleChange=(e)=>{
        setFormData(
            {
                ...formData,
                [e.target.name]:e.target.value
            }
        )
    };
    const handleDelete=async(id)=>{
        try{
            const response=await fetch('http://localhost:3000/bookingDelete',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({booking_id:parseInt(id)})
            });
            if(response.ok){
                alert('Deleted Successfully');
                window.location.reload()
            }
        }
        catch(error){
            console.log('Error occured'+err);
        }

    };
    const handleUpdate=(item)=>{
        setFormData({
        First_Name:item.First_Name,
        Last_Name:item.Last_Name,
        Email:item.Email,
        Country:item.Country,
        Phone_Number:item.Phone_Number,
        Address:item.Address,
        Postal_Code:item.Postal_Code,
        Package_Name:item.Package_Name,
        Start_Date:item.Start_Date,
        Num_People:item.Num_People,
        id:item.booking_id
        }
        );
        setUpdatePress(true);
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:3000/updateBooking',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        });
        if(response.ok){
            alert("Updated Successfully!!");
            window.location.reload();
        }
        else{
            alert("Updation Failed");
        }
    }
    
    return(
        <>
        
        <div className="container mx-auto px-4 py-4 bg-white shadow-lg mt-10 overflow-x-auto">
            <p className="text-4xl font-semibold mb-4">Booking Details</p>
            <table className="w-full border-2 border-gray-200">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-1 px-2">booking_id</th>
                        <th className="py-1 px-2">First_Name</th>
                        <th className="py-1 px-2">Last_Name</th>
                        <th className="py-1 px-2">Email</th>
                        <th className="py-1 px-2">Country</th>
                        <th className="py-1 px-2">Phone_Number</th>
                        <th className="py-1 px-2">Address</th>
                        <th className="py-1 px-2">Postal_Code</th>
                        <th className="py-1 px-2">Package_Name</th>
                        <th className="py-1 px-2">Start_Date</th>
                        <th className="py-1 px-2">Num_People</th>
                        <th className="py-1 px-2">Price</th>
                        <th className="py-1 px-2">Transaction_Id</th>
                        <th className="py-1 px-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(bookData) ? (
                bookData.map((item) => (
                    <tr key={item.Transaction_Id} className="hover:bg-gray-100">
                        <td className="py-3 px-6 border">{item.booking_id}</td>
                        <td className="py-3 px-6 border">{item.First_Name}</td>
                        <td className="py-3 px-6 border">{item.Last_Name}</td>
                        <td className="py-3 px-6 border">{item.Email}</td>
                        <td className="py-3 px-6 border">{item.Country}</td>
                        <td className="py-3 px-6 border">{item.Phone_Number}</td>
                        <td className="py-3 px-6 border">{item.Address}</td>
                        <td className="py-3 px-6 border">{item.Postal_Code}</td>
                        <td className="py-3 px-6 border">{item.Package_Name}</td>
                        <td className="py-3 px-6 border">{item.Start_Date}</td>
                        <td className="py-3 px-6 border">{item.Num_People}</td>
                        <td className="py-3 px-6 border">{item.price}</td>
                        <td className="py-3 px-6 border">{item.Transaction_Id}</td>
                        <td className="py-4 px-8 border">
                            <button className="bg-blue-500 px-4 py-2 text-white rounded-md font-bold mr-2" onClick={() => handleUpdate(item)}>Update</button>
                            <button className="bg-red-500 px-4 py-2 text-white rounded-md mt-2" onClick={() => handleDelete(item.booking_id)}>Delete</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="12" className="text-center py-3">No data available</td>
                </tr>
            )}
        </tbody>
    </table>
</div>
{ updatePress &&(
<div className="flex font-roboto flex-col">
    <div className="w-full mx-auto p-6 bg-gray-100">
        <div className="bg-white shadow-xl rounded-lg p-7">
            <p className="text-4xl font-semibold">Update Personal Information</p>
            <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="First_Name" className="block text-lg">First Name:</label>
                    <input type="text" id="First_Name" name="First_Name" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.First_Name} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="last_name" className="block text-lg">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.Last_Name} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-lg">Email:</label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.Email} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="Country" className="block text-lg">Country:</label>
                    <input type="text" id="Country" name="Country" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.Country} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="Phone_Number" className="block text-lg">Phone Number:</label>
                    <input type="tel" id="Phone_number" name="Phone_number" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.Phone_Number} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-lg">Address:</label>
                    <input type="text" id="Address" name="Address" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.Address} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="Postal_code" className="block text-lg">Postal Code:</label>
                    <input type="number" id="Postal_Code" name="Postal_Code" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.Postal_Code} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="Package_Name" className="block text-lg">Package Name:</label>
                    <input type="text" id="Package_Name" name="Package_Name" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.Package_Name} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="Start_Date" className="block text-lg">Start Date:</label>
                    <input type="date" id="Start_Date" name="Start_Date" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.Start_Date} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="Num_People" className="block text-lg">Number of People:</label>
                    <input type="number" id="Num_People" name="Num_People" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.Num_People} onChange={handleChange} required />
                </div>
                <input type="submit" value="Update Booking details" className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 cursor-pointer" />
            </form>
        </div>
    </div>
</div>)
}
</>
    )
}
export default BookedPackage;