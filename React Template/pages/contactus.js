import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import Contact from "./contact";
import { useEffect } from "react";
import Layout from "../src/layouts/Layout";
import { activeNavMenu } from "../src/utils";
import { footerData } from "../src/Data/data";

const ContactUs = () => {
  useEffect(() => {
    activeNavMenu();
  }, []);

  useEffect(() => {
    document.body.classList.add('homepage-body');
    
    return () => {
      document.body.classList.remove('homepage-body');
    };
  }, []);

  return(
    <>
      <Layout noFooter noHeader bodyClass={"main"}>
        <Header1 />
        
        <Contact />
        
        <Footer footerData={footerData}/>
      </Layout>
    </>
  );
};

export default ContactUs;