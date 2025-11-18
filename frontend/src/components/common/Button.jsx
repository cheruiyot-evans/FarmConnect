import React from 'react';

const Button = ({ label, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition'
    >
      {label}
    </button>
  );
};

export default Button;
