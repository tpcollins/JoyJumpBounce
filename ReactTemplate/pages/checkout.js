import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import { useEffect } from "react";
import Layout from "../src/layouts/Layout";
import { activeNavMenu } from "../src/utils";
import CheckoutPage from "../src/R Components/checkoutpage";
import { checkoutData, footerData } from "../src/Data/data";

const ContactUs = () => {
  useEffect(() => {
    activeNavMenu();
  }, []);

  // Safari Detection
  useEffect(() => {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        document.body.classList.add('safari-browser');
        console.log('Safari detected');
    } else {
        console.log('Not Safari');
    }
  }, []);

  // Chrome Detection
  useEffect(() => {
    const isChrome =
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor) &&
        !/OPR/.test(navigator.userAgent) &&
        !/Edg/.test(navigator.userAgent);

    if (isChrome) {
        document.body.classList.add('chrome-browser');
        console.log('Chrome detected');
    }
  }, []);
  
  
  // Firefox Detection
  useEffect(() => {
    const isFirefox = /Firefox\/\d+\.\d+/i.test(navigator.userAgent);

    if (isFirefox) {
      document.body.classList.add('firefox-browser');
      console.log('Firefox detected');
    } else {
      console.log('Not Firefox');
    }
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
        
        <Footer footerData={footerData}/>
      </Layout>
    </>
  );
};

export default ContactUs;