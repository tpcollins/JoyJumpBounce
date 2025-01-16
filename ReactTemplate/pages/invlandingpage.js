import React from 'react';
import { LeftArrow, RightArrow } from "../src/Icons";
import { useEffect } from 'react';

const InvLandingPage = () => {

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

  return (
    <div className='container inv-container-resp'>
        <div 
        className="title-heading st-4 inv"
        style={{paddingTop: '250px'}}
        >
            <div className="sub-heading clr-pri-3 f-mulish inv-resp">
                <LeftArrow className='inv-resp'/>
                <span className="inner-sub st-1 inv">Inventory</span>
                <RightArrow className='inv-resp'/>
            </div>
            <h5>Have questions before booking? 
                <a 
                className="clr-pri-2"
                href="/contactus"
                target="_blank"
                > <u> Click here to get in contact!</u></a>
            </h5>
        </div>

        <div className="landing-container">
            <div className="image-box">
                <a href="/floats">
                <img
                    src="assets/images/inflatables/ComboWetSlideNoShadow.png"
                    alt="Bouncy Castles"
                    className="landing-image"
                />
                <div className="overlay-text">Floats</div> {/* Overlay text */}
                </a>
            </div>
            <div className="image-box">
                <a href="/accessories">
                <img
                    src="assets/images/accessories/generator.png"
                    alt="Accessories"
                    className="landing-image"
                />
                <div className="overlay-text">Accessories</div> {/* Overlay text */}
                </a>
            </div>
        </div>

        {/* <Footer footerData={footerData}/> */}

    </div>
  );
};

export default InvLandingPage;
