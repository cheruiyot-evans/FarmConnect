import React from 'react';

const RoleCard = ({ role, description, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className='border rounded-xl p-6 cursor-pointer hover:shadow-lg transition bg-white'
    >
      <h3 className='text-xl font-semibold mb-2'>{role}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};

export default RoleCard;
