// import React from 'react';

// const StockGrid = ({
//     additionalData,
//     handleAddToCart,
//     stockData
// }) => {
//     return (
//         <>
//             <hr className="separator-line" />

//             <div className="stock-grid-container">
//                 {stockData.data.map((item, index) => (
//                     <div key={index}>
//                         {/* Individual box for each stock item */}
//                         <div className="stock-item-box">
//                             {/* Image on the left */}
//                             <img src={item.imgSrc} alt={item.title} className="stock-image" />

//                             {/* Title and Price on the right */}
//                             <div className="stock-info">
//                                 <h3 className="stock-title">{item.title}</h3>
//                                 <p className="stock-price">{item.showPrice}</p>
//                                 <p>{new Date(additionalData.date).toLocaleDateString()}</p>
//                                 <p>
//                                     <a href={'/inventory#' + item.pgSection}>View on Inventory Page</a>
//                                 </p>

//                                 <div>
//                                     <a 
//                                     className="fl-btn st-12 stkgrd"
//                                     onClick={() => handleAddToCart({ ...item, ...additionalData }, index)}
//                                     >
//                                         <span
//                                             id={`add-to-cart-${index}`}
//                                             className="inner add-to-cart-button"
//                                             // onClick={() => handleAddToCart(index)}
//                                         >
//                                             Add to Cart
//                                         </span>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
            
//                         {index < stockData.length - 1 && <hr className="separator-line" />}
                    
//                     </div>
//                 ))}

//             <hr className="separator-line" />

//             </div>
//         </>
//       );
// };

// export default StockGrid;


import React, { useState } from 'react';

const StockGrid = ({ additionalData, handleAddToCart, stockData }) => {
    // State to store selected prices for items with radio options
    const [selectedPrice, setSelectedPrice] = useState({});

    // Handle radio button change
    const handlePriceChange = (itemId, price) => {
        setSelectedPrice((prev) => ({
            ...prev,
            [itemId]: price,
        }));
    };

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

                                {/* Handle radio options if the item type is 'radio' */}
                                {item.type === 'radio' ? (
                                    <div className="price-options">
                                        <p>Select an option:</p>
                                        {item.priceOptions.map((option) => (
                                            <label 
                                            key={option.label} 
                                            className="price-option"
                                            // style={{
                                            //     paddingRight: '35px',
                                            //     fontSize: '3em'
                                            // }}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`price-option-${item.id}`}
                                                    value={option.price}
                                                    onChange={() => handlePriceChange(item.id, option.price)}
                                                />
                                                {option.label} - ${option.price}
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="stock-price">{item.showPrice}</p>
                                )}

                                <p>{new Date(additionalData.date).toLocaleDateString()}</p>
                                <p>
                                    <a href={'/inventory#' + item.pgSection}>View on Inventory Page</a>
                                </p>

                                <div>
                                    <a
                                        className={`fl-btn st-12 stkgrd ${
                                            item.type === 'radio' && !selectedPrice[item.id] ? 'disabled' : ''
                                        }`}
                                        onClick={() =>
                                            handleAddToCart(
                                                {
                                                    ...item,
                                                    price:
                                                        item.type === 'radio'
                                                            ? selectedPrice[item.id] || item.priceOptions[0].price
                                                            : item.price,
                                                    ...additionalData,
                                                },
                                                index
                                            )
                                        }
                                    >
                                        <span
                                            id={`add-to-cart-${index}`}
                                            className="inner add-to-cart-button"
                                        >
                                            Add to Cart
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {index < stockData.data.length - 1 && <hr className="separator-line" />}
                    </div>
                ))}

                <hr className="separator-line" />
            </div>
        </>
    );
};

export default StockGrid;