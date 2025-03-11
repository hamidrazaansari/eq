import React, { useState, useEffect } from 'react'
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';

function Calendally({ url, handleGoToNextStep , currentItemId , currentItemIsComp }) {
    const [profile, setProfile] = useState('')

    const token = localStorage.getItem('authToken');

    // Fetch profile data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${API_URL}/users/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setProfile(response.data.body);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        fetchData();
    }, [token]);


    useCalendlyEventListener({
        onProfilePageViewed: (e) =>
            console.log("onProfilePageViewed", e.data.payload),
        onDateAndTimeSelected: (e) => console.log("onDateAndTimeSelected", e),
        onEventTypeViewed: (e) => console.log("onEventTypeViewed", e.data.payload),
        onEventScheduled: (e) => handleGoToNextStep(currentItemId , currentItemIsComp),
        // onPageHeightResize: (e) => console.log(e.data.payload.height),
    });
    return (
        <div>
            <InlineWidget
                pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: '006D5A',
                    textColor: '006D5A'
                }}
                url={url}

                prefill={{
                    email: profile.email,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    name: profile.firstName + '' + profile.lastName,
                    smsReminderNumber: "+1234567890",
                    
                }}

            />
        </div>
    )
}

export default Calendally