import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const packagelist = () => {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const packagesPerPage = 5; // Number of packages to display per page

  useEffect(() => {
    axios
      .get("http://localhost:3000/PackagesDetail")
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.log("Error occurred: " + error);
      });
  }, []);

  // Calculate start and end indexes for pagination
  const startIndex = currentPage * packagesPerPage;
  const endIndex = startIndex + packagesPerPage;
  const displayedPackages = packages.slice(startIndex, endIndex);

  // Next and previous functions
  const nextPage = () => {
    if (endIndex < packages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section id="packagesdetails" className="flex flex-col items-center">
      <div className="container bg-gray-200 min-w-[80vw] mx-auto">
        <div className="text-center">
          <h1 className="text-blue-700 font-dancing text-2xl lg:text-4xl font-extrabold mb-10">
            Our Packages
          </h1>
        </div>

        {/* Packages List */}
        <div className="flex flex-col gap-8 px-10 py-2">
          {displayedPackages.map((item, index) => (
            <div
              key={index}
              className="bg-[#FFFAFA] shadow-xl rounded-xl overflow-hidden flex flex-col items-center p-5"
            >
              {/* Image Section */}
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={item.p_imageUrl}
                  className="w-full h-full object-cover hover:scale-110 duration-300 ease-in-out"
                  alt={item.p_title}
                />
              </div>

              {/* Details Section */}
              <div className="text-center mt-4">
                <h1 className="font-mons font-bold text-xl">{item.p_title}</h1>
                <p className="text-md text-gray-600 ">
                  {item.content_one}
                </p>
              </div>

              {/* Price and Rating */}
              <div className="mt-2">
                <p className="text-red-600 font-bold">Starts From ${item.price}/PP</p>
                <p className="text-yellow-500">
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <Link
                  to={`/package/${item.slug}`}
                  className="bg-green-500 py-2 px-4 text-white rounded-md hover:bg-green-700"
                >
                  Book Now
                </Link>
                <Link
                  to={`/package/${item.slug}`}
                  className="bg-gray-600 py-2 px-4 text-white rounded-md hover:bg-gray-900"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6 w-full px-10">
          <button
            onClick={prevPage}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={currentPage === 0}
          >
            Previous
          </button>

          <button
            onClick={nextPage}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              endIndex >= packages.length ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={endIndex >= packages.length}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default packagelist;
