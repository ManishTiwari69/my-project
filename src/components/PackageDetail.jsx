import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PackageDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [packageDetail, setPackageDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPeople, setNumPeople] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    axios.get(`http://localhost:3000/package/${slug}`)
      .then(response => {
        setPackageDetail(response.data);
        setTotalPrice(response.data.price);
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [slug]);

  const addPrice = () => {
    const newNumPeople = numPeople + 1;
    setNumPeople(newNumPeople);
    setTotalPrice(packageDetail.price * newNumPeople);
  };

  const minusPrice = () => {
    const newNumPeople = numPeople > 1 ? numPeople - 1 : 1;
    setNumPeople(newNumPeople);
    setTotalPrice(packageDetail.price * newNumPeople);
  };

  const handleBookingClick = () => {
    navigate('/BookingForm', {
      state: {
        packageName: packageDetail.p_title,
        packagePrice: totalPrice,
        startDate: startDate,
        numPeople: numPeople
      }
    });
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error.message}</p>;

  return (
    <>
      <Header />
      <div className='bg-white w-full h-[10vh]'></div>
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 p-8 bg-white rounded-lg shadow-lg text-lg font-mons">
          <h1 className="text-3xl font-bold mb-4">{packageDetail.p_title}</h1>
          <img src={packageDetail.p_imageUrl} alt={packageDetail.p_title} className="w-full h-[500px] rounded-lg mb-4 object-cover" />
          <p className="mb-4 text-gray-800">{packageDetail.content_one}</p>
          <p className="mb-4 text-gray-800">{packageDetail.content_two}</p>
          <p className="mb-4 text-gray-800">{packageDetail.content_three}</p>
          <p className="mb-4 text-gray-800">{packageDetail.content_four}</p>
          <pre className="bg-gray-100 p-4 rounded-lg text-gray-800 whitespace-pre-wrap">
            <p className='text-xl'>Itinerary:</p>
            {packageDetail.itinerary}
          </pre>
        </div>
        <div className="w-full md:w-1/4 p-6 bg-gray-100 rounded-lg mb-8 md:mb-0 md:ml-8 h-full sticky top-20 mt-10 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Price Details</h2>
          <div className="mb-4">
            <p className="text-lg font-medium">Package Price:</p>
            <p className="text-2xl font-semibold"><i className='bx bx-dollar'></i>{totalPrice}</p>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-lg font-medium">Number of People:</p>
            <div className="flex items-center ml-2">
              <p className="text-xl font-semibold">{numPeople}</p>
              <button onClick={addPrice}>
                <i className='bx bx-plus bg-blue-500 px-1 py-1 ml-2 rounded-md text-white'></i>
              </button>
              <button className="" onClick={minusPrice}>
                <i className='bx bx-minus text-white bg-red-500 px-1 py-1 ml-1 rounded-md'></i>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-lg font-medium mb-2" htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="mt-4">
            <p className="text-gray-600">* Prices may vary based on the number of people.</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 transition-colors text-white py-2 px-4 rounded-lg mt-5 font-semibold" onClick={handleBookingClick}>Book this package</button>
        </div>
      </div>
    

      <Footer />
    </>
  );
};

export default PackageDetail;
