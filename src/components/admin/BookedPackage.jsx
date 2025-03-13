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
        Full_Name:item.Full_Name,
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
    const handleCancelRequest=async(booking_id)=>{
        try{
            const response=await fetch('http://localhost:3000/cancelBooking',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({booking_id:parseInt(booking_id)})
            });
            if(response.ok){
                alert("Done!!");
                window.location.reload();
            }
            else{
                alert('Failed');
            }
        }
        catch(err){
            alert('Error occured:',err);

        }

    }
    
    return(
        <>
        
        <div className="container mx-auto px-4 py-4 bg-white shadow-lg mt-10">
    <p className="text-3xl font-semibold mb-4">Booking Details</p>

    {/* Scrollable Table Wrapper */}
    <div className="relative w-full overflow-x-auto border border-gray-300">
        <table className="w-full min-w-[1200px] border-collapse">
            <thead className="bg-gray-800 text-white">
                <tr>
                    {['ID', 'Full Name', 'Email', 'Country', 'Phone', 'Address', 'Postal', 'Package', 'Start Date', 'People', 'Price', 'Transaction','Status', 'Actions',].map(header => (
                        <th key={header} className="py-2 px-4 border">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
    {Array.isArray(bookData) ? (
        bookData.map((item) => (
            <tr key={item.Transaction_Id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border">{item.booking_id}</td>
                <td className="py-3 px-4 border">{item.Full_Name}</td>
                <td className="py-3 px-4 border">{item.Email}</td>
                <td className="py-3 px-4 border">{item.Country}</td>
                <td className="py-3 px-4 border">{item.Phone_Number}</td>
                <td className="py-3 px-4 border">{item.Address}</td>
                <td className="py-3 px-4 border">{item.Postal_Code}</td>
                <td className="py-3 px-4 border">{item.Package_Name}</td>
                <td className="py-3 px-4 border">{item.Start_Date}</td>
                <td className="py-3 px-4 border">{item.Num_People}</td>
                <td className="py-3 px-4 border">{item.price}</td>
                <td className="py-3 px-4 border">{item.Transaction_Id}</td>
                <td className="py-3 px-4 border">
                    {item.Status=="Cancel Request"?(<div className="mt-2">
                            <button
                                className="bg-red-700 px-3 py-1 text-white rounded-md"
                                onClick={() => handleCancelRequest(item.booking_id)}
                            >
                                Cancel Booking
                            </button>
                        </div>):(item.Status)}
                    
                </td>
                <td className="py-4 px-4 border flex flex-wrap gap-2">
                    <button
                        className="bg-blue-500 px-3 py-1 text-white rounded-md"
                        onClick={() => handleUpdate(item)}
                    >
                        Update
                    </button>
                    <button
                        className="bg-red-500 px-3 py-1 text-white rounded-md"
                        onClick={() => handleDelete(item.booking_id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="14" className="text-center py-3">
                No data available.
            </td>
        </tr>
    )}
</tbody>

        </table>
    </div>
</div>


</>
    )
}
export default BookedPackage;