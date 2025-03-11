import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function CountryCode({ CountryCodeChange, defaultCountryCode }) {
  const [phone, setPhone] = useState(defaultCountryCode || "us"); // Default to 'us' if not provided

  useEffect(() => {
    if (defaultCountryCode) {
      setPhone(defaultCountryCode);
    }
  }, [defaultCountryCode]); // Update when defaultCountryCode changes

  const handleCountryCodeChange = (code) => {
    setPhone(code);
    setTimeout(() => {
      CountryCodeChange(code);
    }, 100); // Ensure state update before submitting
  };

  return (
    <PhoneInput
      country={phone} // Set the default country
      enableSearch={true}
      value={phone}
      onChange={handleCountryCodeChange}
    />
  );
}
