import Choose from './Choose';
import PackagesDetail from './PackagesDetail';
import Header from './Header'
import Hero  from './Hero';
import Mission from './Mission';
import Testimonials  from './Testimonials';
import PhotoGallery from './PhotoGallery'; 
import Contact  from './Contact';  
import Footer from './Footer'

import 'boxicons/css/boxicons.min.css';
const Home=()=>{
  return (
    <>
    <Header />
    <Hero />
    <Mission />
    <Choose />
    <PackagesDetail/>
    <PhotoGallery />
    <Testimonials />
    <Contact />
    <Footer />
    </>
  )
}
export default Home;