import api from './api';

export const getAllOrders = () => api.get('/admin/orders');

export const updateOrderStatus = (id, status) => api.patch(`/admin/orders/${id}`, { status });

export const deleteOrder = (id) => api.delete(`/admin/orders/${id}`);
