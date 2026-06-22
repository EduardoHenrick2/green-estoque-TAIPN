function formatChartData(rows) {
    const chartDataMap = {};
    for (const row of rows) {
        if (!chartDataMap[row.dia]) {
            chartDataMap[row.dia] = { dia: row.dia, ENTRADA: 0, SAIDA: 0, RETORNO: 0, AJUSTE: 0 };
        }
        chartDataMap[row.dia][row.tipo] = Number(row.total_quantidade);
    }
    return Object.values(chartDataMap);
}

function formatTopProducts(rows) {
    return rows.map(r => ({
        nome: r.nome,
        movimentacoes: Number(r.total_movimentado)
    }));
}

module.exports = {
    formatChartData,
    formatTopProducts
};
