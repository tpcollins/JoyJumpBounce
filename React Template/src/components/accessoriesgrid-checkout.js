/* TODO

1. Update accessory data to include a type field so we can have a counter for tables and chairs but radio button for -
- generator
2. Make accessories go into area with slides
3. Add remove from cart button for accessories
4. Add in tent
5. Get data with accessories shooting to air table

*/

const AccessoriesGrid = ({accessoryData}) => {

    return(
        <div className="checkout-accessories-grid">
        {accessoryData.accessories.map((item, index) => (
            <div key={index} className="checkout-accessories-item">
            <img src={item.imgSrc} alt={item.title} className="checkout-accessories-image" />
            <div className="checkout-accessories-info">
                <h2 className="checkout-accessories-title">{item.title}</h2>
                <p className="checkout-accessories-price">{item.price}</p>
                <div className="checkout-accessory-option">
                <label>
                    <input
                    type="radio"
                    name="selectedAccessory"
                    value={item.title}
                    onChange={() => handleAccessorySelect(item)}
                    />
                    Add {item.title}
                </label>
                </div>
            </div>
            </div>
        ))}
        </div>
    );
}

export default AccessoriesGrid;