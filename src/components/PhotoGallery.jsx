
const PhotoGallery=()=>{
   
    const imgUrl=[
        {
            url:"G1.jpg",
            des:"ABC mountain",
        },
        {
            url:"G2.jpg",
            des:"Buddhist Culture",
        },
        {
            url:"G3.jpg",
            des:"Gosainkunda,Langtang",
        },
        {
            url:"G4.jpg",
            des:"Ama Dablam Mountain",
        },
        {
            url:"G5.jpg",
            des:"Way to Swoyambhunath Temple",
        },
        {  
            url:"G6.jpg",
            des:"Mustang",
        },
        {
            url:"G7.jpg",
            des:"Mardi Himal",
        },
        {
            url:"G9.jpg",
            des:"Chitwan National Park",
        }
    ]
  return (
            <section id="imageGallery" className="bg-[#E8E8E8] border border-gray-300 mt-5 ">
                <p className="text-center text-2xl lg:text-4xl pt-7 text-[#1e3a8a] font-Playfair font-bold" >Photo Gallery</p>
                <p className="text-center text-xl lg:text-3xl text-[#daa520] font-roboto">Cherished Memories Together</p>
            <div className="columns-1 sm:columns-2 lg:columns-4 py-10 gap-2">  
            {   
                imgUrl.map((item,index)=>{
                    return(
                        <div key={index} className=" mb-4 break-inside-avoid relative group">
                        <img src={item.url} className="container w-full max-h-[260px] rounded-lg object-cover cursor-pointer group-hover:blur-sm transition duration-300 ease-in" loading='lazy' alt={item.des}></img>
                        <div className="absolute top-0  w-full h-full bg-black/50 text-white text-2xl opacity-0 group-hover:opacity-100">
                        <div className="flex w-full h-full justify-center items-center">{item.des}</div>
                        </div>
                        </div>
                    )

                })
            }
            </div>
            <div className="text-center mb-10">
                <button className="font-Playfair font-bold text-white bg-blue-600 py-3 px-6 rounded-lg text-md md:text-lg lg:text-xl hover:bg-blue-900 transition-colors duration-300 ease-in-out">View More<i className='bx bx-photo-album px-2'></i></button>
            </div>
            </section>
  )
}
export default PhotoGallery;
