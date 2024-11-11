/* TODO

1. Update accessory data to include a type field so we can have a counter for tables and chairs but radio button for -
- generator
2. Make accessories go into area with slides
3. Add remove from cart button for accessories
4. Add in tent
5. Get data with accessories shooting to air table

*/

import React from 'react';

const AccessoriesGrid = ({ accessoryData }) => {
  return (
    <div className="accessories-grid">
      {accessoryData.accessories.map((item, index) => {
        let inputElement;

        switch (item.type) {
          case 'radio':
            inputElement = (
              <label className='acc-selector'>
                <input
                name="selectedAccessory"
                type="radio"
                value={item.title}
                />
                Add {item.title}
              </label>
            );
            break;

          case 'dropdown':
            inputElement = (
                <div
                style={{
                    paddingTop: '10px'
                }}
                >
                    <select
                    className="arrow-only-dropdown"
                    name="quantity"
                    >
                        <option value="" disabled hidden>
                        Select Quantity
                        </option>
                        {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
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
              <p className="accessories-price">{item.price}</p>
              <div className="accessory-option">
                {inputElement}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccessoriesGrid;
