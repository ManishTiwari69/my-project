import { useState } from "react";
import { useEffect } from "react";

const Hero=()=>{
    const [currentIndex,setCurrentIndex]=useState(0);
    const prevBtn=()=>{
        const isFirstSlide=currentIndex===0;
        const tempIndex=isFirstSlide?imageDetails.length-1:currentIndex-1;
        setCurrentIndex(tempIndex);
    }
    const nextBtn=()=>{
        const isLastSlide=currentIndex===imageDetails.length-1;
        const tempIndex=isLastSlide?0:currentIndex+1;
        setCurrentIndex(tempIndex);
    }
    
    
const imageDetails=[
    {
        id:1,
        title:"Trekking in Nepal",
        des:"Immerse yourself in the breathtaking landscapes of Nepal, where majestic peaks and serene valleys await. Perfect for adventure seekers and nature lovers.",
        url:"1.jpg",
        alt:"Bird Sitting on the tree branch"
    },
    {
        id:2,
        title:"Explore Traditions",
        des:"Discover Nepal's vibrant traditions and rich heritage. Explore majestic mountains, ancient temples, and bustling markets. Experience the pulse of festivals and the warmth of the Nepalese people.",
        url:"2.jpg",
        alt:"Picture of women with flowers"
    },
    {
        id:3,
        title:"Everest Base Camp",
        des:"Embark on the journey of a lifetime to Everest Base Camp, where you'll trek through the heart of the Himalayas and witness some of the world's most spectacular scenery.",
        url:"3.jpg",
        alt:"Picture Of Everest Base Camp"
    },
        
    {
        id:4,
        title:"Wildlife Safari",
        des:"Experience the thrill of a wildlife safari in Nepal, where you'll have the chance to spot tigers, elephants, and other exotic animals in their natural habitat.",
        url:"4.jpg",
        alt:"Fox lokking at the camera"
    },  
]
useEffect(() => { const intervalId = setInterval(() => { setCurrentIndex((prevIndex) => (prevIndex + 1) % imageDetails.length); }, 3000);
    return()=>clearInterval(intervalId)
 }, [imageDetails.length]);
 
    return(
        <>
        <section id="Hero-section">
        {/*Image Section */}
        <div className="bg-[#f8f8f8] w-full h-[10vh]"></div>
        <div className=" relative group max-w-full h-[50vh] lg:h-[90vh]">
            <div className="max-w-full h-[50vh] lg:h-[90vh]">
            <img src={imageDetails[currentIndex].url} className="h-full w-full object-cover object-center" alt={imageDetails[currentIndex].alt}></img>
            </div>
            <div>  
            <button className="hidden group-hover:block bg-black/50 rounded-full p-3 text-sm lg:text-xl text-white absolute top-[50%] -translate-x-0 left-2 lg:left-5 translate-y-[-50%] cursor-pointer z-10"
            onClick={prevBtn}><i className='bx bxs-chevron-left'></i></button>
            <button className="hidden group-hover:block bg-black/50 rounded-full p-3  text-sm lg:text-xl text-white absolute top-[50%] -translate-x-0 right-2 lg:right-5 translate-y-[-50%] cursor-pointer z-10" onClick={nextBtn}><i className='bx bxs-chevron-right'></i></button>
            </div>
            <div className="absolute top-0 bg-black/50 h-full w-full">
            </div>
        {/*Text section*/}
            <div className="absolute flex flex-col gap-2 top-[30%] left-[10%] max-w-[50%] h-fit lg:top-[40%]">
                <h1 className="text-md text-white font-mons font-extrabold text-justify h-[25%] md:text-4xl lg:text-6xl">{imageDetails[currentIndex].title}</h1>
                <p className="text-sm text-slate-300 md:text-xl lg:text-2xl font-roboto">{imageDetails[currentIndex].des}</p>
                <div className="flex space-x-3 animate-fadeY">
                <button className="bg-green-700 text-[#ffff] py-1 px-1 lg:p-3 rounded-lg text-sm md:text-lg lg:text-xl hover:bg-green-900 transition-colors duration-300 ease-in">Plan Your Trip</button>
                <button className="text-[#f4f4f4] border-2 border-white rounded-lg p-1 text-sm md:text-md lg:text-lg hover:bg-black transition-colors duration-300 ease-in">View More</button>
                </div>
            </div>
            <div className="absolute bottom-5 flex w-full justify-center gap-1">
            {
                imageDetails.map((item,index)=>{
                    return(
                        <div key={index} className={`cursor-pointer w-2 h-2 lg:w-4 lg:h-4 rounded-full ${currentIndex===index?'bg-white':'bg-gray-500'}`} onClick={()=>{
                            setCurrentIndex(index);
                        }}></div>
                    )
                })
            }
            </div>
            </div>
            </section>  
            </>
    )
}
export default Hero;