const dashboardService = require('../services/dashboardService');

function handleError(res, error, defaultMessage) {
    console.error(defaultMessage, error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        error: error.message || 'Erro interno no servidor.'
    });
}

async function getSummary(req, res) {
    try {
        const summary = await dashboardService.getSummary();
        return res.json(summary);
    } catch (error) {
        return handleError(res, error, 'Erro ao buscar resumo do dashboard:');
    }
}

async function getMovementsChart(req, res) {
    try {
        const chartData = await dashboardService.getMovementsChart();
        return res.json(chartData);
    } catch (error) {
        return handleError(res, error, 'Erro ao buscar gráfico de movimentações:');
    }
}

async function getTopProducts(req, res) {
    try {
        const topProducts = await dashboardService.getTopProducts();
        return res.json(topProducts);
    } catch (error) {
        return handleError(res, error, 'Erro ao buscar produtos mais movimentados:');
    }
}

module.exports = {
    getSummary,
    getMovementsChart,
    getTopProducts
};
