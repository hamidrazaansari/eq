import React, { useState } from "react";
import Select from "react-select";

const countryCodes = [
  { code: "+91", country: "India", label: "+91 IN" },
  { code: "+1", country: "United States", label: "+1 US" },
  { code: "+44", country: "United Kingdom", label: "+44 UK" },
  { code: "+61", country: "Australia", label: "+61 AU" },
  { code: "+81", country: "Japan", label: "+81 JP" },
  { code: "+49", country: "Germany", label: "+49 DE" },
  { code: "+86", country: "China", label: "+86 CN" },
  { code: "+33", country: "France", label: "+33 FR" },
  { code: "+39", country: "Italy", label: "+39 IT" },
  { code: "+55", country: "Brazil", label: "+55 BR" },
];

const PhoneNumberInput = ({ onCodeChange }) => {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0]); // Default to the first option

  const handleCodeChange = (selectedOption) => {
    setSelectedCode(selectedOption); // Update state with the full object
    onCodeChange(selectedOption.code); // Pass only the code to the parent
  };

  return (
    <form>
      <div>
        <Select
          className="mt-2"
          options={countryCodes}
          value={selectedCode} // Pass the full selected object
          onChange={handleCodeChange}
          placeholder="Select country code"
          getOptionLabel={(e) => `${e.label}`} // Optional customization of the dropdown label
        />
      </div>
    </form>
  );
};

export default PhoneNumberInput;
