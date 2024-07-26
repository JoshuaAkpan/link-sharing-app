import React from 'react';

interface CustomToastProps {
  icon: React.ReactNode;
  text: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ icon, text }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 24px',
        background: '#333333',
        color: '#FAFAFA',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ marginRight: '8px' }}>{icon}</div>
      <div>{text}</div>
    </div>
  );
};

export default CustomToast;
