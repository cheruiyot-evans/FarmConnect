import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    try {
      const res = await api.post('/auth/register', form);

      localStorage.setItem('token', res.data.token);

      navigate('/select-role');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type='text'
        placeholder='Name'
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type='email'
        placeholder='Email'
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type='password'
        placeholder='Password'
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
