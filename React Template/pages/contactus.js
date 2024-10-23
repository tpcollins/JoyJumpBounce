import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import Contact from "./contact";
import { useEffect } from "react";

const ContactUs = () => {

  useEffect(() => {
    document.body.classList.add('abus-body');
    
    return () => {
      document.body.classList.remove('abus-body');
    };
  }, []);

  return(
    <>

      <Header1 />
      
      <Contact />
      
      <Footer />

    </>
  );
};

export default ContactUs;