
import { useState } from "react";
const Contact=()=>{
  const [result, setResult] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "d27f4ecf-beca-448d-af59-35bc7be0d9f7");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
 return(
    <section id="contact-section">
    <div className=" bg-gradient-to-l from-teal-800 to-purple-500 w-full px-5 mt-10 py-5 ">
      <h1 className="text-white text-5xl mb-10 px-4 font-rale text-center lg:relative lg:left-14 top-5 font-bold">Get in Touch</h1>
      <div className="flex flex-col gap-5 justify-center  items-center lg:flex-row lg:justify-around">
      <div>
        <img src="customer-service.png" className="object-cover h-[150px] sm:h-[200px] md:h-[240px] lg:h-[300px]" alt="customer-service"></img>
      </div>
      <form className="w-full lg:w-1/2  p-5 flex flex-col gap-5 border-2 rounded-lg shadow-2xl bg-white/50" onSubmit={onSubmit} >
        <div className="grid grid-cols-2 gap-5">
        <input type="text" className="border-2 border-gray-500 px-2 py-1 text-md lg:px-4 lg:py-2 lg:text-xl rounded-md focus:outline-none focus:border-4 focus:border-teal-500" placeholder="* First Name" name="First-Name" required>
        </input>
        <input type="text" className="border-2 border-gray-500 px-2 py-1 text-md lg:px-4 lg:py-2 lg:text-xl rounded-md focus:outline-none focus:border-4 focus:border-teal-500" placeholder=" * Second Name" name="Last-Name" required>
        </input>
        </div>
          <input type="email" className="border-2 border-gray-500 px-2 py-1 text-md lg:px-4 lg:py-2 lg:text-xl rounded-md focus:outline-none focus:border-4 focus:border-teal-500" placeholder="*email" name="Email" required></input>
          <input type="number" className="border-2 border-gray-500 px-2 py-1 text-md lg:px-4 lg:py-2 lg:text-xl rounded-md focus:outline-none focus:border-4 focus:border-teal-500" placeholder="Phone number(optional)" name="Phone-number"></input>
          <textarea cols="10" rows="7" placeholder="Write Message..." className=" focus:outline-none focus:border-4 focus:border-teal-500 px-2 py-1 text-md lg:px-4 lg:py-2 lg:text-xl" name="text"></textarea>
          <button className="px-4 py-2 text-white rounded-md bg-green-700 hover:bg-green-900 duration-500 ease-in-out" aria-label="Send">Send</button>
          <div>
            {result}
          </div>
      </form>
      </div>
    </div>
    </section>
 )
}
export default Contact;