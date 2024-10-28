import React from 'react';
import { LeftArrow, RightArrow } from "../src/Icons";
import { accessoryData } from '../src/Data/data';
import Footer from '../src/layouts/Footer';
import { useEffect } from 'react';
import Header1 from "../src/layouts/header/Header1"; 

const Accessories = () => {
    useEffect(() => {
        document.body.classList.add('abus-body');
        
        return () => {
            document.body.classList.remove('abus-body');
        };
    }, []);

    return (
    <>
    
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

                <hr className="separator-line" />

                <div className="accessories-grid">
                    {accessoryData.accessories.map((item, index) => (
                    <div key={index} className="accessories-item">
                        <img src={item.imgSrc} alt={item.title} className="accessories-image" />
                        <div className="accessories-info">
                        <h2 className="accessories-title">{item.title}</h2>
                        <p className="accessories-price">{item.price}</p>
                        </div>

                        {index < accessoryData.length - 1 && <hr className="separator-line" />}
                    </div>

                    
                    ))}
                </div>
                
                <hr className="separator-line" />

            </div>
        </div>

        <Footer />
    </>
    );
};

export default Accessories;
