import React from 'react';

const StockGrid = ({ 
    stockData,
    handleAddToCart
}) => {

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
                                <p>
                                    <a href={'/inventory#' + item.pgSection}>View on Inventory Page</a>
                                </p>

                                <div>
                                    <a 
                                    className="fl-btn st-12 stkgrd"
                                    onClick={() => handleAddToCart(index)}
                                    >
                                        <span
                                            id={`add-to-cart-${index}`} // Unique ID for each button
                                            className="inner add-to-cart-button"
                                            onClick={() => handleAddToCart(index)}
                                        >
                                            Add to Cart
                                        </span>
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
