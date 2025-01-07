import React from 'react';
import { LeftArrow, RightArrow } from "../src/Icons";
import { useEffect } from 'react';

const InvLandingPage = () => {

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

  // Safari Detection
  useEffect(() => {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        document.body.classList.add('safari-browser');
        console.log('Safari detected');
    } else {
        console.log('Not Safari');
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
