// Template Components
import Layout from "../src/layouts/Layout";
import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import { LeftArrow, RightArrow } from "../src/Icons";
// React State Variables
import { useEffect, useState } from "react";
// Non-Template Components
import ReactCalendar from "./calendar";
import StockGrid from "../src/R Components/stockgrid";
import ErrorModal from "../src/R Components/errormodal";
// import CheckoutModal from "../src/R Components/checkoutmodal";
// Data
import { bcyHseStockData, footerData } from "../src/Data/data";
// Redux Variables
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from "../src/redux/slices/cartslice";
// Active Nav Menu
import { activeNavMenu } from "../src/utils";

const Booking = () => {
  // Variables
    // Date Variables
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDateClicked, setIsDateClicked] = useState(false);
    const [stockData, setStockData] = useState(bcyHseStockData);

    // Modal Variables
    // const [isOpen, setIsOpen] = useState(false);

    // Error modal variables
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Cart Variables
    const dispatch = useDispatch();

    // Cart Items from Redux
    const cartItems = useSelector((state) => state.cart.items);

    // Cart Items Length
    let cartItemsLength = cartItems.length;

    // Additional Data variables for cartItems
    let formattedDate = "";
    if (selectedDate) formattedDate = selectedDate.toISOString();// Convert Date to ISO string
    const additionalData = {
      date: formattedDate,
    };

  // Event Handlers
    // Handler to handle date click from react-calendar
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

    // Handler to add items to cart
    // const handleAddToCart = (item, index) => {
    //   const cartIcon = document.getElementById("cart-icon");
    //   const button = document.querySelector(`#add-to-cart-${index}`); // Select specific button
    
    //   // Proceed with the animation even if the cart icon is hidden
    //   if (cartIcon && button) {
    //     const cartRect = cartIcon.getBoundingClientRect();
    //     const buttonRect = button.getBoundingClientRect();
    
    //     // Create a clone of the button
    //     const clone = button.cloneNode(true);
    //     clone.style.position = "fixed";
    //     clone.style.left = `${buttonRect.left}px`;
    //     clone.style.top = `${buttonRect.top}px`;
    //     clone.style.transition = "transform 1s ease, opacity 1s ease";
    //     clone.style.zIndex = 1000;
    
    //     // Add the clone to the document
    //     document.body.appendChild(clone);
    
    //     // Start animation to the cart
    //     requestAnimationFrame(() => {
    //       clone.style.transform = `translate(${cartRect.left - buttonRect.left}px, ${cartRect.top - buttonRect.top}px) scale(3)`;
    //       clone.style.opacity = "0"; // Fade out as it reaches the cart
    //     });
    
    //     // Remove the clone after the animation completes
    //     setTimeout(() => {
    //       clone.remove();
    //     }, 1000); // Match the transition duration
    //   }
    
    //   // Add item to cart and ensure cart icon appears
    //   if (cartItemsLength === 0) {
    //     setTimeout(() => {
    //       dispatch(addItemToCart(item)); // Dispatch after animation
    //     }, 1000); // Slight delay to synchronize with animation
    //   } else {
    //     dispatch(addItemToCart(item));
    //   }
    // };

    const handleAddToCart = (item, index) => {
      // Check if the cart already has items and if the date matches
      if (cartItems.length > 0 && cartItems[0].date !== item.date) {
          setErrorMessage("This action is not allowed. The item date doesn't match the existing cart items.");
          setOpenErrorModal(true); // Trigger the error modal
          return; // Prevent adding the item to the cart
      }

      const cartIcon = document.getElementById("cart-icon");
      const button = document.querySelector(`#add-to-cart-${index}`);

      if (cartIcon && button) {
          const cartRect = cartIcon.getBoundingClientRect();
          const buttonRect = button.getBoundingClientRect();
          const clone = button.cloneNode(true);
          clone.style.position = "fixed";
          clone.style.left = `${buttonRect.left}px`;
          clone.style.top = `${buttonRect.top}px`;
          clone.style.transition = "transform 1s ease, opacity 1s ease";
          clone.style.zIndex = 1000;

          document.body.appendChild(clone);

          requestAnimationFrame(() => {
              clone.style.transform = `translate(${cartRect.left - buttonRect.left}px, ${cartRect.top - buttonRect.top}px) scale(3)`;
              clone.style.opacity = "0";
          });

          setTimeout(() => {
              clone.remove();
          }, 1000);
      }

      if (cartItemsLength === 0) {
          setTimeout(() => {
              dispatch(addItemToCart(item));
          }, 1000);
      } else {
          dispatch(addItemToCart(item));
      }
  };
    
    
    

    // Handler to open modal
    // const handleModalOpen = () =>{
    //   console.log("handleModalOpen clicked");
    //   setIsOpen(true);
    //   console.log("show on booking: ", isOpen)
    // };

  // useEffect
    useEffect(() => {
      activeNavMenu();
    }, []);

    // Chrome Detection
  useEffect(() => {
    const isChrome =
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor) &&
        !/OPR|Opera/.test(navigator.userAgent);

    if (isChrome) {
        document.body.classList.add('chrome-browser');
        console.log('Chrome detected');
    }
  }, []);

  // Safari Detection
  useEffect(() => {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        document.body.classList.add('safari-browser');
        console.log('Safari detected');
    } else {
        console.log('Not Safari');
    }
  }, []);

  // Firefox Detection
  useEffect(() => {
    const isFirefox = /Firefox\/\d+\.\d+/i.test(navigator.userAgent);

    if (isFirefox) {
      document.body.classList.add('firefox-browser');
      console.log('Firefox detected');
    } else {
      console.log('Not Firefox');
    }
  }, []);
    
    // useEffect(() => {
    //   console.log("show on booking useEffect: ", isOpen)
    // }, [isOpen]);

    useEffect(() => {
      document.body.classList.add('homepage-body');
      
      return () => {
        document.body.classList.remove('homepage-body');
      };
    }, []);

    useEffect(() => {
      console.log('Cart Items Length: ', cartItemsLength)
    }, [cartItemsLength]);

    
    useEffect(() => {
      console.log('Cart Items: ', cartItems)
    }, [cartItems]);
  // Functions
    // Function to fetch date filtered floats array
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
              additionalData={additionalData}
              handleAddToCart={handleAddToCart}
              stockData={stockData}
              />
            </div>
          )}

            <ErrorModal
                errorMessage={errorMessage}
                openError={openErrorModal}
                setOpenError={setOpenErrorModal}
            />
        </div>

        <Footer footerData={footerData}/>
        
      </Layout>
  </>
  );
};

export default Booking;