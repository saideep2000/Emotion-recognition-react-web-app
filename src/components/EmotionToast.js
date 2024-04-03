import React from 'react';

const EmotionToast = ({ message }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Replace this with your toast component or keep it simple */}
      <div style={{ backgroundColor: '#000', color: '#fff', padding: '10px', borderRadius: '5px' }}>
        {message}
      </div>
    </div>
  );
};

export default EmotionToast;
