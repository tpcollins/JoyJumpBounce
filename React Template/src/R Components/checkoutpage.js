// Bootstrap Button Variable
import { Button } from 'react-bootstrap';

const CheckoutPage = ({ 
    data,
    action }) => {

    return (
        <div className="container">
            <div className="checkout-container">
                <div className="container checkout-inner">
                    
                {data.fields.map((item, idx) => {
                    let inputElement;
                    switch (item.type) {
                        case "time":
                            inputElement = <input type="time" className="form-control" />;
                            break;

                        case "radio":
                            inputElement = (
                                <div>
                                    {item.options.map((option, optionIdx) => (
                                        <label 
                                            key={optionIdx}
                                            style={{ paddingRight: "20px" }}
                                        >
                                            <input
                                                name={item.title}
                                                type={item.type}
                                                value={option.value}
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
                            key={idx}
                        >
                            <label>{item.title}</label>
                            {inputElement}
                            {item.message && <small className="form-text text-muted">{item.message}</small>}
                        </div>
                    );
                })}

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                    <Button
                        className="checkout-button"
                        style={{
                        fontSize: '2em',
                        }}
                    >
                        Complete Checkout
                    </Button>
                </div>
                
            </div>
        </div>
    </div>
    );
};

export default CheckoutPage;
