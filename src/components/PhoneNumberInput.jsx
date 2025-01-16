import React, { useState } from "react";
import Select  from "react-select";

const countryCodes = [
    { code: "+1", country: "United States", label: "+1 US" },
    { code: "+91", country: "India", label: "+91 IN" },
    { code: "+44", country: "United Kingdom", label: "+44 UK" },
    { code: "+61", country: "Australia", label: "+61 AU" },
    { code: "+81", country: "Japan", label: "+81 JP" },
    { code: "+49", country: "Germany", label: "+49 DE" },
    { code: "+86", country: "China", label: "+86 CN" },
    { code: "+33", country: "France", label: "+33 FR" },
    { code: "+39", country: "Italy", label: "+39 IT" },
    { code: "+55", country: "Brazil", label: "+55 BR" },
    // Add more as needed
  ];

const PhoneNumberInput = () => {
  const [selectedCode, setSelectedCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCodeChange = (value) => {
    setSelectedCode(value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Phone Number: ${selectedCode} ${phoneNumber}`);
  };

  return (
    <form>
      <div>
      <Select
            className="mt-2"
          options={countryCodes}
          value={selectedCode}
          onChange={handleCodeChange}
          placeholder="+91"
    
        />

      </div>
    </form>
  );
};

export default PhoneNumberInput;
