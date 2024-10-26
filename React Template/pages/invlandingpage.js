import React from 'react';
import { LeftArrow, RightArrow } from "../src/Icons";

const InvLandingPage = () => {
  return (
    <div className='container'>
        <div 
        className="title-heading st-4"
        style={{paddingTop: '250px'}}
        >
            <div className="sub-heading clr-pri-3 f-mulish">
                <LeftArrow />
                <span className="inner-sub st-1">Inventory</span>
                <RightArrow />
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
                <a href="/InventoryComp">
                <img
                    src="assets/images/inflatables/ComboWetSlideNoShadow.png"
                    alt="Bouncy Castles"
                    className="landing-image"
                />
                <div className="overlay-text">Bouncy Castles</div> {/* Overlay text */}
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

    </div>
  );
};

export default InvLandingPage;
