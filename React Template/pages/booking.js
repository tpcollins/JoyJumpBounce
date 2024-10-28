import Layout from "../src/layouts/Layout";
import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import { useEffect, useState } from "react";
import ReactCalendar from "./calendar";
import { LeftArrow, RightArrow } from "../src/Icons";
import StockGrid from "../src/R Components/StockGrid";
import { bcyHseStockData } from "../src/Data/data";
import ShoppingCart from "../src/R Components/shoppingcart";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateClicked, setIsDateClicked] = useState(false);

  // Function to handle date click from react-calendar
  const onDateClick = (date) => {
    setSelectedDate(date); // Update the selected date
    setIsDateClicked(true);
  };

  const onCartClick = (event) => {
    event.preventDefault();
    setSelectedFloat(true);
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

          <ReactCalendar onDateClick={onDateClick}/>

          {isDateClicked && (
            <div>
              <h3
              className="text-center"
              >Available Stock For: {selectedDate.toLocaleDateString()}</h3>
              {/* Render StockGrid and pass image URLs */}
              <StockGrid 
              stockData={bcyHseStockData}
              />
            </div>
          )}

        </div>

        <ShoppingCart />

        <Footer />
        
      </Layout>
  </>
  );
};

export default Booking;