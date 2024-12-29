import { LeftArrow, RightArrow } from "../src/Icons";
import { inventoryData, footerData } from "../src/Data/data";
import Header1 from "../src/layouts/header/Header1";
import { useEffect } from "react";
import Footer from "../src/layouts/Footer";
import Layout from "../src/layouts/Layout";

const Floats = () => {

    useEffect(() => {
        document.body.classList.add('abus-body');
        
        return () => {
          document.body.classList.remove('abus-body');
        };
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
        <>
            <Layout noFooter noHeader bodyClass={"main"}>

            `    <Header1 />

                <section className="tf-section tf-gallery">
                    <div>
                        <div className="title-heading st-4">
                            <div className="sub-heading clr-pri-3 f-mulish">
                                <LeftArrow />
                                <span className="inner-sub st-1">Inventory</span>
                                <RightArrow />
                            </div>
                            <h2 className="title clr-pri-2">
                                Explore Our Inventory & Book Below!
                            </h2>
                            <h5>Have questions before booking? 
                                <a 
                                className="clr-pri-2"
                                href="/contactus"
                                target="_blank"
                                > <u> Click here to get in contact!</u></a>
                            </h5>
                        </div>
                        <div className="gallery-container">
                            {inventoryData.inventoryItems.map((item, index) => (
                                <div key={index} className="gallery-item" id={item.pgSection}>
                                    <div className="description">

                                        <h5
                                        style={{
                                            fontFamily: item.font,
                                            fontSize: '65px'
                                        }}
                                        >
                                            <img 
                                            src={item.textImg}
                                            alt="textImg"

                                            // style={{
                                            //     paddingBottom: '25px'
                                            // }}
                                            />
                                        </h5>

                                        <div className="box-btn">
                                            <a 
                                            className="fl-btn st-12 inv"
                                            href="/booking"
                                            >
                                                <span className="inner">Book Now!</span>
                                            </a>
                                        </div>

                                    </div>
                                    <div className="image">
                                        <img src={item.src} alt="Image"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer footerData={footerData}/>
            </Layout>
        </>
    );
};

export default Floats;
