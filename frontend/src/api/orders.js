import API from './axios';

export const createOrder = (order) => API.post('/orders', order);
export const getBuyerOrders = () => API.get('/orders/buyer');
export const getFarmerOrders = () => API.get('/orders/farmer');
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}/status`, { status });
