import { useEffect } from "react";
import Footer2 from "../src/layouts/Footer2";
import Header1 from "../src/layouts/header/Header1";
import Layout from "../src/layouts/Layout";
import { activeNavMenu } from "../src/utils";
import CheckoutSlider from "../src/components/slider-checkout";
import { footerData, checkoutSwiperData } from "../src/Data/data";
import Footer from "../src/layouts/Footer";

const Index = () => {
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
        !/OPR|Opera/.test(navigator.userAgent);

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

  return (  
    <Layout noFooter noHeader bodyClass={"main"}>
      
      <Header1 />
      
      <CheckoutSlider data={checkoutSwiperData}/>
      
      <Footer footerData={footerData}/>

    </Layout>
  );
};
export default Index;