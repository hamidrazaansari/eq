import React, { useState, useEffect } from 'react';
import '../assets/css/process.css';
import '../assets/css/onboarding.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import parse from 'html-react-parser';
import Calendally from '../components/Calendally';
const OnboardingProcess = ({ apiData: myData = [], programId, handleNeedRefresh, handleClose }) => {
    const [step, setStep] = useState(0);
    const token = localStorage.getItem('authToken');
    const [apiData, setApiData] = useState(myData)
    const [currentItem, setCurrentItem] = useState(null)
    const [currenIndex, setCurrentIndex] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)


    const { id } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        let s = 0;
        for (let i = 0; i < apiData.length; i++) {
            if (apiData[i].isCompleted === true) {
                s = i + 1;
            }
        }
        setStep(s);
        setCurrentItem(apiData[s])
        setCurrentIndex(s)
    }, [apiData]);
    // useEffect(()=>{
    //     setData(apiData)
    // },[apiData])

    const handleBackToPrevStep = () => {
        if (currenIndex > 0) {
            setCurrentItem(apiData[currenIndex - 1])
            setCurrentIndex((prev) => prev - 1)
        }

    }
    const handleNextStep = () => {
        if (currenIndex < step) {
            setCurrentItem(apiData[currenIndex + 1])
            setCurrentIndex((prev) => prev + 1)
        }
    }


    const handleGoToNextStep = async (id, isCompleted) => {
        try {
            const response = await axios.put(`${API_URL}/bookings/myBookings/updateOnboardingStep/${programId}`, {
                stepId: id,
                isCompleted: true,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log(response.data);
            setApiData(response.data?.body?.onboardingSteps);

            setStep((prevStep) => prevStep + 1);
            setCurrentItem(response.data?.body?.onboardingSteps[step])



            // handleNeedRefresh()
        } catch (error) {
            console.error('Error updating onboarding step:', error);
        }
    };


    useEffect(() => {
        if (step >= apiData.length) {
            handleClose()
        }

    }, [step, apiData]);


    const handleDownload = async (e, url) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        try {
            // Extract the file ID dynamically
            const match = url.match(/\/d\/(.+?)\//);
            const fileId = match ? match[1] : null;

            if (fileId) {
                const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

                // Create a temporary anchor element
                const a = document.createElement("a");
                a.href = downloadUrl;
                a.setAttribute("download", ""); // Instructs browser to download
                document.body.appendChild(a);
                a.click(); // Trigger download
                document.body.removeChild(a); // Clean up
            } else {
                console.error("Invalid Google Drive URL");
            }
        } catch (error) {
            console.error("Error downloading file:", error);
        } finally {
            setTimeout(() => setIsLoading(false), 2000); // Stop loading after delay
        }
    };

    console.log(apiData);
    

    return (
        <div className="process-page">
            {currentItem && (
                <div className="step1">
                    <div className="container">
                        <div className="process-header">
                            <div className="row mt-3 px-5 onboarding">
                                {apiData.map((item, ind) => (
                                    <div key={ind} className="col">
                                        <div className={`step ${item.isCompleted === true ? 'active-step' : ''}`}>
                                            <p>{ind + 1}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="item-container welcome-onboard">
                        <div className="container mt-5">
                            <div className="process-heading mt-5">
                                <h2 className="mb-2">{currentItem.title}</h2>
                                {/* <p className="text-center mb-0">
                                    Please go through the onboarding document and let me know for any questions
                                </p> */}
                                <p className="text-center">{parse(currentItem.content)}</p>
                            </div>

                            <div className="row mx-auto d-flex align-items-center justify-content-center px-md-5 px-0">
                                <div className="d-flex align-items-center justify-content-center flex-lg-row flex-column">
                                    {currentItem.linkUrl?.includes('calendly.com') ? (
                                        <div className='w-100'>
                                            <Calendally
                                                url={currentItem.linkUrl}
                                                handleGoToNextStep={handleGoToNextStep}
                                                currentItemId={currentItem._id}
                                                currentItemIsComp={currentItem.isCompleted}
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            {currentItem.isDownloadable === 'true' ? (
                                                <Link className="button d-flex align-items-center justify-content-center" onClick={(e) => handleDownload(e, currentItem.linkUrl)}>
                                                    {currentItem.linkText}
                                                    {isLoading ? <div class="spinner-border text-light ms-3 spinner-border-sm" role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </div> : ''}
                                                </Link>
                                            ) : currentItem.linkText ? (
                                                <Link className="button" to={`${currentItem.linkUrl}?id=${id}`}>
                                                    {currentItem.linkText}
                                                </Link>
                                            ) : null}

                                            {currentItem?.submitButtonText && (
                                                <button
                                                    className="outline button"
                                                    onClick={() => handleGoToNextStep(currentItem._id, currentItem.isCompleted)}
                                                >
                                                    {currentItem.submitButtonText}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="process-footer">
                        <div className="container">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    {currenIndex <= 0 ? '' : <button className='back float-left' onClick={handleBackToPrevStep}>Back</button>}
                                </div>
                                <div>
                                    {currenIndex < step ? <button className='back float-left' onClick={handleNextStep}>Next</button> : ''}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OnboardingProcess;
