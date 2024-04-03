import React, { useState } from 'react';

const Submit = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    // Logic to handle submission goes here
    console.log('Option submitted:', selectedOption);
    // Perform action with the selectedOption state
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div>
        <select onChange={handleDropdownChange} style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}>
          <option value="">Select the Model</option>
          <option value="option1">SVM</option>
          <option value="option2">MobileNet</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit} style={{ padding: '10px', fontSize: '16px' }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Submit;
