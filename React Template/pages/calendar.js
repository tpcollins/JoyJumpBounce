import Calendar from 'react-calendar';

const ReactCalendar = ({onDateClick}) => {
    
    return(
    <>
        <div className="container">
            <div className="calendar-container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <Calendar onClickDay={onDateClick} />
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default ReactCalendar;