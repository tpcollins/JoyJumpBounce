import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import { useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Booking = () => {

  useEffect(() => {
    document.body.classList.add('abus-body');
    
    return () => {
      document.body.classList.remove('abus-body');
    };
  }, []);

  return(
    <>
        <Header1 />

        <div className="container">

            <div className="contact-container">
                <div className="row">
                    <div className="col-12">
                        <Calendar />
                    </div>
                </div>
            </div>
        
        </div>

        <Footer />

    </>
  );
};

export default Booking;