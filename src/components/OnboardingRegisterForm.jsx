import React, { useState, useEffect } from 'react'
import '../assets/css/process.css';
import '../assets/css/onboarding.css';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneNumberInput from './PhoneNumberInput';
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from 'moment';
import { TimePicker } from './TimePicker'
import dayjs from 'dayjs';
import CountryCode from './CountryCode';




function OnboardingRegisterForm() {

    const [showSection, setShowSection] = useState(false);
    const [otherFavWorkout, setOtherFavWorkout] = useState("");
    const [otherGoal, setOtherGoal] = useState("");
    const [otherBraverage, setOtherBraverage] = useState("");
    const [errors, setErrors] = useState({
        alcohol: '',
        covidDetected: '',
        currentMedication: '',
        currentWeight: '',
        dailyWaterConsumption: '',
        eggAndNonVegFrequency: '',
        existingHealthIssues: '',
        foodAllergies: '',
        fitnessGoals: '',
        foodChoice: '',
        height: '',
        instagramId: '',
        junkSugarStressFrequency: '',
        personalNotes: '',
        smoke: '',
        occupation: '',
        sourceChanel: '',
        weightAtJoining: '',
        workoutFrequency: '',
        email: '',
        firstName: '',
        lastName: '',
        countryCode: '',
        mobile: '',
        gender: '',
        wholeDayRoutine: '',
        wakeUpTime: '',
        wholeDayRoutine: '',
        sleepTime: '',
        sleepQuality: '',
        meals: '',
        energyLevel: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSection(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const location = useLocation();

    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        // booking: id,
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        gender: '',
        countryCode: "",
        mobile: '',
        location: '',
        height: '',
        // weightAtJoining: '',
        currentWeight: '',
        occupation: '',
        gender: '',
        dob: '',
        preferences: [],
        existingHealthIssues: '',
        currentMedication: '',
        covidDetected: '',
        workoutFrequency: '',
        favoriteWorkouts: [],
        fitnessGoals: [],
        foodChoice: '',
        foodAllergies: '',
        eggAndNonVegFrequency: '',
        junkSugarStressFrequency: '',
        dailyWaterConsumption: '',
        dailyBeverage: [],
        smoke: '',
        alcohol: '',
        personalNotes: '',
        instagramId: '',
        sourceChanel: '',
        wholeDayRoutine: '',
        wakeUpTime: '',
        wholeDayRoutine: '',
        sleepTime: '',
        sleepQuality: '',
        meals: '',
        energyLevel: '',
    });





    // Handle input changes for all fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update profile state
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    };
    const handleInputNameChange = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");

        setProfile((prevState) => ({
            ...prevState,
            [name]: filteredValue,
        }));

    };
    const handleInputNumChange = (e) => {
        const { name, value } = e.target;

        setProfile((prevState) => ({
            ...prevState,
            [name]: value.replace(/[^0-9+-.]/g, ""),

        }));
    };
    const handleCheckboxChange = (event) => {
        const { checked, value } = event.target;

        setProfile((prev) => ({
            ...prev,
            preferences: Array.isArray(prev.preferences)
                ? (checked
                    ? [...prev.preferences, value] // Add the selected goal
                    : prev.preferences.filter((goal) => goal !== value) // Remove if unchecked
                )
                : [value],
        }));
    };
    const handleFavoriteWorkoutChange = (event) => {
        const { checked, value } = event.target;

        setProfile((prev) => {
            // Ensure `fitnessGoals` is always an array
            const updatedGoals = Array.isArray(prev.favoriteWorkouts) ? [...prev.favoriteWorkouts] : [];

            if (checked) {
                if (!updatedGoals.includes(value)) {
                    updatedGoals.push(value); // Add the selected goal
                }
            } else {
                return {
                    ...prev,
                    favoriteWorkouts: updatedGoals.filter((goal) => goal !== value)
                };
            }

            return { ...prev, favoriteWorkouts: updatedGoals };
        });

        // Clear "Other" input when unchecked
        if (value === "Other") {
            setOtherFavWorkout(checked ? "" : "");
        }
    };
    const handleOtherWorkoutChange = (event) => {
        const inputValue = event.target.value;
        setOtherFavWorkout(inputValue);

        setProfile((prev) => {
            // Ensure `fitnessGoals` is always an array
            let updatedGoals = Array.isArray(prev.favoriteWorkouts) ? [...prev.favoriteWorkouts] : [];

            // If "Other" was checked, keep it in the array
            if (!updatedGoals.includes("Other")) {
                updatedGoals.push("Other");
            }

            updatedGoals = updatedGoals.filter((goal) => goal !== otherFavWorkout); // Remove "Other" label

            if (inputValue.trim() !== "") {
                updatedGoals.push(inputValue); // Add user input
            } else {
                updatedGoals.push("Other"); // Keep "Other" label if input is empty
            }

            return { ...prev, favoriteWorkouts: updatedGoals };
        });
    };
    const handleFitnessGoalChange = (event) => {
        const { checked, value } = event.target;

        setProfile((prev) => {
            // Ensure `fitnessGoals` is always an array
            const updatedGoals = Array.isArray(prev.fitnessGoals) ? [...prev.fitnessGoals] : [];

            if (checked) {
                if (!updatedGoals.includes(value)) {
                    updatedGoals.push(value); // Add the selected goal
                }
            } else {
                return {
                    ...prev,
                    fitnessGoals: updatedGoals.filter((goal) => goal !== value) // Remove unchecked goal
                };
            }

            return { ...prev, fitnessGoals: updatedGoals };
        });

        // Clear "Other" input when unchecked
        if (value === "Other" && !checked) {
            setOtherGoal("");
        }
    };
    const handleOtherGoalChange = (event) => {
        const inputValue = event.target.value;
        setOtherGoal(inputValue);

        setProfile((prev) => {
            // Ensure `fitnessGoals` is always an array
            let updatedGoals = Array.isArray(prev.fitnessGoals) ? [...prev.fitnessGoals] : [];

            // If "Other" was checked, keep it in the array
            if (!updatedGoals.includes("Other")) {
                updatedGoals.push("Other");
            }

            updatedGoals = updatedGoals.filter((goal) => goal !== otherGoal); // Remove "Other" label

            if (inputValue.trim() !== "") {
                updatedGoals.push(inputValue); // Add user input
            } else {
                updatedGoals.push("Other"); // Keep "Other" label if input is empty
            }

            return { ...prev, fitnessGoals: updatedGoals };
        });
    };
    const handleBeverageChange = (event) => {
        const { checked, value } = event.target;

        setProfile((prev) => {
            // Ensure `fitnessGoals` is always an array
            const updatedGoals = Array.isArray(prev.dailyBeverage) ? [...prev.dailyBeverage] : [];

            if (checked) {
                if (!updatedGoals.includes(value)) {
                    updatedGoals.push(value); // Add the selected goal
                }
            } else {
                return {
                    ...prev,
                    dailyBeverage: updatedGoals.filter((goal) => goal !== value) // Remove unchecked goal
                };
            }

            return { ...prev, dailyBeverage: updatedGoals };
        });

        // Clear "Other" input when unchecked
        if (value === "Other" && !checked) {
            setOtherBraverage("");
        }
    };
    const handleOtherBeverageChange = (event) => {
        const inputValue = event.target.value;
        setOtherBraverage(inputValue);

        setProfile((prev) => {
            let updatedBeverages = Array.isArray(prev.dailyBeverage) ? [...prev.dailyBeverage] : [];

            // If "Other" was checked, keep it in the array
            if (!updatedBeverages.includes("Other")) {
                updatedBeverages.push("Other");
            }

            // Remove any previously added custom value
            updatedBeverages = updatedBeverages.filter((bev) => bev !== otherBraverage);

            // Add the new input value if not empty
            if (inputValue.trim() !== "") {
                updatedBeverages.push(inputValue);
            }

            return { ...prev, dailyBeverage: updatedBeverages };
        });
    };

    const token = localStorage.getItem('authToken');

    const handleSubmitData = async (e) => {
        if (e) e.preventDefault();
        try {
            const resp = await axios.post(
                `${API_URL}/onboardingRegistrations`,
                profile,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },

            );

        } catch (error) {
            console.error(error.response?.data?.errors);
            const errorData = error.response.data.errors;
            setErrors({
                alcohol: errorData.alcohol || '',
                covidDetected: errorData.covidDetected || '',
                currentMedication: errorData.currentMedication || '',
                currentWeight: errorData.currentWeight || '',
                dailyWaterConsumption: errorData.dailyWaterConsumption || '',
                eggAndNonVegFrequency: errorData.eggAndNonVegFrequency || '',
                existingHealthIssues: errorData.existingHealthIssues || '',
                foodAllergies: errorData.foodAllergies || '',
                fitnessGoals: errorData.fitnessGoals || '',
                foodChoice: errorData.foodChoice || '',
                gender: errorData.gender || '',
                dob: errorData.dob || '',
                height: errorData.height || '',
                instagramId: errorData.instagramId || '',
                junkSugarStressFrequency: errorData.junkSugarStressFrequency || '',
                occupation: errorData.occupation || '',
                personalNotes: errorData.personalNotes || '',
                smoke: errorData.smoke || '',
                sourceChanel: errorData.sourceChanel || '',
                weightAtJoining: errorData.weightAtJoining || '',
                workoutFrequency: errorData.workoutFrequency || '',
                email: errorData.email || '',
                firstName: errorData.firstName || '',
                lastName: errorData.lastName || '',
                mobile: errorData.mobile || '',
                countryCode: errorData.countryCode || '',
                wholeDayRoutine: errorData.wholeDayRoutine || '',
                wakeUpTime: errorData.wakeUpTime || '',
                wholeDayRoutine: errorData.wholeDayRoutine || '',
                sleepTime: errorData.sleepTime || '',
                sleepQuality: errorData.sleepQuality || '',
                meals: errorData.meals || '',
                energyLevel: errorData.energyLevel || '',
            });
        }
    };
    useEffect(() => {
        if (profile.wakeUpTime && profile.sleepTime) {
            console.log("Calling Submit after Time Selection...");
            handleSubmitData(); // Call submit after wakeupTime & sleepTime are updated
        }
    }, [profile.wakeUpTime, profile.sleepTime , profile.countryCode]);

    const handleIwilDOLater = () => {
        navigate(-1)
    }

    const handleDateChange = (name) => {
        const formatedeDate = moment(name.$d).format('MM/DD/YYYY')
        setProfile((prevState) => ({
            ...prevState,
            dob: formatedeDate,
        }));
    };


    // fetching user Data for display

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${API_URL}/onboardingRegistrations/userOnboardingRegistrationDetails`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                let data = response.data.body
                delete data._id
                delete data.createdAt
                delete data.status
                delete data.updatedAt
                delete data.user
                data.covidDetected = `${data.covidDetected}`
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);

            }
        }
        fetchData();
    }, [token]);

    const CountryCodeChange = (countryCode) => {
        setProfile((prevState) => ({
            ...prevState,
            countryCode: countryCode,
        }));

        handleSubmitData()

    }

    return (
        <div className='onboarding-register-form'>
            <ToastContainer />
            <div className="item-container welcome-onboard">
                <div className="container mt-5">
                    <div className="process-heading  mt-5">
                        <h2 className="mb-3">Please fill the registration form, <span style={{ color: "#006d5a" }}>it will take just a minute.</span></h2>
                    </div>
                    <div className="profile">
                        <h2>Basic Information</h2>
                        <div className="row mt-5">
                            {/* First Name */}
                            <div className="col-lg-6">
                                <div className="input-box">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={profile.firstName}
                                        onChange={handleInputNameChange}
                                        placeholder="Enter First Name"
                                        onBlur={handleSubmitData}

                                    />
                                    {errors.firstName && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.firstName}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Last Name */}
                            <div className="col-lg-6">
                                <div className="input-box">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={profile.lastName}
                                        onChange={handleInputNameChange}
                                        placeholder="Enter Last Name"
                                        onBlur={handleSubmitData}

                                    />
                                    {errors.lastName && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.lastName}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Email */}
                            <div className="col-lg-6">
                                <div className="input-box">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Email"
                                        onBlur={handleSubmitData}

                                    />
                                    {errors.email && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Country Code and Mobile */}
                            <div className="col-lg-6">
                                <div className="input-box">
                                    <label htmlFor="mobile">Mobile Number</label>
                                    <div className="mobile-input">
                                        {/* <PhoneNumberInput errors={errors} onCodeChange={handleCodeChange} /> */}
                                        <CountryCode
                                            CountryCodeChange={CountryCodeChange}
                                            defaultCountryCode={profile.countryCode}
                                        /> 
                                        <input
                                            type="text"
                                            id="mobile"
                                            name="mobile"
                                            value={profile.mobile}
                                            onChange={handleInputNumChange}
                                            placeholder="Enter Mobile Number"
                                            onBlur={handleSubmitData}

                                        />
                                        {errors.mobile && (
                                            <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                                {errors.mobile}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 dob">
                                <div className="d-flex flex-column">
                                    <label htmlFor="dob" className='dobLabal'>DOB</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={profile.dob ? dayjs(profile.dob) : null} // Convert profile.dob to Day.js object
                                            onChange={handleDateChange}
                                            format="DD/MM/YYYY"
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    placeholder="Select Date"
                                                    variant="outlined"
                                                    hiddenLabel
                                                    sx={{ '& .MuiInputBase-root': { padding: 0 } }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>
                                {errors.dob && (
                                    <div style={{ color: 'red', fontSize: "9px", position: "absolute", top: "335px" }}>
                                        {errors.dob}
                                    </div>
                                )}
                            </div>

                            {/* Gender */}
                            <div className="col-lg-6">
                                <div className="input-box">
                                    <h6 className='mt-3'>Gender</h6>
                                    <div className="gender ">
                                        {['Male', 'Female', 'Other'].map((option) => (
                                            <div className="genderOpt" key={option}>
                                                <input
                                                    type="radio"
                                                    id={option}
                                                    name="gender"
                                                    value={option}
                                                    checked={profile.gender === option}
                                                    onChange={handleInputChange}
                                                    className='custom-radio'
                                                    onBlur={handleSubmitData}

                                                />

                                                <label htmlFor={option} className="form-check-label" style={{ width: "85px" }}>
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.gender && (
                                        <div style={{ color: 'red', fontSize: "9px", position: "absolute", top: "53px" }}>
                                            {errors.gender}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Height */}
                            <div className="col-lg-6 mt-2">
                                <div className="input-box">
                                    <label htmlFor="height">Height In (Cm)</label>
                                    <input
                                        type="text"
                                        id="height"
                                        name="height"
                                        value={profile.height}
                                        onChange={handleInputNumChange}
                                        placeholder="Enter your Height in (Cm)"
                                        onBlur={handleSubmitData}

                                    />
                                    {errors.height && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.height}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Current Weight */}
                            <div className="col-lg-6 mt-2">
                                <div className="input-box">
                                    <label htmlFor="currentWeight">Current Weight In (kg)</label>
                                    <input
                                        type="text"
                                        id="currentWeight"
                                        name="currentWeight"
                                        value={profile.currentWeight}
                                        onChange={handleInputNumChange}
                                        placeholder="Enter Your Current Weight (kg)"
                                        onBlur={handleSubmitData}

                                    />
                                    {errors.currentWeight && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.currentWeight}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 mt-2">
                                <div className="input-box">
                                    <label htmlFor="location">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={profile.location}
                                        onChange={handleInputChange}
                                        placeholder="Enter your Location"
                                        onBlur={handleSubmitData}

                                    />
                                    {errors.location && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.location}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Occupation */}
                            <div className="col-lg-6">
                                <div className="input-box mt-2">
                                    <label htmlFor="occupation">Occupation</label>
                                    <input
                                        type="text"
                                        id="occupation"
                                        name="occupation"
                                        value={profile.occupation}
                                        onChange={handleInputChange}
                                        onBlur={handleSubmitData}

                                    />
                                    {errors.occupation && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.occupation}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`profile`} >
                        <h2>
                            What all options describe you the best?{" "}
                            <span className="text-dark">Check top 3 that apply</span>
                        </h2>

                        <div className="row mt-5">
                            {[
                                "Pregnancy Training - Preparing Body to Conceive, Trying to conceive, Prenatal, Postnatal",
                                "PCOS / PCOD / Hormonal Health Improvement",
                                "Pre / Post Menopausal Aid",
                                "Senior Citizen",
                                "Injury Recovery",
                                "Surgery Recovery",
                                "Cancer Recovery",
                                "Therapeutic Issues Prevention - Thyroid, Migraine, Back Pain, Knee Pain, etc",
                                "Gut Booster - Relief from Constipation, Indigestion, Digestive Disorders, etc",
                                "Stress Management/ Depression Relief/ Anxiety Relief",
                                "Lifestyle Correction - De-addiction from Smoking/ Drinking/ Social Media, Insomnia etc",
                                "Sports and Athletic Training",
                                "Dancer's Training",
                                "Weight Management",
                                "Alignment Correction",
                                "Toning and Strengthening",
                                "Overall Physical and Mental Wellbeing",
                                "Targeted Yoga Training - Unlock Practices and Postures of Your Choice",
                                "Advance Yoga Training - Unlock 5 Advance Postures Every Month",
                                "Bridal Prep",
                                "Celebrity Role Prep",
                            ].map((option, index) => (
                                <div className="d-flex align-items-center my-2" key={index}>
                                    <input
                                        type="checkbox"
                                        id={`option-${index}`}
                                        className="custom-checkbox me-3"
                                        value={option}
                                        onChange={handleCheckboxChange}
                                        checked={Array.isArray(profile.preferences) && profile.preferences.includes(option)}
                                        onBlur={handleSubmitData}
                                    />
                                    {errors.preferences && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.preferences}
                                        </div>
                                    )}
                                    <label htmlFor={`option-${index}`} className="custom-label">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="profile">
                        <h2>
                            Any existing Health issues (PCOS, Thyroid, Allergies, Digestive issues
                            etc.)/Surgeries in past/Injuries in past/ Stress, Anxiety or Depression
                        </h2>
                        <div className="input-box mt-4">
                            <input
                                type="text"
                                name="existingHealthIssues" // Ensure the name matches the key in the profile object
                                value={profile.existingHealthIssues}
                                onChange={handleInputChange}
                                placeholder="Enter Your Answer"
                                onBlur={handleSubmitData}
                            />
                            {errors.existingHealthIssues && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                    {errors.existingHealthIssues}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>Are you currently on any medication</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['Yes', 'No', 'other'].map((option) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name="currentMedication"
                                            className='custom-radio'
                                            value={option}
                                            checked={profile.currentMedication === option}
                                            onChange={handleInputChange}

                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {profile.currentMedication === "other" && (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="customMedication"
                                        placeholder="Please specify"
                                        className="Other-Input"
                                        value={profile.customMedication || ""}
                                        onChange={(e) => setProfile((prev) => ({ ...prev, customMedication: e.target.value }))}
                                    />
                                </div>
                            )}
                            {errors.currentMedication && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "100px" }}>
                                    {errors.currentMedication}
                                </div>
                            )}
                        </div>


                    </div>
                    <div className="profile">
                        <h2 className='mb-3'>Were you ever detected with Covid</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                <div className="genderOpt m-1">
                                    <input
                                        type="radio"
                                        id="true"
                                        name="covidDetected"
                                        className="custom-radio"
                                        value={true}  // ✅ Pass Boolean value
                                        checked={profile.covidDetected} // ✅ Compare as Boolean
                                        onChange={handleInputChange}
                                        onBlur={handleSubmitData}
                                    />
                                    <label htmlFor="true" className="form-check-label">Yes</label>
                                </div>
                                <div className="genderOpt m-1">
                                    <input
                                        type="radio"
                                        id="false"
                                        name="covidDetected"
                                        className="custom-radio"
                                        value={false}  // ✅ Pass Boolean value
                                        checked={profile.covidDetected} // ✅ Compare as Boolean
                                        onChange={handleInputChange}
                                        onBlur={handleSubmitData}
                                    />
                                    <label htmlFor="false" className="form-check-label">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile">
                        <h2 className="mb-3">Workout frequency</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['Do not workout', 'At most 2 times a week', 'At least 3 times a week', 'Other.'].map((option) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name="workoutFrequency"
                                            className="custom-radio"
                                            value={option}
                                            checked={profile.workoutFrequency === option}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                if (e.target.value === "Other") {
                                                    setProfile((prev) => ({ ...prev, customWorkoutFrequency: "" }));
                                                }
                                            }}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Show input only when "other" is selected */}
                            {profile.workoutFrequency === "Other." && (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="customWorkoutFrequency"
                                        placeholder="Please specify"
                                        className="Other-Input"
                                        value={profile.workoutFrequency || ""}
                                        onChange={(e) =>
                                            setProfile((prev) => ({ ...prev, workoutFrequency: e.target.value }))
                                        }
                                    />
                                </div>
                            )}

                            {errors.workoutFrequency && (
                                <div style={{ color: "red", fontSize: "10px", position: "absolute", top: "132px" }}>
                                    {errors.workoutFrequency}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="profile">
                        <h2 className="mb-3">Favorite Workout Format</h2>

                        <div className="row">
                            {[
                                "Yoga",
                                "Cardio/Running/Dance/HIIT",
                                "Gym",
                                "Body weight",
                                "Other",
                            ].map((option, index) => (
                                <div className="d-flex align-items-center my-2" key={index}>
                                    <input
                                        type="checkbox"
                                        id={`favorite-${option}`} // Unique ID for each option
                                        className="custom-checkbox me-3"
                                        value={option}
                                        checked={Array.isArray(profile.favoriteWorkouts) && profile.favoriteWorkouts.includes(option)}
                                        onChange={handleFavoriteWorkoutChange}
                                        onBlur={handleSubmitData}
                                    />
                                    <label htmlFor={`favorite-${option}`} className="custom-label">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {profile.favoriteWorkouts?.includes("Other") && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Please specify"
                                    className="Other-Input"
                                    value={otherFavWorkout}
                                    onChange={handleOtherWorkoutChange}
                                    style={{ height: "50px", padding: "10px" }}
                                />
                            </div>
                        )}

                        {errors.favoriteWorkouts && (
                            <div style={{ color: "red", fontSize: "10px", position: "absolute", top: "72px" }}>
                                {errors.favoriteWorkouts}
                            </div>
                        )}
                    </div>
                    <div className="profile">
                        <h2 className="mb-3">Fitness Goal</h2>

                        {[
                            "Weight loss",
                            "Strengthening & Flexibility",
                            "Fixing health issues",
                            "Fixing routine and lifestyle",
                            "Fixing diet",
                            "Weight gain",
                            "Fixing Sleep Cycle",
                            "Other",
                        ].map((goal, index) => (
                            <div className="d-flex align-items-center my-2" key={index}>
                                <input
                                    type="checkbox"
                                    id={`goal-${goal}`}
                                    className="custom-checkbox me-3"
                                    value={goal}
                                    checked={Array.isArray(profile.fitnessGoals) && profile.fitnessGoals.includes(goal)}
                                    onChange={handleFitnessGoalChange}
                                    onBlur={handleSubmitData}

                                />
                                <label htmlFor={`goal-${goal}`} className="custom-label">
                                    {goal}
                                </label>
                            </div>
                        ))}

                        {/* Show input field when "Other" is selected */}
                        {profile.fitnessGoals?.includes("Other") && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Please specify"
                                    className="Other-Input"
                                    value={otherGoal}
                                    onChange={handleOtherGoalChange}
                                    style={{ height: "50px", padding: "10px" }}
                                />
                            </div>
                        )}
                        {errors.fitnessGoals && (
                            <div style={{ color: "red", fontSize: "10px", position: "absolute", top: "72px" }}>
                                {errors.fitnessGoals}
                            </div>
                        )}
                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>Food Choices</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['Vegetarian', 'Ovo-lacto Vegetarian', 'Non-Vegetarian'].map((option, ind) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option + ind}
                                            name="foodChoice"
                                            value={option}
                                            checked={profile.foodChoice === option}
                                            onChange={handleInputChange}
                                            className='custom-radio'
                                            onBlur={handleSubmitData}

                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option + ind} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.foodChoice && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "102px" }}>
                                    {errors.foodChoice}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="profile">

                        <h2>Any Food Allergies</h2>

                        <div className="input-box mt-4">
                            <input
                                type="text"
                                name="foodAllergies"
                                value={profile.foodAllergies}
                                onChange={handleInputChange}
                                // readOnly={!isEditable}
                                placeholder="Enter Your Answer"

                            />
                            {errors.foodAllergies && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                    {errors.foodAllergies}
                                </div>
                            )}
                        </div>


                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>What is the frequency of egg and non-veg per week</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['EveryDay', '3 times a week', 'Occasionally', 'I am a vegetarian'].map((option) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option + 1}
                                            name="eggAndNonVegFrequency"
                                            value={option}
                                            checked={profile.eggAndNonVegFrequency === option}
                                            onChange={handleInputChange}
                                            className='custom-radio'
                                            onBlur={handleSubmitData}

                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option + 1} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.eggAndNonVegFrequency && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "133px" }}>
                                    {errors.eggAndNonVegFrequency}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>What is the frequency of eating outside/junk/sugar/stress eating</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['EveryDay', '3 times a week', 'Rarely'].map((option) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name="junkSugarStressFrequency"
                                            className='custom-radio'
                                            value={option}
                                            checked={profile.junkSugarStressFrequency === option}
                                            onChange={handleInputChange}
                                            onBlur={handleSubmitData}

                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {/* {openInputs.junkSugarStressFrequency && (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="currentMedication"
                                        placeholder="Please specify"
                                        className="Other-Input"
                                        value={profile.junkSugarStressFrequency === 'Other' ? '' : profile.junkSugarStressFrequency}
                                        onChange={(e) => setProfile((prev) => ({ ...prev, junkSugarStressFrequency: e.target.value }))}

                                    />
                                </div>
                            )} */}
                            {errors.junkSugarStressFrequency && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "132px" }}>
                                    {errors.junkSugarStressFrequency}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>How much water you consume in a day</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['1-2l', '2-3l', 'More than 3 L'].map((option) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name="dailyWaterConsumption"
                                            value={option}
                                            checked={profile.dailyWaterConsumption === option}
                                            onChange={handleInputChange}
                                            className='custom-radio'
                                            onBlur={handleSubmitData}

                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.dailyWaterConsumption && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "100px" }}>
                                    {errors.dailyWaterConsumption}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="profile">
                        <h2 className="mb-3">What beverage do you prefer the most on a daily basis</h2>

                        {[
                            { id: "milk-tea-coffee", label: "Milk/Tea/Coffee (milk base)" },
                            { id: "concoction", label: "Tea/Coffee/Concoction (without milk)" },
                            { id: "cold-drinks", label: "Cold drinks" },
                            { id: "other", label: "Other" },
                        ].map((beverage, index) => (
                            <div className="d-flex align-items-center my-2" key={index}>
                                <input
                                    type="checkbox"
                                    id={`beverage-${beverage.id}`} // Unique ID for each checkbox
                                    className="custom-checkbox me-3"
                                    onBlur={handleSubmitData}
                                    value={beverage.label}
                                    onChange={handleBeverageChange} // Beverage-specific handler
                                    checked={Array.isArray(profile.dailyBeverage) && profile.dailyBeverage.includes(beverage.label)}

                                />
                                <label htmlFor={`beverage-${beverage.id}`} className="custom-label">
                                    {beverage.label}
                                </label>
                            </div>
                        ))}
                        {/* Show input field when "Other" is selected */}
                        {profile.dailyBeverage?.includes("Other") && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Please specify"
                                    className="Other-Input"
                                    value={otherBraverage}
                                    onChange={handleOtherBeverageChange}
                                    style={{ height: "50px", padding: "10px" }}
                                />
                            </div>
                        )}

                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>Do you Smoke</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['EveryDay', 'Occasionally', "No I don't smoke"].map((option) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name="smoke"
                                            value={option}
                                            checked={profile.smoke === option}
                                            onChange={handleInputChange}
                                            className='custom-radio'
                                            onBlur={handleSubmitData}
                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.smoke && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "100px" }}>
                                    {errors.smoke}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>Do you consume Alcohol</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['EveryDay', 'Occasionally', "No I don't drink"].map((option) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name="alcohol"
                                            value={option}
                                            checked={profile.alcohol === option}
                                            onChange={handleInputChange}
                                            className='custom-radio'
                                            onBlur={handleSubmitData}

                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.alcohol && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "100px" }}>
                                    {errors.alcohol}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="profile">
                        <h2>Anything specific would you like us to know</h2>
                        <div className="input-box mt-4">
                            <input
                                type="text"
                                name="personalNotes"
                                value={profile.personalNotes}
                                onChange={handleInputChange}
                                // readOnly={!isEditable}
                                placeholder="Enter Your Answer"
                                onBlur={handleSubmitData}

                            />
                            {errors.personalNotes && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                    {errors.personalNotes}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="profile">
                        <h2>Are you on Instagram? If yes, please share your Instagram Id so that we can tag you in your progress pictures :</h2>
                        <div className="input-box mt-4">
                            <input
                                type="text"
                                name="instagramId"
                                value={profile.instagramId}
                                onChange={handleInputChange}
                                // readOnly={!isEditable}
                                placeholder="Enter Your Answer"
                                onBlur={handleSubmitData}

                            />
                            {errors.instagramId && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                    {errors.instagramId}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>How did you get to know about us?</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['Instagram', 'Facebook', "Influencers", "Friends/ Family/ Acquaintance of Gunj", "others"].map((option) => (
                                    <div className="option m-1 d-flex" key={option}>

                                        <input
                                            type="radio"
                                            id={option}
                                            name="sourceChanel"
                                            value={option}
                                            className='custom-radio'
                                            checked={profile.sourceChanel === option}
                                            onChange={handleInputChange}

                                        />

                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>

                                    </div>
                                ))}
                            </div>
                            {profile.sourceChanel === 'others' && (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="currentMedication"
                                        placeholder="Please specify"
                                        className="Other-Input"
                                        value={profile.sourceChanel === 'Other' ? '' : profile.sourceChanel}
                                        onChange={(e) => setProfile((prev) => ({ ...prev, sourceChanel: e.target.value }))}
                                        onBlur={handleSubmitData}

                                    />
                                </div>
                            )}
                            {errors.sourceChanel && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: '145px' }}>
                                    {errors.sourceChanel}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="profile">
                        <h2>Required Details for your <span>Nutrition Consultation</span></h2>
                        <div className="row">
                            {/* Wake-Up Time */}
                            <div className="col-6">
                                <div className="mt-1">
                                    <label htmlFor="wakeUpTime">Wake-Up Time</label>
                                    <TimePicker
                                        value={profile.wakeUpTime} // Show existing value
                                        onTimeChange={(time) => setProfile((prev) => ({ ...prev, wakeUpTime: time }))}
                                    />
                                </div>
                            </div>

                            {/* Sleep Time */}
                            <div className="col-6">
                                <div className="mt-1">
                                    <label htmlFor="sleepTime">Sleep Time</label>
                                    <TimePicker
                                        value={profile.sleepTime} // Show existing value
                                        onTimeChange={(time) => setProfile((prev) => ({ ...prev, sleepTime: time }))}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="input-box mt-4 ">
                            <label htmlFor="wholeDayRoutine">Your routine from the time you get up to the time you sleep</label>
                            <input
                                type="text"
                                name="wholeDayRoutine"
                                value={profile.wholeDayRoutine}
                                onChange={handleInputChange}
                                placeholder="Enter Your Answer"
                                onBlur={handleSubmitData}

                            />
                            {errors.wholeDayRoutine && (
                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                    {errors.wholeDayRoutine}
                                </div>
                            )}
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-box mt-4">
                                    <label htmlFor="meals">Meal times and what all you eat in meals</label>
                                    <input
                                        type="text"
                                        name="meals"
                                        value={profile.meals}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Answer"
                                        onBlur={handleSubmitData}

                                    />
                                    {errors.meals && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.meals}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="input-box mt-1">
                                    <h6 className='mb-3'>Sleep Quality</h6>
                                    <div className="gender flex-column ">
                                        {['Excellent', 'Good', 'Average', 'Poor', 'Terrible'].map((option) => (
                                            <div className="option m-1 d-flex" key={option}>
                                                <input
                                                    type="radio"
                                                    id={option}
                                                    name="sleepQuality"
                                                    value={option}
                                                    className='custom-radio'
                                                    checked={profile.sleepQuality === option}
                                                    onChange={handleInputChange}
                                                    onBlur={handleSubmitData}

                                                />
                                                <label htmlFor={option} className="form-check-label">
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.sleepQuality && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.sleepQuality}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-box mt-3">
                                    <h6 className='mb-3'>Energy Level</h6>
                                    <div className="gender flex-column ">
                                        {['very-high', 'High', 'moderate', 'Low', 'Very-Low'].map((option) => (
                                            <div className="option m-1 d-flex" key={option}>
                                                <input
                                                    type="radio"
                                                    id={option}
                                                    name="energyLevel"
                                                    className='custom-radio'
                                                    value={option}
                                                    checked={profile.energyLevel === option}
                                                    onChange={handleInputChange}
                                                    onBlur={handleSubmitData}


                                                />
                                                <label htmlFor={option} className="form-check-label">
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.energyLevel && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.energyLevel}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                {showSection && (
                    <section className="floating-price floating" style={{ bottom: "-40px" }}>
                        <div className="green-box m-0" style={{ borderRadius: "0px" }}>
                            <div>
                                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, placeat.</p>F */}
                            </div>
                            <div>
                                <button
                                    className='submit'
                                    onClick={handleSubmitData}
                                    // disabled={Object.values(profile).some(value => value === '' || (Array.isArray(value) && value.length === 0))}
                                    title="Please fill all fields"
                                >
                                    Submit
                                </button>

                                <button
                                    onClick={handleIwilDOLater}
                                    disabled={!profile.occupation || !profile.smoke || !profile.alcohol || !profile.personalNotes || !profile.instagramId}
                                    title="Please fill in Occupation, Smoke, Alcohol, Personal Notes, and Instagram ID"
                                >
                                    I will do this later
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </>

        </div>
    )
}

export default OnboardingRegisterForm