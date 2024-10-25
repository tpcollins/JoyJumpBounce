import React from 'react';

const StockGrid = ({ stockData }) => {

    return (
        <>
            <hr className="separator-line" />

            <div className="stock-grid-container">
                {stockData.data.map((item, index) => (
                    <div key={index}>
                        {/* Individual box for each stock item */}
                        <div className="stock-item-box">
                            {/* Image on the left */}
                            <img src={item.imgSrc} alt={item.title} className="stock-image" />

                            {/* Title and Price on the right */}
                            <div className="stock-info">
                                <h3 className="stock-title">{item.title}</h3>
                                <p className="stock-price">{item.price}</p>

                                <div>
                                    <a 
                                    className="fl-btn st-12 inv"
                                    href="#"
                                    >
                                        <span className="inner">Add to Cart</span>
                                    </a>
                                </div>
                            </div>
                        </div>
            
                        {index < stockData.length - 1 && <hr className="separator-line" />}
                    
                    </div>
                ))}

            <hr className="separator-line" />

            </div>
        </>
      );
};

export default StockGrid;
