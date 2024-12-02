/*

TODO:
1. Fix image sizes
2. Start styling for each individual float

*/

import { LeftArrow, RightArrow } from "../Icons";
import { inventoryData } from "../Data/data";
import { useEffect } from "react";

const InventoryComp = () => {

    useEffect(() => {
        document.body.classList.add('inventory-body');
        
        return () => {
          document.body.classList.remove('inventory-body');
        };
      }, []);

    return (
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
                    <h5>Have questions before booking? Click here to get in contact!</h5>
                </div>
                <div className="gallery-container">
                    {inventoryData.inventoryItems.map((item, index) => (
                        <div key={index} className="gallery-item">
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
                                    />
                                </h5>

                                <div className="box-btn">
                                    <a 
                                    className="fl-btn st-12 inv"
                                    href="#"
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
    );
};

export default InventoryComp;
