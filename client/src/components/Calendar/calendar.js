import React from "react";
import Weekday from "../Weekdays/weekday";

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function Calendar() {
    return (
        <div className="">
            {days.map(day =>
                <Weekday key={day} id={day} />
            )}
        </div>
    );
};

export default Calendar;