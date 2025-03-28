import React from 'react';
import { LeftArrow, RightArrow } from "../src/Icons";
import { accessoryData, footerData } from '../src/Data/data';
import Footer from '../src/layouts/Footer';
import { useEffect } from 'react';
import Header1 from "../src/layouts/header/Header1"; 
import Layout from '../src/layouts/Layout';

const Accessories = () => {
    useEffect(() => {
        document.body.classList.add('abus-body');
        
        return () => {
            document.body.classList.remove('abus-body');
        };
    }, []);

    return (
    <>

        <Layout noFooter noHeader bodyClass={"main"}>
    
            <Header1 />

            <div className='container'>

                <div className="accessories-container">

                    <div 
                    className="title-heading st-4"
                    style={{paddingTop: '250px'}}
                    >
                        <div className="sub-heading clr-pri-3 f-mulish">
                            <LeftArrow />
                            <span className="inner-sub st-1">Accessories</span>
                            <RightArrow />
                        </div>
                        {/* <h2 className="title clr-pri-2">
                            Accessories can be Booked After Selecting Your Desired Float on our Booking Page.
                        </h2> */}
                        <h5
                        className='clr-pri-2'
                        >Accessories can be Booked After Selecting Your Desired Float on our Booking Page.
                        </h5>
                    </div>

                    

                    <div className="accessories-grid">
                        <hr className="separator-line" />
                        {accessoryData.accessories.map((item, index) => (
                        <div key={index} className="accessories-item">
                            <img src={item.imgSrc} alt={item.title} className="accessories-image" />
                            <div className="accessories-info">
                            <h2 className="accessories-title">{item.title}</h2>
                            <p className="accessories-price">{item.showPrice}</p>
                            </div>

                            {index < accessoryData.length - 1 && <hr className="separator-line" />}
                        </div>
                        ))}
                    </div>
                    
                    <hr className="separator-line sp-2-resp" />

                </div>
            </div>

            <Footer footerData={footerData}/>

            </Layout>
        </>
    );
};

export default Accessories;
