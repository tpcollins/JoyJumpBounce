
const CheckoutPage = ({data}) => {
    {data.fields.map((item, idx) => {
        // Define input elements based on the type
        let inputElement;
        switch (item.type) {
            case "time":
                inputElement = <input type="time" className="form-control" />;
                break;
    
            case "radio":
                inputElement = (
                    <div>
                        {item.options.map((option, idx) => (
                            <label 
                            key={idx}
                            style={{paddingRight: "20px"}}>
                                <input
                                    name={item.title}  // Use the `title` as the name to group the radio buttons
                                    type={item.type}   // Dynamic type from `item.type`
                                    value={option.value} // Set the value from each option
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                );
                break;
    
            case "text":
                inputElement = (
                    <input 
                    className="form-control"
                    onBlur={(e) => e.target.placeholder = item.placeholder}
                    onFocus={(e) => e.target.placeholder = ""}
                    placeholder={item.placeholder}
                    type="text"
                    />
                );
                break;
    
            default:
                inputElement = <p>Unknown input type</p>;
        }
    
        return (
            <div 
            className="form-group"
            key={idx}>
                <label>{item.title}</label>
                {inputElement}
                {item.message && <small className="form-text text-muted">{item.message}</small>}
            </div>
        );
    })}

    return(
        <div className="nav-wrap">
            <nav id="mainnav" className="mainnav st-2">
                <ul className="menu">
                {navbarData.buttons.map((item, idx) => (
                    <li 
                    className="menu-item"
                    key={idx}>
                        {item.comp}
                    </li>
                ))}
                </ul>
            </nav>
        </div>
    );
};

export default CheckoutPage;