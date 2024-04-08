import React, { useState, useImperativeHandle } from 'react';
import './style.css';

const CustomInput = React.forwardRef(({ type, placeholder, name, onChange }, ref) => {
  // State to track the value of the input and error status
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  // Function to reset input value and error state
  const resetInput = () => {
    setValue('');
    setError(false);
  };

  // Function to handle changes in the input value
  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Check for invalid characters
    if (/['";\\(){}[\]<>=%$&^`?!+|-]/.test(inputValue)) {
      setError(true); // Set error to true if an invalid character is entered
      setTimeout(() => setError(false), 1000); // Reset error state after 1000 milliseconds (1 second)
      return; // Prevent further input if an invalid character is entered
    } else {
      setError(false); // Reset error to false if no invalid character is entered
    }
    setValue(inputValue);

    // Update the input value
    if (onChange) {
      onChange(e);
    }
  };

  // Expose resetInput function to parent component through ref
  useImperativeHandle(ref, () => ({
    resetInput
  }));

  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      name={name}
      className={error ? "custom-input invalid" : "custom-input"} // Apply "invalid" class if error is true
    />
  );
});

export default CustomInput;
