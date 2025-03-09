const Footer=()=>{
    return(
       <footer className="bg-teal-800 text-white  relative w-full">
        <div className="flex  flex-col lg:flex-row justify-between px-10 py-10 gap-10 mb-5">
        <div  className="w-full lg:w-[25%]">
            <p className="relative left-4 text-xl text-yellow-400 font-mons font-semibold">Our Office:</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.960203934088!2d85.30833267530113!3d27.718514976176102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18e2e18378a9%3A0xd4ab1b15086c7f45!2sSaraswati%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1735038965843!5m2!1sen!2snp"  loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google-Map" className="w-[300] h-[250]"></iframe>
            <p className="text-xl text-yellow-400 font-mons font-semibold">Nepa Adventure</p>
            <p>1234 Elm Street, Springfield,Nepal</p>
            <p>info@example.com</p>
            <p>+977 9812131415</p>
        </div>
        <div className="flex flex-row justify-between gap-5">
        <div>
            <h1 className="text-xl text-yellow-400 font-mons font-semibold">Company</h1>
            <ul>
                <li><a href=""><span><i className='bx bx-chevron-right'></i></span>About Us</a></li>
                <li><a href=""><span><i className='bx bx-chevron-right'></i></span>Contact</a></li>
                <li><a href=""><span><i className='bx bx-chevron-right'></i></span>Gallery</a></li>
                <li><a href=""><span><i className='bx bx-chevron-right'></i></span>Privacy Policy</a></li>
                <li><a href=""><span><i className='bx bx-chevron-right'></i></span>Security</a></li>
                <li><a href=""><span><i className='bx bx-chevron-right'></i></span>Terms & conditions</a></li>
                <li><a href=""><span><i className='bx bx-chevron-right'></i></span>Privacy Policy</a></li>
            </ul>
        </div>
        <div>
            <h1 className="text-xl text-yellow-400 font-mons font-semibold">Country</h1>
            <ul>
            <li><a href=""><span><i className='bx bx-chevron-right'></i></span>Nepal</a></li>
            <li><a href=""><span><i className='bx bx-chevron-right'></i></span>India</a></li>
            <li><a href=""><span><i className='bx bx-chevron-right'></i></span>Bangladesh</a></li>
            <li><a href=""><span><i className='bx bx-chevron-right'></i></span>Bhutan</a></li>
            </ul>
        </div>
        </div>
            <div>
                <div>
                <h1 className="text-xl text-yellow-400 font-mons font-semibold">Follow Us</h1>
            <div className="text-xl space-x-3 ">
            <i className='bx bxl-facebook' ></i><i className='bx bxl-instagram' ></i><i className='bx bxl-whatsapp'></i><i className='bx bxl-linkedin' ></i><i className='bx bxl-google-plus' ></i>
            </div>
                </div>
                <div className="w-[360px]">
                <h1 className="text-xl text-yellow-400 font-mons font-semibold">Newsletter</h1>
                <p>Join our mailing list to receive the latest news, updates, and special offers delivered directly to your inbox.</p>
                <label htmlFor="email"><input type="email" placeholder="abc@gmail.com" className="py-2 px-4 text-lg rounded-lg text-black border border-gray-500 focus:outline-none focus:border-2 focus:border-orange-500" required></input></label>
                <button className="ml-2 bg-orange-700 px-4 py-2 rounded-lg hover:bg-orange-800" aria-label="Submit">Submit</button>
                </div>
            </div>
        </div>
        <div className="w-full p-3 bg-blue-800 text-center">
            <p>©2025 All rights reserved.</p>
        </div>
       </footer>
    )
}
export default Footer;