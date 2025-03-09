
const Mission=()=>{
    return(
        <section className="block" id="Mission Section">
        <div className="px-7 py-5  h-fit">
        <div className="w-full bg-[#F8F8FF] rounded-lg flex flex-col overflow-hidden p-4 gap-2 ">
        <div className="text-center  mb-1 lg:mb-10">
            <h1 className="text-3xl font-mons font-bold text-teal-600 lg:text-5xl ">Our Mission</h1>
            <h3 className="font-dancing text-red-700 text-lg font-semibold lg:text-xl">Exploring the Peaks, Connecting with Nature</h3>
        </div>
        <div className="flex flex-col justify-center items-center lg:jus lg:flex-row max-w-full h-fit overflow-hidden gap-5 lg:gap-16">
        <p className="font-roboto text-justify text-gray-700 lg:max-w-[40%] text-wrap text-lg lg:text-2xl" >Our mission is to inspire and guide adventurers to explore the breathtaking landscapes of Nepal. We are committed to providing exceptional trekking experiences that foster a deep connection with nature and a profound respect for the environment.</p>
            <img src="Mission.jpg" className="object-cover object-center h-[200px] w-[300px] md:h-[300px] md:w-[500px] lg:h-[400px] lg:w-[600px] rounded-lg" alt="two people discussing"></img>
        </div>
        </div>
        </div>
        </section>
    )
}
export default Mission;