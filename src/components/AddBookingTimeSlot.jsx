import React, { useState } from 'react'
import { TimePicker } from './TimePicker'
import TimeDropdown from './TimeDropDown'

function AddBookingTimeSlot() {
  const [isSaturdayChecked, setIsSaturdayChecked] = useState(false);
  const [isMondayChecked, setIsMondayChecked] = useState(false);
  const [isTuesChecked, setIsTuesChecked] = useState(false);
  const [isWedChecked, setIsWedChecked] = useState(false);
  const [isThursChecked, setIsThursChecked] = useState(false);
  const [isFriChecked, setIsFriChecked] = useState(false);
  const [selectedTime, setSelectedTime] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsSaturdayChecked(event.target.checked);
  };
  const handleMonCheck = (event) => {
    setIsMondayChecked(event.target.checked);
  };
  const handleTuesCheck = (event) => {
    setIsTuesChecked(event.target.checked);
  };
  const handleWedCheck = (event) => {
    setIsWedChecked(event.target.checked);
  };
  const handleThursCheck = (event) => {
    setIsThursChecked(event.target.checked);
  };
  const handleFriCheck = (event) => {
    setIsFriChecked(event.target.checked);
  };

  const handleSelect = (value)=>{
    setSelectedTime(value)
  }

  return (
    <div className='slotForm add-booking'>
      <div className="container">
        <div className="profile">

          <h1>Book a <span>(Time Slot)</span></h1>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                checked={isMondayChecked}
                onChange={handleMonCheck}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Monday</label>
            </div>
            {isMondayChecked && (
              <div className='row'>
                <div className="col-6">
                  <h3>Start Time</h3>
                  <TimeDropdown />
                </div>
                <div className="col-6">
                  <h3>End Time</h3>

                  <TimeDropdown />
                </div>
              </div>
            )}
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                checked={isTuesChecked}
                onChange={handleTuesCheck} />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Tuesday</label>
            </div>
            {isTuesChecked && (
              <div className='row'>
                <div className="col-6">
                  <h3>Start Time</h3>
                  <TimeDropdown />
                </div>
                <div className="col-6">
                  <h3>End Time</h3>
                  <TimeDropdown />
                </div>
              </div>
            )}

          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                checked={isWedChecked}
                onChange={handleWedCheck} />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Wednesday</label>
            </div>
            {isWedChecked && (
              <div className='row'>
                <div className="col-6">
                  <h3>Start Time</h3>
                  <TimeDropdown />
                </div>
                <div className="col-6">
                  <h3>End Time</h3>
                  <TimeDropdown />
                </div>
              </div>
            )}

          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                checked={isThursChecked}
                onChange={handleThursCheck}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">thursday</label>
            </div>
            {
              isThursChecked && (
                <div className='row'>
                  <div className="col-6">
                    <h3>Start Time</h3>
                    <TimeDropdown handleSelect={handleSelect}  />
                  </div>
                  <div className="col-6">
                    <h3>End Time</h3>
                    <div className="input-box">
                      <input
                        type="text"
                        name="mobile"
                        readOnly
                      value={selectedTime + 45}
                      />
                    </div>

                  </div>
                </div>
              )
            }

          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                checked={isFriChecked}
                onChange={handleFriCheck} />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Friday</label>
            </div>
            {isFriChecked && (
              <div className='row'>
                <div className="col-6">
                  <h3>Start Time</h3>

                  <TimeDropdown />
                </div>
                <div className="col-6">
                  <h3>End Time</h3>

                  <TimeDropdown />
                </div>
              </div>
            )}

          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                checked={isSaturdayChecked}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Saturday</label>
            </div>
            {isSaturdayChecked && (
              <div className='row'>
                <div className="col-6">
                  <h3>Start Time</h3>

                  <TimeDropdown />
                </div>
                <div className="col-6">
                  <h3>End Time</h3>

                  <TimeDropdown />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBookingTimeSlot