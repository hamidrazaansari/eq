import React, { useEffect, useState } from "react";
import { CTimePicker } from "@coreui/react-pro";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";

export const TimePicker = ({ value, onTimeChange }) => {
  const [time, setTime] = useState(value || ""); // Ensure state initializes correctly

  useEffect(() => {
    if (value) {
      setTime(value); // Update state if parent value changes
    }
  }, [value]);

  const handleTimeChange = (time) => {
    if (!time) return;

    // Convert time to HH:mm format
    const formattedTime = typeof time === "string" ? time.slice(0, 5) : "";

    setTime(formattedTime);
    onTimeChange(formattedTime); // Send formatted time to parent
  };

  return (
    <div className="mb-3">
      <CTimePicker time={time} seconds={false} onTimeChange={handleTimeChange} />
    </div>
  );
};
