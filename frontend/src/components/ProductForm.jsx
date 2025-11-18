// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const ProductForm = ({ existingProduct, onSuccess, onCancel }) => {
  const [name, setName] = useState(existingProduct?.name || '');
  const [price, setPrice] = useState(existingProduct?.price || '');
  const [isAvailable, setIsAvailable] = useState(
    existingProduct?.isAvailable || true
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { name, price: parseFloat(price), isAvailable };
      if (existingProduct) {
        // Update product
        await API.put(`/products/${existingProduct._id}`, formData);
      } else {
        // Create new product
        await API.post('/products', formData);
      }
      onSuccess(); // refresh dashboard
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Product name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type='number'
        placeholder='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <label>
        <input
          type='checkbox'
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
        Available
      </label>
      <button type='submit'>{existingProduct ? 'Update' : 'Create'}</button>
      {onCancel && (
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ProductForm;
