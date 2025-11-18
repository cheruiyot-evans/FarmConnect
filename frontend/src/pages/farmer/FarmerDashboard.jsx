// src/pages/farmer/FarmerDashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../../utils/api';
import ProductForm from '../../components/ProductForm';

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products/my');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    try {
      await API.delete(`/products/${productId}`);
      fetchProducts(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Farmer Dashboard</h1>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add Product</button>
      )}
      {showForm && (
        <ProductForm
          existingProduct={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} -{' '}
            {product.isAvailable ? 'Available' : 'Unavailable'}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmerDashboard;
