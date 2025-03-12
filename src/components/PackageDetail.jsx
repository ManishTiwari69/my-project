import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const PackageDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [packageDetail, setPackageDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPeople, setNumPeople] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/package/${slug}`)
      .then((response) => {
        setPackageDetail(response.data);
        setTotalPrice(response.data.price); // Initialize with base price
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [slug]);

  const calculateDiscountedPrice = (peopleCount) => {
    const basePrice = packageDetail.price;
    let discount = 0;

    if (peopleCount >= 2 && peopleCount <= 3) {
      discount = 0.05; // 5% discount
    } else if (peopleCount >= 4 && peopleCount <= 6) {
      discount = 0.1; // 10% discount
    } else if (peopleCount >= 7) {
      discount = 0.15; // 15% discount
    }

    const discountedPricePerPerson = basePrice * (1 - discount);
    return discountedPricePerPerson * peopleCount;
  };

  const addPerson = () => {
    setNumPeople((prev) => {
      const newNumPeople = prev + 1;
      setTotalPrice(calculateDiscountedPrice(newNumPeople));
      return newNumPeople;
    });
  };

  const removePerson = () => {
    setNumPeople((prev) => {
      const newNumPeople = prev > 1 ? prev - 1 : 1;
      setTotalPrice(calculateDiscountedPrice(newNumPeople));
      return newNumPeople;
    });
  };
  const handleBookingClick = async () => {
    try {
      // Send a request to check if the user is authenticated (based on session)
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        withCredentials: true, // Make sure to include cookies with the request
      });
  
      if (response.status === 200) {
        // User is authenticated, proceed to the BookingForm page
        navigate("/BookingForm", {
          state: {
            packageName: packageDetail.p_title,
            packagePrice: totalPrice,
            startDate: startDate,
            numPeople: numPeople,
          },
        });
      }
    } catch (error) {
      // If there was an error (e.g., user is not authenticated), redirect to login
      console.error("Error checking user session", error);
      navigate("/login", {
        state: {
          redirectTo: "/BookingForm",
          packageData: {
            packageName: packageDetail.p_title,
            packagePrice: totalPrice,
            startDate: startDate,
            numPeople: numPeople,
          },
        },
      });
    }
  };
  

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error.message}</p>;

  return (
    <>
      <Header />
      <div className="bg-white w-full h-[10vh]"></div>
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 p-8 bg-white rounded-lg shadow-lg text-lg font-mons">
          <h1 className="text-3xl font-bold mb-4">{packageDetail.p_title}</h1>
          <img src={packageDetail.p_imageUrl} alt={packageDetail.p_title} className="w-full h-[500px] rounded-lg mb-4 object-cover" />
          <p className="mb-4 text-gray-800">{packageDetail.content_one}</p>
          <p className="mb-4 text-gray-800">{packageDetail.content_two}</p>
          <p className="mb-4 text-gray-800">{packageDetail.content_three}</p>
          <p className="mb-4 text-gray-800">{packageDetail.content_four}</p>
          <pre className="bg-gray-100 p-4 rounded-lg text-gray-800 whitespace-pre-wrap">
            <p className="text-xl">Itinerary:</p>
            {packageDetail.itinerary}
          </pre>
        </div>
        <div className="w-full md:w-1/4 p-6 bg-gray-100 rounded-lg mb-8 md:mb-0 md:ml-8 h-full sticky top-20 mt-10 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Price Details</h2>
          <div className="mb-4">
            <p className="text-lg font-medium">Package Price:</p>
            <p className="text-2xl font-semibold">
              <i className="bx bx-dollar"></i>
              {totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-lg font-medium">Number of People:</p>
            <div className="flex items-center ml-2">
              <p className="text-xl font-semibold">{numPeople}</p>
              <button onClick={addPerson}>
                <i className="bx bx-plus bg-blue-500 px-1 py-1 ml-2 rounded-md text-white"></i>
              </button>
              <button className="" onClick={removePerson}>
                <i className="bx bx-minus text-white bg-red-500 px-1 py-1 ml-1 rounded-md"></i>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-lg font-medium mb-2" htmlFor="startDate">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="mt-4">
            <p className="text-gray-600">* Group discounts apply for larger bookings.</p>
            <ul className="text-gray-600 text-sm mt-2">
              <li>👥 2-3 people: <b>5% discount</b></li>
              <li>👥 4-6 people: <b>10% discount</b></li>
              <li>👥 7+ people: <b>15% discount</b></li>
            </ul>
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 transition-colors text-white py-2 px-4 rounded-lg mt-5 font-semibold"
            onClick={handleBookingClick}
          >
            Book this package
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PackageDetail;
