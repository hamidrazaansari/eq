import React , {useState} from "react";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";

// Function to generate time intervals
const generateTimeOptions = () => {
  const times = [];
  let startHour = 5; // Start time: 5:00 AM
  let endHour = 22; // End time: 10:00 PM (24-hour format)
  let minutes = 0;

  while (startHour < endHour || (startHour === endHour && minutes === 0)) {
    const hour = startHour % 12 || 12; // Convert to 12-hour format
    const period = startHour < 12 ? "AM" : "PM";
    const time = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
    times.push({ name: time, value: time });

    // Increment time by 15 minutes
    minutes += 15;
    if (minutes >= 60) {
      minutes = 0;
      startHour++;
    }
  }

  return times;
};

const TimeDropdown = ({handleSelectTime}) => {
  const timeOptions = generateTimeOptions();
  const [selectedTime, setSelectedTime] = useState("");


  const handleTimeChange = (selectedTime) => {
    console.log("Selected Time:", selectedTime);
    setSelectedTime(selectedTime)
    handleSelectTime(selectedTime)
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <SelectSearch
        options={timeOptions}
        onChange={handleTimeChange}
        search={true}
        placeholder="Choose a time"
        value={selectedTime}
      />
    </div>
  );
};

export default TimeDropdown;
