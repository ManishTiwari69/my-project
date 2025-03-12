import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Header from "./Header";
import axios from "axios";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState(null);
  const { packageName, packagePrice, startDate, numPeople } = location.state;

  const [formData, setFormData] = useState({
    Full_Name: "", // Full Name instead of First and Last Name
    Email: "",
    Country: "",
    Phone_number: "",
    Address: "",
    Postal_Code: "",
    Package_Name: packageName,
    Start_Date: startDate,
    Num_People: numPeople,
    Price: packagePrice,
  });

  const [errors, setErrors] = useState({});
  const [isPaying, setIsPaying] = useState(false); // To track if the payment is in progress

  // Check if the user is logged in and fetch their data
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true, // Make sure cookies are included with the request
        });

        if (response.status === 200) {
          // Autofill Full Name and Email from the session data
          const user = response.data; // Assuming the API response has user data
          setFormData((prevData) => ({
            ...prevData,
            Full_Name: user.name, 
            Email: user.email, 
          }));
        } else {
          throw new Error("User not authenticated");
        }
      } catch (error) {
        // If not authenticated, redirect to login
        navigate("/login", {
          state: {
            redirectTo: "/BookingForm",
            packageData: {
              packageName: packageName,
              packagePrice: packagePrice,
              startDate: startDate,
              numPeople: numPeople,
            },
          },
        });
      }
    };

    checkUserAuth();
  }, [navigate, packageName, packagePrice, startDate, numPeople]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.Full_Name) newErrors.Full_Name = "Full Name is required.";
    if (!formData.Email) newErrors.Email = "Email is required.";
    if (!formData.Country) newErrors.Country = "Country is required.";
    if (!formData.Address) newErrors.Address = "Address is required.";

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.Email && !emailRegex.test(formData.Email)) {
      newErrors.Email = "Please enter a valid email address.";
    }

    // Phone number validation (if provided, must be 10 digits)
    if (formData.Phone_number && (isNaN(formData.Phone_number) || formData.Phone_number.length !== 10)) {
      newErrors.Phone_number = "Phone number must be a 10-digit number.";
    }

    // Postal code validation (if provided, must be a number)
    if (formData.Postal_Code && isNaN(formData.Postal_Code)) {
      newErrors.Postal_Code = "Postal code must be a valid number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Proceed with booking submission
    try {
      const response = await fetch("http://localhost:3000/booking-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, transactionId }),
      });

      if (response.ok) {
        alert("Booking Success");
      } else {
        alert("Booking failed");
      }
    } catch (error) {
      console.error("Error Occurred", error);
      alert("An error occurred while processing the booking.");
    }
  };

  return (
    <>
      <Header />
      <div className="h-[10vh] w-full bg-white"></div>
      <div className="p-8 text-xl bg-gray-100 min-h-fit flex justify-evenly items-start">
        <div className="bg-gray-200 rounded-lg p-6 w-[800px] shadow-lg">
          <h1 className="text-3xl font-bold">Booking Form:</h1>
          <form className="flex flex-col lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-2 2xl:grid 2xl:grid-cols-2 gap-10 p-4">
            <label htmlFor="Package_Name">* Package Name:<br />
              <input
                type="text"
                name="Package_Name"
                id="Package_Name"
                className="border-2 border-gray-500 rounded-lg px-4 py-1"
                value={formData.Package_Name}
                onChange={handleChange}
                readOnly
              />
              {errors.Package_Name && <span className="text-red-600">{errors.Package_Name}</span>}
            </label>

            <label htmlFor="Num_People">* Number of People:<br />
              <input
                type="number"
                name="Num_People"
                id="Num_People"
                className="border-2 border-gray-500 rounded-lg px-4 py-1"
                value={formData.Num_People}
                onChange={handleChange}
                readOnly
              />
            </label>

            <label htmlFor="Start_Date">* Date:<br />
              <input
                type="date"
                name="Start_Date"
                id="Start_Date"
                className="border-2 border-gray-500 rounded-lg px-4 py-1"
                value={formData.Start_Date}
                onChange={handleChange}
                readOnly
              />
            </label>

            <label htmlFor="Full_Name">* Full Name:<br />
              <input
                type="text"
                name="Full_Name"
                id="Full_Name"
                value={formData.Full_Name}
                className="border-2 border-gray-500 rounded-lg px-4 py-1"
                onChange={handleChange}
                readOnly
              />
              {errors.Full_Name && <span className="text-red-600">{errors.Full_Name}</span>}
            </label>

            <label htmlFor="Email">* Email:<br />
              <input
                type="email"
                name="Email"
                id="Email"
                value={formData.Email}
                className="border-2 border-gray-500 rounded-lg px-4 py-1"
                onChange={handleChange}
                readOnly
              />
              {errors.Email && <span className="text-red-600">{errors.Email}</span>}
            </label>

            <label htmlFor="Country">* Country:<br />
              <input
                type="text"
                name="Country"
                id="Country"
                value={formData.Country}
                className="border-2 border-gray-500 rounded-lg px-4 py-1"
                onChange={handleChange}
              />
              {errors.Country && <span className="text-red-600">{errors.Country}</span>}
            </label>

            <label htmlFor="Phone_number">Phone Number (optional):<br />
              <input
                type="number"
                name="Phone_number"
                id="Phone_number"
                className="border-2 border-gray-500 rounded-lg px-4 py-1"
                value={formData.Phone_number}
                onChange={handleChange}
              />
              {errors.Phone_number && <span className="text-red-600">{errors.Phone_number}</span>}
            </label>

            <label htmlFor="Address">* Address:<br />
              <input
                type="text"
                name="Address"
                id="Address"
                value={formData.Address}
                className="border-2 border-gray-500 rounded-lg px-4 py-1"
                onChange={handleChange}
              />
              {errors.Address && <span className="text-red-600">{errors.Address}</span>}
            </label>

            <label htmlFor="Postal_Code">Postal Code (optional):<br />
              <input
                type="number"
                name="Postal_Code"
                id="Postal_Code"
                value={formData.Postal_Code}
                className="border-2 border-gray-500 rounded-lg px-4 py-1"
                onChange={handleChange}
              />
              {errors.Postal_Code && <span className="text-red-600">{errors.Postal_Code}</span>}
            </label><br />

            <label htmlFor="Payment" className="col-span-2 z-0 mb-2">
              <span className="mb-3">* Choose a Payment Method:</span>
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: { value: packagePrice.toString() },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  setIsPaying(true); // Disable the button while paying
                  return actions.order.capture().then((details) => {
                    setTransactionId(details.id);
                    setIsPaying(false); // Re-enable the button after successful payment
                  });
                }}
                onError={(err) => {
                  console.error("Paypal Checkout Error", err);
                  setIsPaying(false); // Re-enable the button if there's an error
                }}
                disabled={isPaying} // Disable the button if payment is in progress
              />
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

            <button
              onClick={handleSubmit}
              className="text-white bg-blue-500 rounded-md col-span-2 py-2 px-4 hover:bg-blue-700 cursor-pointer"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
