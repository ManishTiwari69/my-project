import {useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const Choose=()=>{
    const[packageInfo,setPackageInfo]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/packageInfo')
        .then(response=>{
            setPackageInfo(response.data);
    }).catch(error=>{
        console.log("Error occured:"+error);
    });
    },[])
   
    return(
       <section id="packages">
        <div className="container h-fit bg-gray-200 min-w-[99vw]">
            <div 
            className="text-center">
            <h1 className="text-red-500 text-xl lg:text-2xl font-bold pt-10">Our Top</h1>
            <h1 className="text-blue-700 font-dancing text-2xl lg:text-4xl font-extrabold mb-10">Recommendations for the Season</h1>
            </div>
            <div className="grid grid-cols-1  min-h-fit  gap-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 px-10 py-2">
                { packageInfo.map((item,index)=>{ 
                    return(
                    <div  key={index} className="grid-rows-subgrid  bg-[#FFFAFA] min-h-fit lg:max-h-fit shadow-xl relative  mt-0 rounded-xl">
                    
                    {/*Image Section */}
                    <div className="h-[50%] w-full overflow-hidden">
                        <img src={item.imageUrl} className="h-full w-full object-cover hover:scale-125 duration-300 ease" alt={item.title}></img>
                    </div>
                    {/*Text Section */}
                    <div className="flex flex-col w-full max-h-fit">
                    <div className="w-full p-2 mt-4">
                        <h1 className="font-mons font-bold text-md sm:text-xl">{item.title}</h1>
                        <p className=" text-sm sm:text-lg l">{item.des}</p>
                    </div>
                    {/*Button Section */}
                    <div className="w-full p-2 gap-5 flex flex-row mb-10">
                    <Link to={`/package/${item.slug}`} className="bg-green-500 p-1 md:py-2 md:px-4 text-white rounded-md hover:bg-green-800" aria-label="Book-Now">Book Now</Link>
                        <Link to={`/package/${item.slug}`} className="text-md bg-gray-600 text-white py-1 px-2 rounded-lg hover:bg-gray-900" aria-label="View-More">View More</Link>
                    </div>
                    </div>
                    <div className="absolute top-0 right-2 bg-blue-800 text-white p-1">
                        <p>Top Rated<span className="text-yellow-300"><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i></span></p>
                    </div>
                    <div className="absolute top-[35%]  lg:top-[40%] bg-red-600 rounded-br-lg rounded-tr-lg ">
                        <p className="text-yellow-300  font-roboto pr-4 pl-1">Starts From</p>
                            <p className="text-white font-2xl"><i className='bx bx-purchase-tag' ></i>{item.price}/PP</p>
                    </div>
                   
                </div>)
                })
                
}
            </div>
        </div>
       </section>
       
    )
}
export default Choose;