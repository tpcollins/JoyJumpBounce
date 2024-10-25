import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const ReactCalendar = () => {

  return(
    <>
      <div className="container">
        <div className="calendar-container">
          <div className="row justify-content-center">
            <div className="col-12">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReactCalendar;