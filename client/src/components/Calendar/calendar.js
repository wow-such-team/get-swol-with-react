import React from "react";
import Weekday from "../Weekdays/weekday";
import "./style.css"

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function Calendar() {
    return (
        <div id="calendarContainer">
            {days.map(day =>
                <Weekday key={day} id={day} />
            )}
        </div>
    );
};

export default Calendar;