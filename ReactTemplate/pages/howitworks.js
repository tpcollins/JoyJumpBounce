import Layout from "../src/layouts/Layout";
import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import { useEffect } from "react";
import { activeNavMenu } from "../src/utils";
import { footerData } from "../src/Data/data";

const HowItWorks = () => {

  useEffect(() => {
    activeNavMenu();
  }, []);

  useEffect(() => {
    document.body.classList.add('homepage-body');
    
    return () => {
      document.body.classList.remove('homepage-body');
    };
  }, []);

    // Safari Detection
    useEffect(() => {
      const isSafari = () => {
        const userAgent = navigator.userAgent;
        const vendor = navigator.vendor;
  
        return (
          /Safari/.test(userAgent) && // Detects Safari
          /Apple Computer/.test(vendor) && // Ensures vendor is Apple
          !/Chrome/.test(userAgent) && // Excludes Chrome and Chromium-based browsers
          !/Edg/.test(userAgent) && // Excludes Edge
          !/OPR/.test(userAgent) && // Excludes Opera
          !/CriOS/.test(userAgent) // Excludes Chrome on iOS
        );
      };
  
      if (isSafari()) {
        document.body.classList.add('safari-browser');
        console.log('Safari detected');
      } else {
        console.log('Not Safari');
      }
    }, []);
  
    // Chrome Detection
    useEffect(() => {
      const isChrome = () => {
        const userAgent = navigator.userAgent;
        const vendor = navigator.vendor;
  
        return (
          /Chrome/.test(userAgent) &&
          /Google Inc/.test(vendor) &&
          !/OPR/.test(userAgent) && // Excludes Opera
          !/Edg/.test(userAgent) // Excludes Edge
        );
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

  return(
    <Layout noFooter noHeader bodyClass={"main"}>

        <Header1 />

        <div className="container">
            <div className="about-container">
                <section className="about-section">
                    <section className="about-section-inner hiw">
                        <h1>How It Works
                            <img 
                                src="assets/images/logo/JJLogoAbUs.png"
                                alt="textImg"
                            />
                        </h1>
                        
                        <p>
                          At JoyJump, we make renting a bounce house easy and stress-free. Whether you're hosting a birthday party, a school event, 
                          or a corporate gathering, we have a variety of bounce houses, slides, and obstacle courses to make your occasion memorable. 
                        </p>

                        <br/>

                        <p>
                          You can either book online or contact us for assistance with availability and 
                          recommendations. Our staff will deliver and set up your bounce house at the agreed-upon location, 
                          ensuring it’s securely installed and ready for fun.  
                        </p>

                        <br/>

                        <p>
                          We handle everything from setup to takedown, provide safety instructions, and
                          we’ll return to pick up the bounce house, leaving your venue clean and free of any hassle.  
                        </p>

                        <p>
                          With our reliable service and top-quality inflatables, we guarantee a stress-free and exciting experience every time!
                        </p>

                        <br/>

                        <button
                        className="text-center w-max rounded-full border-2 border-orange-600 bg-stone-900 px-4 py-2 text-sm font-large text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800"
                        >
                            <a
                            href="/inventory"
                            style={{color: "white"}}
                            target="_blank"
                            id="hiw-btn"
                            >
                              View Our Inventory Now!
                            </a>
                        </button>

                    </section>
                </section>
            </div>
        </div>

        <Footer footerData={footerData}/>

    </Layout>
  );
};

export default HowItWorks;