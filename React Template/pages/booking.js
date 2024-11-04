// Template Components
import Layout from "../src/layouts/Layout";
import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import { LeftArrow, RightArrow } from "../src/Icons";
// React State Variables
import { useEffect, useState } from "react";
// Non-Template Components
import ReactCalendar from "./calendar";
import StockGrid from "../src/R Components/StockGrid";
import ShoppingCart from "../src/R Components/shoppingcart";
import CheckoutModal from "../src/R Components/checkoutmodal";
// Data
import { bcyHseStockData } from "../src/Data/data";
// Redux Variables
import { useDispatch } from 'react-redux';
import { addItemToCart } from "../src/redux/slices/cartslice";
// Active Nav Menu
import { activeNavMenu } from "../src/utils";

const Booking = () => {

  // Date Variables
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateClicked, setIsDateClicked] = useState(false);
  const [stockData, setStockData] = useState(bcyHseStockData);

  // Modal Variables
  const [isOpen, setIsOpen] = useState(false);

  // Cart Variables
  const dispatch = useDispatch();

  // Function to handle date click from react-calendar
  const handleDateClick = async (date) => {
    setSelectedDate(date); // Update the selected date
    setIsDateClicked(true);

    // Call the function to fetch booked floats from Airtable
    try {
        await fetchBookedFloats(date);
    } catch (error) {
        console.error('Error fetching booked floats:', error);
    }
  };


  // Function to add items to cart
  const handleAddToCart = (item, index) => {
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
      
      dispatch(addItemToCart(item));
    }
  };

  // Function to open modal
  const handleModalOpen = () =>{
    console.log("handleModalOpen clicked");
    setIsOpen(true);
    console.log("show on booking: ", isOpen)
  };

  useEffect(() => {
    activeNavMenu();
  }, []);

  const fetchBookedFloats = async (selectedDate) => {
    try {
      const response = await fetch('/api/getBookedFloats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedDate }),
      });
  
      const result = await response.json();
      if (response.ok) {
        const filteredStockData = bcyHseStockData.data.filter(
          item => !result.bookedFloats.includes(item.title)
        );
        setStockData({ data: filteredStockData });
      } else {
        console.error('Failed to retrieve booked floats:', result.message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  
  useEffect(() => {
    console.log("show on booking useEffect: ", isOpen)
  }, [isOpen]);

  useEffect(() => {
    document.body.classList.add('homepage-body');
    
    return () => {
      document.body.classList.remove('homepage-body');
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

              <StockGrid 
              handleAddToCart={handleAddToCart}
              stockData={stockData}
              />
            </div>
          )}

          <ShoppingCart 
          onClick={handleModalOpen}
          />
          

          <CheckoutModal 
          openVar={isOpen}
          setOpenVar={setIsOpen}
          />
        </div>

        <Footer />
        
      </Layout>
  </>
  );
};

export default Booking;