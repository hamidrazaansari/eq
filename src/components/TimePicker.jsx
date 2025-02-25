import React, { useState } from "react";
import { CTimePicker } from "@coreui/react-pro";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";

export const TimePicker = () => {
  const [time, setTime] = useState("");

  const handleTimeChange = (timeObj) => {
    if (!timeObj) return; 

    let formattedTime;

    if (typeof timeObj === "string") {
        const match = timeObj.match(/\d{2}:\d{2}/); 

        formattedTime = match ? match[0] : "Invalid Time";
    } else if (timeObj instanceof Date) {
        // Convert Date object to HH:mm format
        formattedTime = timeObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else {
        formattedTime = "Invalid Time";
    }
    setTime(formattedTime);
};

  return (
    <div className="mb-3 mb-sm-0">
      <CTimePicker
        locale="en-US"
        seconds={false}
        value={time}
        onTimeChange={handleTimeChange} 
      />
    </div>
  );
};
