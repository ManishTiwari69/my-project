
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,Autoplay } from 'swiper/modules';
import { delay } from 'motion/react';

const Testimonials=()=> {
    const testimonialsDetails=[
        {
            id:1,
            des:'"A Life-Changing Experience!""The trek was beyond my wildest dreams! The guides were knowledgeable and made the journey unforgettable. The stunning landscapes and the sense of accomplishment were worth every step. Highly recommended!"',
            name:"David Johnson",
            stars:"★ ★ ★ ★ ★",
            url:"p1.png",
            title:"Nature Enthusiast"
        },
        {
            id:2,
            des:'"Incredible Journey!" "From start to finish, this trek was a truly phenomenal experience. The trails were challenging but extremely rewarding, and the scenery was absolutely breathtaking. Our guides were fantastic, ensuring we were always safe and well-informed every step of the way."',
            name:"Sarah Martinez",
            stars:"★ ★ ★ ★ ★",
            url:"p2.png",
            title:"Adventure Seeker"
        },
        {
            id:3,
            des:'"Best Adventure Ever!" "This trek exceeded all my wildest expectations. The views were absolutely spectacular, and the team was incredibly supportive and attentive. I highly recommend this trek to anyone looking for an extraordinary adventure."',
            name:"Emily Brown",
            stars:"★ ★ ★ ★ ★",
            url:"p3.png",
            title:"Travel Blogger"
        },
        {
            id:4,
            des:'"A Memorable Experience!" "The trek was an unforgettable journey through some of the most beautiful and awe-inspiring landscapes I have ever seen. The guides were friendly and professional, always making sure we were comfortable, informed, and safe."',
            name:"Michael Lee",
            stars:"★★★★☆",
            url:"p4.png",
            title:"Outdoor Enthusiast"
        },
        {
            id:5,
            des:'"Breathtaking Views and Great Company!" "The trekking experience was absolutely amazing! The guides were exceptionally friendly and knowledgeable, and the views were simply breathtaking. This is an experience I will truly cherish forever."',
            name:"Laura Wilson",
            stars:"★★★⯪☆",
            url:"p5.png",
            title:"Avid Hiker"
        },
        {
            id:6,
            des:'"Amazing Experience!" "This trek was the adventure of a lifetime. This incredible adventure has given me memories that will last a lifetime. Stunning views, great company, and expert guides made it truly unforgettable. Very supportive and caring team."',
            name:"Alex Kim",
            stars:"★★★★☆",
            url:"p6.png",
            title:"Journalist"
            

        }
    ]; 
  return (
    <>
    <section>
        <div className="mx-auto py-8 mt-10">
            <div className="bg-gradient-to-b from-blue-800 to-purple-500 bg-clip-text">
            <h1 className="text-center text-md lg:text-2xl text-transparent font-mons ">Testimonials</h1>
            <h1 className="text-center text-2xl font-extrabold md:text-5xl text-transparent mb-7 font-dancing">What our Client Says</h1>
            </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={60}
        autoplay={{ delay:3000,
            disableOnInteraction: false, pauseOnMouseEnter: true,

         }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination,Autoplay]}
        breakpoints={{ 
            100: { slidesPerView: 1, },
            768: { slidesPerView: 2, },
            1024: { slidesPerView: 3, },
        }}
       className='rounded-lg  min-h-fit' 
      >
        {
       
       testimonialsDetails.map((items,index)=>{
        return(
            <SwiperSlide key={index} className="p-4">
            <div className="h-full w-full p-10 tracking-wider bg-gray-100 relative rounded-lg shadow-2xl mb-10">
                <div className="mb-5">
                    <p className="text-2xl text-yellow-500">{items.stars}</p>
                <p className="text-xl text-gray-700"><i>{items.des}</i></p>
                </div>
                <div className="flex justify-center">
                    <img src={items.url} className="rounded-full h-12 w-12" alt={items.title}></img>
                    <div className="ml-2">
                    <p className="font-roboto font-bold text-lg">{items.name}</p>
                    <p className="text-sm text-slate-500 -mt-2">{items.title}</p>
                    </div>
                    <div className="absolute top-4 left-2 text-4xl text-purple-500">
                    <i className='bx bxs-quote-alt-left'></i>
                    </div>
                    <div className="absolute bottom-24 text-purple-500 right-4 text-4xl">
                    <i className='bx bxs-quote-alt-right'></i>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        )
       })
        
}
      </Swiper>
      </div>
      </section>
    </>
  );
}
export default Testimonials;



