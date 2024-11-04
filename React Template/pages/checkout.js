import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import { useEffect } from "react";
import Layout from "../src/layouts/Layout";
import { activeNavMenu } from "../src/utils";
import CheckoutPage from "../src/R Components/checkoutpage";
import { checkoutData } from "../src/Data/data";

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
        
        <CheckoutPage data={checkoutData}/>
        
        <Footer />
      </Layout>
    </>
  );
};

export default ContactUs;