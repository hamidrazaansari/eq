import React, { useState } from 'react'
import '../assets/css/process.css';
import '../assets/css/onboarding.css';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { MonthPicker, MonthInput } from 'react-lite-month-picker';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import PhoneNumberInput from './PhoneNumberInput';



function OnboardingRegisterForm() {
    const [selectedMonthData, setSelectedMonthData] = useState({
        month: 9,
        year: 2023,
    });
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [countryCode, setCountryCode] = useState(false);

    const location = useLocation();

    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    console.log(id);

    const [profile, setProfile] = useState({
        booking: id,
        firstName: '',
        lastName: '',
        email: '',
        countryCode: "+91",
        mobile: '',
        firstJoiningMonthYear: '2020-12',
        height: '',
        weightAtJoining: '',
        currentWeight: '',
        occupation: '',
        gender: '',
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
    });


const handleCountryCodeChange = (e) =>{
console.log(e.target.value);

}
    console.log(countryCode);

    // Handle input changes for all fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'covidDetected') {
            setProfile((prevProfile) => ({
                ...prevProfile,
                [name]: value === 'Yes' ? 'true' : value === 'No' ? 'false' : value // Handles boolean values explicitly
            }));
        }
        else {
            setProfile((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }


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
            preferences: checked
                ? [...prev.preferences, value] // Add to preferences if checked
                : prev.preferences.filter((preference) => preference !== value), // Remove if unchecked
        }));
    };
    const handleCheckboxChange2 = (event) => {
        const { checked, value } = event.target;


        setProfile((prev) => ({
            ...prev,
            favoriteWorkouts: checked
                ? [...prev.favoriteWorkouts, value] // Add to preferences if checked
                : prev.favoriteWorkouts.filter((favoriteWorkouts) => favoriteWorkouts !== value), // Remove if unchecked
        }));
    };

    const handleFitnessGoalChange = (event) => {
        const { checked, value } = event.target;

        setProfile((prev) => ({
            ...prev,
            fitnessGoals: checked
                ? [...prev.fitnessGoals, value] // Add to fitnessGoals if checked
                : prev.fitnessGoals.filter((goal) => goal !== value), // Remove if unchecked
        }));
    };

    const handleBeverageChange = (event) => {
        const { checked, value } = event.target;

        setProfile((prev) => ({
            ...prev,
            dailyBeverage: checked
                ? [...prev.dailyBeverage, value] // Add selected beverage
                : prev.dailyBeverage.filter((dailyBeverage) => dailyBeverage !== value), // Remove deselected beverage
        }));
    };


    const token = localStorage.getItem('authToken');

    const handleSubmitData = async (e) => {
        e.preventDefault();

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
            console.log(resp);
            if (resp.status === 200) {
                toast.success('Form Submitted')
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='onboarding-register-form'>
            <ToastContainer />
            <div className="item-container welcome-onboard">
                <div className="container mt-5">
                    <div className="process-heading  mt-5">
                        <h2 className="mb-3">Please fill the registration form, <span style={{ color: "#006d5a" }}>it will take just a minute.</span></h2>
                    </div>
                    <div className="profile">
                        <h2>Basic Info</h2>
                        <div className="row mt-5">
                            {/* First Name */}
                            <div className="col-6">
                                <div className="input-box">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={profile.firstName}
                                        onChange={handleInputNameChange}
                                        placeholder="Enter First Name"
                                    />
                                </div>
                            </div>
                            {/* Last Name */}
                            <div className="col-6">
                                <div className="input-box">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={profile.lastName}
                                        onChange={handleInputNameChange}
                                        placeholder="Enter Last Name"
                                    />
                                </div>
                            </div>
                            {/* Email */}
                            <div className="col-6">
                                <div className="input-box">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Email"
                                    />
                                </div>
                            </div>
                            {/* Country Code and Mobile */}
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-4">
                                    <div className="input-box">
                                    <label htmlFor="mobile">CountryCode</label>
                                        <PhoneNumberInput/>
                                        </div>
                                    </div>
               

                                    <div className="col-8">
                                        <div className="input-box">
                                            <label htmlFor="mobile">Mobile Number</label>
                                            <input
                                                type="text"
                                                id="mobile"
                                                name="mobile"
                                                value={profile.mobile}
                                                onChange={handleInputNumChange}
                                                placeholder="Enter Mobile Number"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Joining Date */}
                            <div className="col-6">
                                <div className="input-box">
                                    <label htmlFor="joiningDate">Month-Year of Joining EQ for the first time</label>
                                    <div className='mt-3'>
                                        <MonthInput
                                            selected={selectedMonthData}
                                            setShowMonthPicker={setIsPickerOpen}
                                            showMonthPicker={isPickerOpen}
                                        />
                                        {isPickerOpen ? (
                                            <MonthPicker
                                                setIsOpen={setIsPickerOpen}
                                                selected={selectedMonthData}
                                                onChange={setSelectedMonthData}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            {/* Height */}
                            <div className="col-6">
                                <div className="input-box">
                                    <label htmlFor="height">Height (Ft)</label>
                                    <input
                                        type="text"
                                        id="height"
                                        name="height"
                                        value={profile.height}
                                        onChange={handleInputNumChange}
                                        placeholder="Enter your Height in (ft)"
                                    />
                                </div>
                            </div>
                            {/* Initial Weight */}
                            <div className="col-6">
                                <div className="input-box">
                                    <label htmlFor="weightAtJoining">Weight (kg) at the time of joining EQ</label>
                                    <input
                                        type="text"
                                        id="weightAtJoining"
                                        name="weightAtJoining"
                                        value={profile.weightAtJoining}
                                        onChange={handleInputNumChange}
                                        placeholder="Enter Your Weight (kg)"
                                    />
                                </div>
                            </div>
                            {/* Current Weight */}
                            <div className="col-6">
                                <div className="input-box">
                                    <label htmlFor="currentWeight">Current weight (kg)</label>
                                    <input
                                        type="text"
                                        id="currentWeight"
                                        name="currentWeight"
                                        value={profile.currentWeight}
                                        onChange={handleInputNumChange}
                                        placeholder="Enter Your Current Weight (kg)"
                                    />
                                </div>
                            </div>
                            {/* Occupation */}
                            <div className="col-6">
                                <div className="input-box">
                                    <label htmlFor="occupation">Occupation</label>
                                    <input
                                        type="text"
                                        id="occupation"
                                        name="occupation"
                                        value={profile.occupation}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            {/* Gender */}
                            <div className="col-6">
                                <div className="input-box">
                                    <h6>Gender</h6>
                                    <div className="gender">
                                        {['MALE', 'FEMALE'].map((option) => (
                                            <div className="genderOpt" key={option}>
                                                <input
                                                    type="radio"
                                                    id={option}
                                                    name="gender"
                                                    value={option}
                                                    checked={profile.gender === option}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor={option} className="form-check-label">
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile">
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
                                    />
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
                            />
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
                        </div>

                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>Were you ever detected with Covid</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['Yes', 'No'].map((option) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name="covidDetected"
                                            value={option}
                                            checked={profile.covidDetected === (option === 'Yes')} onChange={handleInputChange}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>Workout frequency</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['Do not workout', 'At most 2 times a week', 'At least 3 times a week', 'Other'].map((option) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name="workoutFrequency"
                                            value={option}
                                            checked={profile.workoutFrequency === option}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
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
                                        id={`favorite-${index}`}  // Changed to differentiate IDs for better clarity
                                        className="custom-checkbox me-3"
                                        value={option}
                                        onChange={handleCheckboxChange2}  // Using the second handler for favoriteWorkouts
                                    />
                                    <label htmlFor={`favorite-${index}`} className="custom-label">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
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
                                    id={`goal-${goal}`}  // Unique ID for each goal
                                    className="custom-checkbox me-3"
                                    value={goal}
                                    onChange={handleFitnessGoalChange}  // Using the handler for fitness goals
                                />
                                <label htmlFor={`goal-${goal}`} className="custom-label">
                                    {goal}
                                </label>
                            </div>
                        ))}
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
                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option + ind} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
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
                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option + 1} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="profile">

                        <h2 className='mb-3'>What is the frequency of eating outside/junk/sugar/stress eating</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['EveryDay', '3 times a week', 'Rarely', 'Other'].map((option) => (
                                    <div className="genderOpt m-1" key={option}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name="junkSugarStressFrequency"
                                            value={option}
                                            checked={profile.junkSugarStressFrequency === option}
                                            onChange={handleInputChange}
                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
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
                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
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
                                    value={beverage.label}
                                    onChange={handleBeverageChange} // Beverage-specific handler
                                />
                                <label htmlFor={`beverage-${beverage.id}`} className="custom-label">
                                    {beverage.label}
                                </label>
                            </div>
                        ))}
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
                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
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
                                        // disabled={!isEditable}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
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
                            />
                        </div>
                    </div>
                    <div className="profile">
                        <h2>Are you on Instagram? If yes, please share your Instagram Id so that we can tag you in your progress pictures :)</h2>
                        <div className="input-box mt-4">
                            <input
                                type="text"
                                name="instagramId"
                                value={profile.instagramId}
                                onChange={handleInputChange}
                                // readOnly={!isEditable}
                                placeholder="Enter Your Answer"
                            />
                        </div>
                    </div>

                    <div className="profile">

                        <h2 className='mb-3'>How did you get to know about us?</h2>
                        <div className="d-flex align-items-center my-2">
                            <input
                                type="checkbox"
                                id="Instagram"
                                className="custom-checkbox me-3"
                            // checked={isSubscribed}
                            // onChange={handleSubscriptionChange}
                            />
                            <label htmlFor="Instagram" className="custom-label">
                                Instagram
                            </label>
                        </div>
                        <div className="d-flex align-items-center my-2">
                            <input
                                type="checkbox"
                                id="Facebook"
                                className="custom-checkbox me-3"
                            // checked={isSubscribed}
                            // onChange={handleSubscriptionChange}
                            />
                            <label htmlFor="Facebook" className="custom-label">
                                Facebook
                            </label>
                        </div>
                        <div className="d-flex align-items-center my-2">
                            <input
                                type="checkbox"
                                id="Influencers"
                                className="custom-checkbox me-3"
                            // checked={isSubscribed}
                            // onChange={handleSubscriptionChange}
                            />
                            <label htmlFor="Influencers" className="custom-label">
                                Influencers
                            </label>
                        </div>
                        <div className="d-flex align-items-center my-2">
                            <input
                                type="checkbox"
                                id="Acquaintance"
                                className="custom-checkbox me-3"
                            // checked={isSubscribed}
                            // onChange={handleSubscriptionChange}
                            />
                            <label htmlFor="Acquaintance" className="custom-label">
                                Friends/ Family/ Acquaintance of Gunj
                            </label>
                        </div>
                        <div className="d-flex align-items-center my-2">
                            <input
                                type="checkbox"
                                id="Other4"
                                className="custom-checkbox me-3"
                            // checked={isSubscribed}
                            // onChange={handleSubscriptionChange}
                            />
                            <label htmlFor="Other4" className="custom-label">
                                Other
                            </label>
                        </div>
                    </div>

                    <div className="profile">

                        <h2 className='mb-3'>How did you get to know about us?</h2>
                        <div className="input-box">
                            <div className="d-flex align-items-start justify-content-start flex-column">
                                {['Instagram', 'Facebook', "Influencers", "Friends/ Family/ Acquaintance of Gunj", "Other"].map((option) => (
                                    <div className="option m-1 d-flex" key={option}>

                                        <input
                                            type="radio"
                                            id={option}
                                            name="sourceChanel"
                                            value={option}
                                            checked={profile.sourceChanel === option}
                                            onChange={handleInputChange}
                                        />

                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>

                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <button type='submit' className='submit-btn' onClick={handleSubmitData}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default OnboardingRegisterForm