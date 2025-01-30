import React from 'react'
import { TimePicker } from './TimePicker'

function NutritionConsultation() {
    return (
        <div className='container'>
            <div className="profile nutrition">
                <h1>Required Details for your <span>Nutrition Consultation</span></h1>
                <form action="" className='mt-5'>
                    <p></p>
                    <div className="input-box ">
                        <label htmlFor="AllDaySchedule">Your routine from the time you get up to the time you sleep</label>
                        <textarea rows={4} type="text" id='AllDaySchedule' />
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="input-box mt-1">
                                <label htmlFor="AllDaySchedule">Wake-Up Time</label>
                                <TimePicker/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="input-box mt-1">
                                <label htmlFor="AllDaySchedule">Sleep Time</label>
                                <TimePicker/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="input-box mt-4">
                                <label htmlFor="AllDaySchedule">Meal Time</label>
                                <TimePicker/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="input-box mt-4">
                                <label htmlFor="AllDaySchedule">What all you eat in meals
                                </label>
                                <input type="text" id='AllDaySchedule' className='me-0' />
                            </div>
                        </div>
                    </div>
                    <div className="input-box mt-1">
                                    <h6 className='mb-1'>Sleep Quality</h6>
                                    <div className="gender flex-column ">
                                        {['Excellent', 'Good' , 'Average' , 'Poor' , 'Terrible'].map((option) => (
                                            <div className="genderOpt justify-content-start m-0" key={option}>
                                                <input
                                                    type="radio"
                                                    id={option}
                                                    name="gender"
                                                    value={option}
                                                    // checked={profile.gender === option}
                                                    // onChange={handleInputChange}
                                                />
                                                <label htmlFor={option} className="form-check-label">
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {/* {errors.gender && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.gender}
                                        </div>
                                    )} */}
                    </div>

                    <div className="input-box mt-3">
                                    <h6 className='mb-1'>Energy Level</h6>
                                    <div className="gender flex-column ">
                                        {['very-high', 'High' , 'moderate' , 'Low' , 'Very-Low'].map((option) => (
                                            <div className="genderOpt justify-content-start m-0" key={option}>
                                                <input
                                                    type="radio"
                                                    id={option}
                                                    name="gender"
                                                    value={option}
                                                    // checked={profile.gender === option}
                                                    // onChange={handleInputChange}
                                                />
                                                <label htmlFor={option} className="form-check-label">
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {/* {errors.gender && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.gender}
                                        </div>
                                    )} */}
                    </div>

                </form>
            </div>
        </div>
    )
}

export default NutritionConsultation