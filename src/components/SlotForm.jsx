import React, { useEffect, useState, useCallback } from "react";
import "../assets/css/process.css";
import "../assets/css/onboarding.css";
import "../assets/css/slotForm.css";
import NavBar from "./NavBar";
import axios from "axios";
import { API_URL } from "../utills/BaseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AddBookingTimeSlot from "./AddBookingTimeSlot";

function SlotForm() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [bookingTimeSlotId, setBookingTimeSlotId] = useState("");
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract ID from URL
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch Category Data
        const categoryResponse = await axios.get(
          `${API_URL}/bookings/myBookings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCategory(categoryResponse.data?.body);

        // Fetch Time Slots (only if category is available)
        if (categoryResponse.data?.body?.category?._id) {
          const timeSlotsResponse = await axios.get(
            `${API_URL}/bookingTimeSlots?displayOrder=ASC&category=${categoryResponse.data.body.category._id}`
          );
          setData(timeSlotsResponse.data?.body || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = useCallback((_id) => {
    setBookingTimeSlotId(_id);
    setVisible(true);
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.put(
        `${API_URL}/bookings/myBookings/updateTimeSlot/${id}`,
        { bookingTimeSlotId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Time Slot Booked");
      if (response.data?.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  if (!data || data.length === 0) {
    return <AddBookingTimeSlot category={category} id={id} />;
  }

  return (
    <div className="slotForm">
      <ToastContainer />
      <div className="container">
        <div className="profile">
          <h1>
            Book a <span>(Time Slot)</span>
          </h1>
          <div className="input-box mx-auto">
            {data.map((item) => (
              <div className="my-3 custom-radio-container" key={item._id}>
                <div className="row">
                  <div className="col">
                    <input
                      type="radio"
                      id={item._id}
                      name="currentMedication"
                      className="custom-radio"
                      onChange={() => handleChange(item._id)}
                    />
                    <label htmlFor={item._id} className="form-check-label">
                      {item.title}
                    </label>
                  </div>
                  {item.sunday && (
                    <div className="col">
                      <button className="fri-btn sunday">
                        SUN - {item.sundayTime}
                      </button>
                    </div>
                  )}
                  {item.monday && (
                    <div className="col">
                      <button className="fri-btn monday">
                        MON - {item.mondayTime}
                      </button>
                    </div>
                  )}
                  {item.tuesday && (
                    <div className="col">
                      <button className="fri-btn tuesday">
                        TUE - {item.tuesdayTime}
                      </button>
                    </div>
                  )}
                  {item.wednesday && (
                    <div className="col">
                      <button className="fri-btn wednesday">
                        WED - {item.wednesdayTime}
                      </button>
                    </div>
                  )}
                  {item.thursday && (
                    <div className="col">
                      <button className="fri-btn">THU - {item.thursdayTime}</button>
                    </div>
                  )}
                  {item.friday && (
                    <div className="col">
                      <button className="fri-btn">FRI - {item.fridayTime}</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            className={`slot-booking-btn ${visible ? "d-block" : "d-none"}`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SlotForm;
