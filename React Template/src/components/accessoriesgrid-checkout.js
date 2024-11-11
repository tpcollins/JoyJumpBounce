import React, { useState } from 'react';
// Redux Variables
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/slices/cartslice';

const AccessoriesGrid = ({ accessoryData }) => {
  const dispatch = useDispatch();
  
  // Local state for selected quantities
  const [selectedQuantities, setSelectedQuantities] = useState({});

  // Function to handle quantity selection
  const handleQuantityChange = (item, quantity) => {
    const totalPrice = quantity * item.price;
    const itemWithQuantity = { ...item, quantity, totalPrice };
    
    setSelectedQuantities(prev => ({
      ...prev,
      [item.title]: quantity
    }));

    // Dispatch the item with quantity and total price to Redux
    dispatch(addItemToCart(itemWithQuantity));
  };

  return (
    <div className="accessories-grid">

      <hr className="separator-line" />

      <h1
      className='text-center'
      style={{
        fontSize: '2.5em'
      }}
      >Add Accessories?</h1>

      {accessoryData.accessories.map((item, index) => {
        let inputElement;

        switch (item.type) {
          case 'radio':
            inputElement = (
              <label className='acc-selector'>
                <a 
                className="fl-btn st-12 stkgrd"
                >
                  <span
                      id={`add-to-cart-${index}`}
                      className="inner add-to-cart-button"
                      onClick={() => dispatch(addItemToCart(item))}
                  >
                      Add to Cart
                  </span>
                </a>
              </label>
            );
            break;

          case 'dropdown':
            inputElement = (
              <div style={{ paddingTop: '10px' }}>
                <select
                  className="arrow-only-dropdown"
                  name="quantity"
                  value={selectedQuantities[item.title] || ""}
                  onChange={(e) => handleQuantityChange(item, Number(e.target.value))}
                >
                  <option value="" disabled hidden>Select Quantity</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>              
              </div>
            );
            break;

          default:
            inputElement = <p>Unknown accessory type</p>;
        }

        return (

          <div key={index} className="accessories-item">
            <img
              src={item.imgSrc}
              alt={item.title}
              className="accessories-image"
            />
            <div className="accessories-info">
              <h2 className="accessories-title">{item.title}</h2>
              <p className="accessories-price">{item.showPrice}</p>
              <div className="accessory-option">
                {inputElement}
              </div>
            </div>
          </div>
        );
      })}
      <hr className="separator-line" />
    </div>
  );
};

export default AccessoriesGrid;
