import { useEffect } from "react";
import Footer2 from "../src/layouts/Footer2";
import Header1 from "../src/layouts/header/Header1";
import Layout from "../src/layouts/Layout";
import { activeNavMenu } from "../src/utils";
import Slider from "../src/components/slider";
import { footerData, invSwiperData } from "../src/Data/data";

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
  // useEffect(() => {
  //   const isChrome =
  //       /Chrome/.test(navigator.userAgent) &&
  //       /Google Inc/.test(navigator.vendor) &&
  //       !/OPR/.test(navigator.userAgent) &&
  //       !/Edg/.test(navigator.userAgent);

  //   if (isChrome) {
  //       document.body.classList.add('chrome-browser');
  //       console.log('Chrome detected');
  //   }
  // }, []);

  // useEffect(() => {
  //   const isChrome = () => {
  //     const userAgent = navigator.userAgent;
  //     const vendor = navigator.vendor;
  
  //     // Check for Chromium-based features
  //     const isChromium = !!window.chrome;
  //     const isGoogleVendor = vendor === 'Google Inc';
  //     const isNotOpera = !/OPR/.test(userAgent);
  //     const isNotEdge = !/Edg/.test(userAgent);
  
  //     // Add logging for debugging
  //     console.log("User Agent:", userAgent);
  //     console.log("Vendor:", vendor);
  //     console.log("Is Chromium:", isChromium);
  
  //     return isChromium && isGoogleVendor && isNotOpera && isNotEdge;
  //   };
  
  //   if (isChrome()) {
  //     document.body.classList.add('chrome-browser');
  //     console.log('Chrome detected');
  //   } else {
  //     console.log('Not Chrome');
  //   }
  // }, []);
  
  useEffect(() => {
    const isChrome = () => {
      const userAgent = navigator.userAgent;
      const vendor = navigator.vendor;
  
      // Chrome detection logic
      const isChromium = !!window.chrome; // Detects Chromium-based browsers
      const isGoogleVendor = vendor === 'Google Inc'; // Ensures vendor is Google
      const isNotOpera = !/OPR\//.test(userAgent); // Excludes Opera (which has "OPR" in its UA)
      const isNotEdge = !/Edg\//.test(userAgent); // Excludes Edge (which has "Edg" in its UA)
  
      // Chrome is detected if all of the above conditions are true
      return isChromium && isGoogleVendor && isNotOpera && isNotEdge;
    };
  
    if (isChrome()) {
      document.body.classList.add('chrome-browser');
      console.log('Chrome detected');
    } else {
      console.log('Not Chrome');
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
      
      <Slider data={invSwiperData}/>
      
      <Footer2 footerData={footerData}/>

    </Layout>
  );
};
export default Index;