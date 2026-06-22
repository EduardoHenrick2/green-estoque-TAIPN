import api from '../api/api';

export const productService = {
    getAll: async (params) => {
        // params: { nome, sku, categoria, marca, disponibilidade }
        const response = await api.get('/products', { params });
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/products', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    }
};
