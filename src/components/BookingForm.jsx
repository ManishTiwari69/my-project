import Header from "./Header";
import { useLocation } from "react-router-dom";
import{useState} from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
const BookingForm=()=>{
    const location=useLocation();
    const[transactionId,setTransactionId]=useState(null);
    const{packageName,
        packagePrice,
        startDate,
        numPeople
      }=location.state;
      console.log(location);
      const [formData,setFormData]=useState({
        First_Name:'',
        Last_Name:'',
        Email:'',
        Country:'',
        Phone_number:'',
        Address:'',
        Postal_Code:'',
        Package_Name:packageName,
        Start_Date:startDate,
        Num_People:numPeople,
        Price:packagePrice
    
      });
      const handleChange=(e)=>{
            setFormData({
                ...formData,
                [e.target.name]:e.target.value
            }
            )
      } 
      const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        const response=await fetch('http://localhost:3000/booking-form',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...formData,transactionId:transactionId})
        });
        if(response.ok){
            alert('Booking Success');
        }
        else{
            alert("Booking failed");
        }
    }
    catch(error){
            if(error){
                console.log("Error Occured",error);
            }
    }

      }
    return(
        <>
        <Header />
        <div className="h-[10vh] w-full bg-white"></div>
        <div className="p-8 text-xl bg-gray-100 min-h-fit flex justify-evenly items-start">
            <div className="bg-gray-200 rounded-lg p-6 w-[800px] shadow-lg">
            <h1 className="text-3xl font-bold">Booking Form:</h1>
            <form className="flex flex-col lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-2 2xl:grid 2xl:grid-cols-2 gap-10 p-4">
                <label for="Package_Name">* Package Name:<br></br>
                    <input type="text" name="Package_Name" id="Package_Name" className="border-2 border-gray-500 rounded-lg px-4 py-1" value={formData.Package_Name} onChange={handleChange} readOnly></input>
                </label>
                <label htmlFor="Num_People">* Number of People<br></br>
                    <input type="number" name="Num_People" id="Num_People" className="border-2 border-gray-500 rounded-lg px-4 py-1" value={formData.Num_People} onChange={handleChange} readOnly></input>
                </label>
                <label for="Start_Date">* Date:<br></br>
                    <input type="date" name="Start_Date" id="Start_Date" value={formData.Start_Date} className="border-2 border-gray-500 rounded-lg px-4 py-1" onChange={handleChange} readOnly></input>
                </label>
                <label htmlFor="First_Name">* First Name:<br></br>
                    <input type="text" name="First_Name" id="First_Name " value={formData.First_Name} className="border-2 border-gray-500 rounded-lg px-4 py-1"onChange={handleChange}></input>
                </label>
                <label htmlFor="Last_Name">*Last Name:<br></br>
                    <input type="text" name="Last_Name" id="Last_Name" value={formData.Last_Name} className="border-2 border-gray-500 rounded-lg px-4 py-1"onChange={handleChange}></input>
                </label>
                <label htmlFor="Email">* Email:<br></br>
                    <input type="email" name="Email" id="Email" value={formData.Email} className="border-2 border-gray-500 rounded-lg px-4 py-1" onChange={handleChange}></input> 
                </label>
                <label htmlFor="Country">* Country:<br></br>
                    <input type="text" name="Country" id="Country" value={formData.Country} className="border-2 border-gray-500 rounded-lg px-4 py-1" onChange={handleChange}></input>
                    
                </label>
                <label htmlFor="Phone_number">Phone Number:<span className="text-lg text-gray-700">(optional)</span><br></br>
                    <input type="number" id="Phone_number" name="Phone_number" className="border-2 border-gray-500 rounded-lg px-4 py-1" value={formData.Phone_number} onChange={handleChange}></input>
                </label>
                <label htmlFor="Address">* Address:<br></br>
                    <input type="text" id="Address" name="Address" value={formData.Address} className="border-2 border-gray-500 rounded-lg px-4 py-1"onChange={handleChange}></input>
                </label>
                <label htmlFor="Postal Code">Postal Code:<span className="text-lg text-gray-700">(optional)</span><br></br>
                    <input type="number" id="Postal_Code" name="Postal_Code" value={formData.Postal_Code} className="border-2 border-gray-500 rounded-lg px-4 py-1"  onChange={handleChange}></input>
                </label><br></br>
                <label htmlFor="Payment" className="col-span-2 -mt-20 mb-2"><span className="mb-3">* Choose a Payment Method:</span>
                    <PayPalButtons
                        createOrder={(data,actions)=>{
                            return actions.order.create({
                                purchase_units:[
                                    {
                                        amount:{value:packagePrice.toString()},
                                    },
                                ],
                            });
                        }}
                        onApprove={(data,actions)=>{
                            return actions.order.capture().then((details)=>{
                                setTransactionId(details.id);
                            })
                        }}
                        onError={(err)=>{
                            console.error("Paypal Checkout Error",err);
                        }}
                    ></PayPalButtons>

                </label>
                <div className="p-4 col-span-2 -mt-20">
        <p className="text-xl font-semibold mb-2">Rules:</p>
        <ul className="list-disc pl-5 text-gray-600 col-span-2">
        <li>* are compulsory fields.</li>
        <li>Ensure all information provided is accurate and up-to-date.</li>
        <li>Use a valid email address for communication purposes.</li>
        <li>Phone number must be 10 digits.</li>
        <li>Address must include street, city, and postal code.</li>
        </ul>
                </div>
                <button onClick={handleSubmit} className="text-white bg-blue-500 rounded-md col-span-2 py-2 px-4 hover:bg-blue-700 cursor-pointer">Confirm Booking</button>
            </form>
        
        </div>
        </div>
        </>
    )
}
export default BookingForm;