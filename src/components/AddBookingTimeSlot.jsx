import React, { useState } from 'react';
import TimeDropdown from './TimeDropDown';

function AddBookingTimeSlot() {
  const [checkedDays, setCheckedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const [endTimes, setEndTimes] = useState({});

  const handleCheckboxChange = (day) => (event) => {
    setCheckedDays({ ...checkedDays, [day]: event.target.checked });

    // Reset end time if unchecked
    if (!event.target.checked) {
      setEndTimes((prev) => ({ ...prev, [day]: 'End Time' }));
    }
  };

  const handleSelectTime = (day) => (value) => {
    let [time, period] = value.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    let date = new Date();
    date.setHours(hour, minute + 45);

    let newHour = date.getHours();
    let newMinute = date.getMinutes();
    let newPeriod = newHour >= 12 ? "PM" : "AM";

    newHour = newHour % 12 || 12;
    newMinute = String(newMinute).padStart(2, "0");

    const newTime = `${newHour}:${newMinute} ${newPeriod}`;

    setEndTimes((prev) => ({
      ...prev,
      [day]: newTime,
    }));
  };

  return (
    <div className="slotForm add-booking">
      <div className="container">
        <div className="profile">
          <h1>Book a <span>(Time Slot)</span></h1>

          {Object.keys(checkedDays).map((day) => (
            <div key={day} className="d-flex align-items-center justify-content-between mt-3">
              <div className="form-check form-switch d-flex align-items-center justify-content-center">
                <label className="days-btn" htmlFor={day} style={{
                  background: checkedDays[day] ? "#E9EEF6" : '#fff',
                  boxShadow: checkedDays[day] ? "unset" : ''
                }}>
                  {day}
                </label>
                <input className="form-check-input" type="checkbox" id={day}
                  checked={checkedDays[day]}
                  onChange={handleCheckboxChange(day)}
                />
              </div>

              {checkedDays[day] && (
                <div className="row">
                  <div className="col-6">
                    <TimeDropdown handleSelectTime={handleSelectTime(day)} />
                  </div>
                  <div className="col-6 time-to">
                    <input type="text" placeholder="End Time" readOnly value={endTimes[day] || "End Time"} />
                  </div>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default AddBookingTimeSlot;
