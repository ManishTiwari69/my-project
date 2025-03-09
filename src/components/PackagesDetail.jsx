import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PackagesDetail = () => {
  const [PackagesDetail, setPackagesDetail] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/PackagesDetail")
      .then((response) => {
        setPackagesDetail(response.data);
      })
      .catch((error) => {
        console.log("Error occurred: " + error);
      });
  }, []);

  return (
    <section id="packagesdetails">
      <div className="container h-fit bg-gray-200 min-w-[99vw]">
        <div className="text-center">
        
          <h1 className="text-blue-700 font-dancing text-2xl lg:text-4xl font-extrabold mb-10">
            Our Packages
          </h1>
        </div>
        <div className="grid grid-cols-1 min-h-fit gap-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 px-10 py-2">
          {PackagesDetail.map((item, index) => (
            <div
              key={index}
              className="grid-rows-subgrid bg-[#FFFAFA] min-h-fit lg:max-h-fit shadow-xl relative mt-0 rounded-xl"
            >
       
              <div className="h-[50%] w-full overflow-hidden">
                <img
                  src={item.p_imageUrl}
                  className="h-full w-full object-cover hover:scale-125 duration-300 ease"
                  alt={item.p_title}
                />
              </div>

              <div className="flex flex-col w-full max-h-fit">
                <div className="w-full p-2 mt-4">
                  <h1 className="font-mons font-bold text-md sm:text-xl">
                    {item.p_title}
                  </h1>
                  <p className="text-sm sm:text-lg">  {item.content_one.length > 150 ? item.content_one.substring(0, 150) + '...' : item.content_one} </p>

                </div>

     
                <div className="w-full p-2 gap-5 flex flex-row mb-10">
                  <Link
                    to={`/package/${item.slug}`}
                    className="bg-green-500 p-1 md:py-2 md:px-4 text-white rounded-md hover:bg-green-800"
                    aria-label="Book-Now"
                  >
                    Book Now
                  </Link>
                  <Link
                    to={`/package/${item.slug}`}
                    className="text-md bg-gray-600 text-white py-1 px-2 rounded-lg hover:bg-gray-900"
                    aria-label="View-More"
                  >
                    View More
                  </Link>
                </div>
              </div>

              <div className="absolute top-0 right-2 bg-blue-800 text-white p-1">
                <p>
                  Top Rated
                  <span className="text-yellow-300">
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                  </span>
                </p>
              </div>

              <div className="absolute top-[35%] lg:top-[40%] bg-red-600 rounded-br-lg rounded-tr-lg">
                <p className="text-yellow-300 font-roboto pr-4 pl-1">
                  Starts From
                </p>
                <p className="text-white font-2xl">
                  <i className="bx bx-purchase-tag"></i> ${item.price}/PP
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mb-10">
    <Link to="http://localhost:5173/allpackage">
        <button className="font-Playfair font-bold text-white bg-blue-600 py-3 px-6 rounded-lg text-md md:text-lg lg:text-xl hover:bg-blue-900 transition-colors duration-300 ease-in-out">
            View More
        </button>
    </Link>
</div>
    </section>
  );
};

export default PackagesDetail;
