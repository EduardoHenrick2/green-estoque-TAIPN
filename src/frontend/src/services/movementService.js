import api from '../api/api';

export const movementService = {
    getAll: async () => {
        const response = await api.get('/movements');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/movements', data);
        return response.data;
    }
    // Movimentações não costumam ter update/delete para manter rastreabilidade e log íntegro de estoque.
};
