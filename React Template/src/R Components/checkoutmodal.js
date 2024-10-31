import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CheckoutModal = ({
    cartItems,
    openVar,
    setOpenVar,
    data
}) => {

    const [show, setShow] = useState(false);

    const handleModalClose = () =>{
        setShow(false);
        setOpenVar(false);
    }

    useEffect(() => {
        setShow(openVar);
        console.log("show checkout modal", show);
    }, [openVar]);

    return(
        <Modal 
        centered
        onHide={() => {
            setShow(false);
            setOpenVar(false);
        }}
        show={show}
        size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Your Cart</Modal.Title>
            </Modal.Header>

            <Modal.Body>
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

                        // case "dropdown":
                        //     inputElement = (
                        //         <select className="form-control">
                        //             <option value="">Select an option</option>
                        //             {item.options && item.options.map((option, index) => (
                        //                 <option key={index} value={option}>{option}</option>
                        //             ))}
                        //         </select>
                        //     );
                        //     break;

                        // case "dropdown/input":
                        //     inputElement = (
                        //         <>
                        //             <select className="form-control">
                        //                 <option value="">Select an option</option>
                        //                 {item.options && item.options.map((option, index) => (
                        //                     <option key={index} value={option}>{option}</option>
                        //                 ))}
                        //             </select>
                        //             <input type="text" className="form-control mt-2" placeholder="Or type here..." />
                        //         </>
                        //     );
                        //     break;

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
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                <Button variant="primary">Checkout</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CheckoutModal;
