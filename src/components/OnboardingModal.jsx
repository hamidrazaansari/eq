import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OnboardingProcess from "../Pages/OnboardingProces";

const OnboardingModal = ({ apiData , handleNeedRefresh }) => {
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    // Check if any value in the array is false
    if (apiData.onboardingSteps?.some((value) => value.isCompleted === false)) {
      setShowModal(true);
    }

    
  }, [apiData]);


  
  const handleClose = () => setShowModal(false);

  return (
    <div className="onboarding-modal">
      <h1>Boolean Array Checker</h1>
      <Modal className="onboarding-modal" show={showModal}>
        <OnboardingProcess apiData={apiData.onboardingSteps} handleNeedRefresh={handleNeedRefresh} programId={apiData._id} handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default OnboardingModal;
