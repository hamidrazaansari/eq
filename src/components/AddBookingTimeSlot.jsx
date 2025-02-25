import React, { useState, useEffect } from "react";
import TimeDropdown from "./TimeDropDown";
import axios from "axios";
import { API_URL } from "../utills/BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddBookingTimeSlot({ category, id }) {
  const [checkedDays, setCheckedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const [startTimes, setStartTimes] = useState({});
  const [endTimes, setEndTimes] = useState({});

  const navigate = useNavigate()

  useEffect(() => {
    if (category) {
      setCheckedDays({
        Monday: category.monday || false,
        Tuesday: category.tuesday || false,
        Wednesday: category.wednesday || false,
        Thursday: category.thursday || false,
        Friday: category.friday || false,
        Saturday: category.saturday || false,
        Sunday: category.sunday || false,
      });

      setStartTimes({
        Monday: category.mondayTime || "",
        Tuesday: category.tuesdayTime || "",
        Wednesday: category.wednesdayTime || "",
        Thursday: category.thursdayTime || "",
        Friday: category.fridayTime || "",
        Saturday: category.saturdayTime || "",
        Sunday: category.sundayTime || "",
      });

      setEndTimes({
        Monday: category.mondayEndTime || "End Time",
        Tuesday: category.tuesdayEndTime || "End Time",
        Wednesday: category.wednesdayEndTime || "End Time",
        Thursday: category.thursdayEndTime || "End Time",
        Friday: category.fridayEndTime || "End Time",
        Saturday: category.saturdayEndTime || "End Time",
        Sunday: category.sundayEndTime || "End Time",
      });
    }
  }, [category]);

  const handleCheckboxChange = (day) => (event) => {
    const isChecked = event.target.checked;
    setCheckedDays((prev) => ({ ...prev, [day]: isChecked }));

    if (!isChecked) {
      setStartTimes((prev) => ({ ...prev, [day]: "" }));
      setEndTimes((prev) => ({ ...prev, [day]: "End Time" }));
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

    setStartTimes((prev) => ({ ...prev, [day]: value }));
    setEndTimes((prev) => ({ ...prev, [day]: newTime }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");

    const requestData = {
      monday: checkedDays.Monday,
      mondayTime: startTimes.Monday,
      mondayEndTime: endTimes.Monday,
      tuesday: checkedDays.Tuesday,
      tuesdayTime: startTimes.Tuesday,
      tuesdayEndTime: endTimes.Tuesday,
      wednesday: checkedDays.Wednesday,
      wednesdayTime: startTimes.Wednesday,
      wednesdayEndTime: endTimes.Wednesday,
      thursday: checkedDays.Thursday,
      thursdayTime: startTimes.Thursday,
      thursdayEndTime: endTimes.Thursday,
      friday: checkedDays.Friday,
      fridayTime: startTimes.Friday,
      fridayEndTime: endTimes.Friday,
      saturday: checkedDays.Saturday,
      saturdayTime: startTimes.Saturday,
      saturdayEndTime: endTimes.Saturday,
      sunday: checkedDays.Sunday,
      sundayTime: startTimes.Sunday,
      sundayEndTime: endTimes.Sunday,
      bookingTimeSlotId: id,
    };

    try {
      const response = await axios.put(
        `${API_URL}/bookings/myBookings/updateTimeSlot/${id}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      toast.success("Time slot updated successfully!");
    } catch (error) {
      console.error("Error updating time slot:", error);
      toast.error("Failed to update time slot.");
    }
  };

  return (
    <div className="slotForm add-booking">
      <ToastContainer/>
      <div className="container">
        <div className="profile">
          <h1>
            Book a <span>(Time Slot)</span>
          </h1>

          {Object.keys(checkedDays).map((day) => (
            <div key={day} className="d-flex align-items-center justify-content-between mt-3">
              <div className="form-check form-switch d-flex align-items-center justify-content-center">
                <label
                  className="days-btn"
                  htmlFor={day}
                  style={{
                    background: checkedDays[day] ? "#E9EEF6" : "#fff",
                    boxShadow: checkedDays[day] ? "unset" : "",
                  }}
                >
                  {day}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={day}
                  checked={checkedDays[day]}
                  onChange={handleCheckboxChange(day)}
                />
              </div>

              {checkedDays[day] && (
                <div className="row">
                  <div className="col-6">
                    <TimeDropdown handleSelectTime={handleSelectTime(day)} selectedTime={startTimes[day] || ""}   />
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
        <div className="process-footer">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <button className='back' onClick={()=>{navigate(-1)}} >Back</button>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
    </div>
  );
}

export default AddBookingTimeSlot;
