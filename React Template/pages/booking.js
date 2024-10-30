import Layout from "../src/layouts/Layout";
import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import { useEffect, useState } from "react";
import ReactCalendar from "./calendar";
import { LeftArrow, RightArrow } from "../src/Icons";
import StockGrid from "../src/R Components/StockGrid";
import { bcyHseStockData } from "../src/Data/data";
import ShoppingCart from "../src/R Components/shoppingcart";
import CheckoutModal from "../src/R Components/checkoutmodal";

const Booking = () => {
  // Date Variables
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateClicked, setIsDateClicked] = useState(false);

  // Function to handle date click from react-calendar
  const handleDateClick = (date) => {
    setSelectedDate(date); // Update the selected date
    setIsDateClicked(true);
  };

  // Function to add items to cart
  const handleAddToCart = (index) => {
    const cartIcon = document.getElementById("cart-icon");
    const button = document.querySelector(`#add-to-cart-${index}`); // Select specific button

    if (cartIcon && button) {
      const cartRect = cartIcon.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      // Create a clone of the button
      const clone = button.cloneNode(true);
      clone.style.position = "fixed";
      clone.style.left = `${buttonRect.left}px`;
      clone.style.top = `${buttonRect.top}px`;
      clone.style.transition = "transform 1s ease, opacity 1s ease";
      clone.style.zIndex = 1000;

      // Add the clone to the document
      document.body.appendChild(clone);

      // Start animation to the cart
      requestAnimationFrame(() => {
          clone.style.transform = `translate(${cartRect.left - buttonRect.left}px, ${cartRect.top - buttonRect.top}px) scale(3)`;
          clone.style.opacity = "0"; // Fade out as it reaches the cart
      });

      // Remove the clone after the animation completes
      setTimeout(() => {
          clone.remove();
      }, 1000); // Match the transition duration
    }
  };

  // Function to open modal
  const handleModalOpen = () =>{
    setShow(true);
  }

  useEffect(() => {
    document.body.classList.add('abus-body');
    
    return () => {
      document.body.classList.remove('abus-body');
    };
  }, []);

  return(
    <>
      <Layout noFooter noHeader bodyClass={"main"}>

        <Header1 />

        <div className="container">
          
          <div 
          className="title-heading st-4"
          style={{paddingTop: '250px'}}
          >
              <div className="sub-heading clr-pri-3 f-mulish">
                  <LeftArrow />
                  <span className="inner-sub st-1">Booking</span>
                  <RightArrow />
              </div>
              <h2 className="title clr-pri-2">
                  Please Select Your Desired Date to get Started!
              </h2>
              <h5>Have questions before booking? 
                  <a 
                  className="clr-pri-2"
                  href="/contactus"
                  target="_blank"
                  > <u> Click here to get in contact!</u></a>
              </h5>
          </div>

          <ReactCalendar handleDateClick={handleDateClick}/>

          {isDateClicked && (
            <div>
              <h3
              className="text-center"
              >Available Stock For: {selectedDate.toLocaleDateString()}</h3>
              {/* Render StockGrid and pass image URLs */}
              <StockGrid 
              handleAddToCart={handleAddToCart}
              // isAnimating={isAnimating} 
              stockData={bcyHseStockData}
              // clickedIndex={clickedIndex}
              // targetPosition={targetPosition}
              />
            </div>
          )}

        </div>

        <ShoppingCart />

        <Footer />

        {/* <CheckoutModal /> */}
        
      </Layout>
  </>
  );
};

export default Booking;