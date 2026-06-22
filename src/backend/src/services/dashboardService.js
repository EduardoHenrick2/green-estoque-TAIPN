const dashboardRepository = require('../repositories/dashboardRepository');
const { formatChartData, formatTopProducts } = require('../models/dashboardModel');

async function getSummary() {
    const [
        total_produtos,
        total_fornecedores,
        total_categorias,
        produtos_sem_estoque,
        stockStatus,
        itens_a_receber,
        financeiro
    ] = await Promise.all([
        dashboardRepository.getProductsCount(),
        dashboardRepository.getSuppliersCount(),
        dashboardRepository.getCategoriesCount(),
        dashboardRepository.getOutOfStockProductsCount(),
        dashboardRepository.getStockStatusCounts(),
        dashboardRepository.getItemsToReceiveCount(),
        dashboardRepository.getFinancialSummary()
    ]);

    const valor_total_estoque = financeiro.valor_total_estoque;
    const custo_total = financeiro.custo_total;
    const lucro_estimado = valor_total_estoque - custo_total;

    return {
        totais: {
            produtos: total_produtos,
            fornecedores: total_fornecedores,
            categorias: total_categorias
        },
        estoque: {
            em_estoque: stockStatus.emEstoque,
            sem_estoque: produtos_sem_estoque,
            estoque_baixo: stockStatus.estoqueBaixo,
            itens_a_receber
        },
        financeiro: {
            valor_total_estoque,
            custo_total,
            lucro_estimado
        }
    };
}

async function getMovementsChart() {
    const rows = await dashboardRepository.getMovementsChartData();
    return formatChartData(rows);
}

async function getTopProducts() {
    const rows = await dashboardRepository.getTopProductsData();
    return formatTopProducts(rows);
}

module.exports = {
    getSummary,
    getMovementsChart,
    getTopProducts
};
