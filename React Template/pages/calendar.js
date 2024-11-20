// import Calendar from 'react-calendar';

// const ReactCalendar = ({handleDateClick}) => {
    
//     return(
//     <>
//         <div className="container">
//             <div className="calendar-container">
//                 <div className="row justify-content-center">
//                     <div className="col-12">
//                         <Calendar onClickDay={handleDateClick} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
//     );
// };

// export default ReactCalendar;

import React, { useState } from "react";
import Calendar from "react-calendar";

const ReactCalendar = ({ handleDateClick }) => {
  const [currentDate] = useState(new Date());
  const maxDate = new Date();
  maxDate.setMonth(currentDate.getMonth() + 6); // Allow 6 months from the current month

  return (
    <div className="container">
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick}
          showDoubleView={false} // Removes the year-changing double arrow buttons
          maxDate={maxDate} // Restricts navigation to 6 months from now
          minDate={new Date()} // Prevent navigating to past dates
          navigationLabel={({ date, label }) => label} // Customizes the label for the current view
          next2Label={null} // Removes the double forward button
          prev2Label={null} // Removes the double backward button
        />
      </div>
    </div>
  );
};

export default ReactCalendar;

