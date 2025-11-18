import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder }) => {
  return (
    <div className='w-full mb-4'>
      <label className='block text-sm font-medium mb-1'>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600'
      />
    </div>
  );
};

export default Input;
