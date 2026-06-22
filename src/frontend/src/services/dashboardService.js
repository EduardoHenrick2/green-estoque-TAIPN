import api from '../api/api';

export const dashboardService = {
    // Retorna: { totais: { produtos, fornecedores, categorias }, estoque: { em_estoque, sem_estoque, estoque_baixo, itens_a_receber }, financeiro: { valor_total_estoque, custo_total, lucro_estimado } }
    getSummary: async () => {
        const response = await api.get('/dashboard/summary');
        return response.data;
    },

    // Retorna: array de { dia, ENTRADA, SAIDA, RETORNO, AJUSTE }
    getMovementsChart: async () => {
        const response = await api.get('/dashboard/movements-chart');
        return response.data;
    },

    // Retorna: array de { nome, movimentacoes }
    getTopProducts: async () => {
        const response = await api.get('/dashboard/top-products');
        return response.data;
    }
};
