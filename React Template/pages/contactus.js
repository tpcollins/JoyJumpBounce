import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import Contact from "./contact";
import { useEffect } from "react";
import Layout from "../src/layouts/Layout";

const ContactUs = () => {

  useEffect(() => {
    document.body.classList.add('abus-body');
    
    return () => {
      document.body.classList.remove('abus-body');
    };
  }, []);

  return(
    <>
      <Layout noFooter noHeader bodyClass={"main"}>
        <Header1 />
        
        <Contact />
        
        <Footer />
      </Layout>
    </>
  );
};

export default ContactUs;