import React, { useState, useEffect } from 'react';
// Redux Variables
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/slices/cartslice';

const AccessoriesGrid = ({ 
  accessoryData,
  date
}) => {
  const dispatch = useDispatch();

  const [availability, setAvailability] = useState({
    tables: 10,
    chairs: 40,
    tent: true,
    generator: true,
  });
  
  // Local state for selected quantities
  const [selectedQuantities, setSelectedQuantities] = useState({});

  // Function to handle quantity selection
  const handleQuantityChange = (item, quantity) => {
    const totalPrice = quantity * item.price;
    const itemWithQuantity = { ...item, quantity, totalPrice, date };
    
    console.log("Date: ", date);
    
    setSelectedQuantities(prev => ({
      ...prev,
      [item.title]: quantity
    }));

    // Dispatch the item with quantity and total price to Redux
    dispatch(addItemToCart(itemWithQuantity));
  };

  const handleAddDate = (item, quantity) => {
    const itemWithDate = { ...item, date };

    dispatch(addItemToCart(itemWithDate));
  }

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch('/api/getBookedAcc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date }),
        });

        if (!response.ok) throw new Error('Failed to fetch availability');

        const data = await response.json();
        setAvailability(data.available);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, [date]);

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

        if (item.title === 'Inflatable Tent' && !availability.tent) {
          inputElement = <p className="out-of-stock">Out of Stock</p>;
        } else if (item.title === 'Generator' && !availability.generator) {
          inputElement = <p className="out-of-stock">Out of Stock</p>;
        } else if (item.title === 'Table' || item.title === 'Chair') {
          const availableQuantity = item.title === 'Table' ? availability.tables : availability.chairs;

          inputElement = availableQuantity > 0 ? (
            <select
              className="arrow-only-dropdown"
              name="quantity"
              value={selectedQuantities[item.title] || ""}
              onChange={(e) => handleQuantityChange(item, Number(e.target.value))}
            >
              <option value="" disabled hidden>Select Quantity</option>
              {Array.from({ length: availableQuantity }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          ) : (
            <p className="out-of-stock">Out of Stock</p>
          );
        } else {
          inputElement = (
            <label className='acc-selector'>
                <a 
                className="fl-btn st-12 stkgrd"
                >
                  <span
                      id={`add-to-cart-${index}`}
                      className="inner add-to-cart-button"
                      onClick={() => dispatch(addItemToCart({ ...item, date }))}
                      // onClick={handleAddDate(item)}
                  >
                      Add to Cart
                  </span>
                </a>
              </label>
          );
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
