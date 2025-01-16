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
  // useEffect(() => {
  //   const isSafari = () => {
  //     const userAgent = navigator.userAgent;
  //     const vendor = navigator.vendor;

  //     return (
  //       /Safari/.test(userAgent) && // Detects Safari
  //       /Apple Computer/.test(vendor) && // Ensures vendor is Apple
  //       !/Chrome/.test(userAgent) && // Excludes Chrome and Chromium-based browsers
  //       !/Edg/.test(userAgent) && // Excludes Edge
  //       !/OPR/.test(userAgent) && // Excludes Opera
  //       !/CriOS/.test(userAgent) // Excludes Chrome on iOS
  //     );
  //   };

  //   if (isSafari()) {
  //     document.body.classList.add('safari-browser');
  //     console.log('Safari detected');
  //   } else {
  //     console.log('Not Safari');
  //   }
  // }, []);

  const isSafari = () => {
    const userAgent = navigator.userAgent;
    const vendor = navigator.vendor;
  
    return (
      /Safari/.test(userAgent) &&
      /Apple Computer/.test(vendor) &&
      !/CriOS/.test(userAgent) && // Excludes Chrome on iOS
      !/Chrome/.test(userAgent) && // Excludes Chrome
      !/Edg/.test(userAgent) && // Excludes Edge
      !/OPR/.test(userAgent) // Excludes Opera
    );
  };
  
  useEffect(() => {
    if (isSafari()) {
      document.body.classList.add("safari-browser");
      console.log("Safari detected");
    } else {
      console.log("Not Safari");
    }
  }, []);
  

  // Chrome Detection
  // useEffect(() => {
  //   const isChrome = () => {
  //     const userAgent = navigator.userAgent;
  //     const vendor = navigator.vendor;

  //     return (
  //       /Chrome/.test(userAgent) &&
  //       /Google Inc/.test(vendor) &&
  //       !/OPR/.test(userAgent) && // Excludes Opera
  //       !/Edg/.test(userAgent) // Excludes Edge
  //     );
  //   };

  //   if (isChrome()) {
  //     document.body.classList.add('chrome-browser');
  //     console.log('Chrome detected');
  //   } else {
  //     console.log('Not Chrome');
  //   }
  // }, []);

  const isChrome = () => {
    const userAgent = navigator.userAgent;
    const vendor = navigator.vendor;
  
    return (
      /Google Inc/.test(vendor) && // Vendor is Google Inc.
      !/Edg/.test(userAgent) && // Exclude Edge
      !/OPR/.test(userAgent) && // Exclude Opera
      !/SamsungBrowser/.test(userAgent) // Exclude Samsung Internet
    );
  };
  
  useEffect(() => {
    if (isChrome()) {
      document.body.classList.add("chrome-browser");
      console.log("Chrome detected");
    } else {
      console.log("Not Chrome");
      console.log("User Agent:", navigator.userAgent);
      console.log("Vendor:", navigator.vendor);
    }
  }, []);

  const isChromeOnIOS = () => /CriOS/.test(navigator.userAgent);

  useEffect(() => {
    if (isChrome() || isChromeOnIOS()) {
      document.body.classList.add("chrome-browser");
      console.log("Chrome detected");
    } else {
      console.log("Not Chrome");
      console.log("User Agent:", navigator.userAgent);
      console.log("Vendor:", navigator.vendor);
    }
  }, []);
  
  
  

  // Firefox Detection
  useEffect(() => {
    const isFirefox = () => {
      return /Firefox\/\d+\.\d+/i.test(navigator.userAgent); // Detects Firefox
    };

    if (isFirefox()) {
      document.body.classList.add('firefox-browser');
      console.log('Firefox detected');
    } else {
      console.log('Not Firefox');
    }
  }, []);

  // Edge Detection
  useEffect(() => {
    const isEdge = () => {
      const userAgent = navigator.userAgent;

      return (
        /Edg/.test(userAgent) // Detects Edge
      );
    };

    if (isEdge()) {
      document.body.classList.add('edge-browser');
      console.log('Edge detected');
    } else {
      console.log('Not Edge');
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