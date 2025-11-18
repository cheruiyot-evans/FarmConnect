import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const SelectRole = () => {
  const navigate = useNavigate();

  const chooseRole = async (role) => {
    try {
      await api.post('/auth/select-role', { role });

      localStorage.setItem('role', role);

      if (role === 'farmer') navigate('/farmer/dashboard');
      else navigate('/buyer/dashboard');
    } catch (err) {
      alert('Failed to update role');
    }
  };

  return (
    <div>
      <h2>Select Role</h2>

      <button onClick={() => chooseRole('farmer')}>I'm a Farmer</button>
      <button onClick={() => chooseRole('buyer')}>I'm a Buyer</button>
    </div>
  );
};

export default SelectRole;
