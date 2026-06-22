const { prisma } = require('../config/prisma');

async function getProductsCount() {
    return prisma.produto.count({
        where: { ativo: true }
    });
}

async function getSuppliersCount() {
    return prisma.fornecedor.count();
}

async function getCategoriesCount() {
    return prisma.categoria.count();
}

async function getOutOfStockProductsCount() {
    return prisma.produto.count({
        where: {
            ativo: true,
            quantidadeAtual: 0
        }
    });
}

async function getStockStatusCounts() {
    // Retorna produtos em estoque normal (quantidade_atual > quantidade_minima)
    const emEstoqueRows = await prisma.$queryRaw`
        SELECT COUNT(*)::int as count 
        FROM produtos 
        WHERE ativo = true AND quantidade_atual > quantidade_minima
    `;

    // Retorna produtos com estoque baixo (quantidade_atual > 0 e quantidade_atual <= quantidade_minima)
    const estoqueBaixoRows = await prisma.$queryRaw`
        SELECT COUNT(*)::int as count 
        FROM produtos 
        WHERE ativo = true AND quantidade_atual > 0 AND quantidade_atual <= quantidade_minima
    `;

    return {
        emEstoque: emEstoqueRows[0]?.count || 0,
        estoqueBaixo: estoqueBaixoRows[0]?.count || 0
    };
}

async function getItemsToReceiveCount() {
    const sumResult = await prisma.movimentacaoItem.aggregate({
        _sum: {
            quantidade: true
        },
        where: {
            movimentacao: {
                tipo: 'ENTRADA',
                status: {
                    not: 'RECEBIDO'
                }
            }
        }
    });

    return sumResult._sum.quantidade || 0;
}

async function getFinancialSummary() {
    const rows = await prisma.$queryRaw`
        SELECT 
            COALESCE(SUM(quantidade_atual * preco_venda), 0)::float as valor_total_estoque,
            COALESCE(SUM(quantidade_atual * preco_compra), 0)::float as custo_total
        FROM produtos 
        WHERE ativo = true
    `;

    return rows[0] || { valor_total_estoque: 0, custo_total: 0 };
}

async function getMovementsChartData() {
    return prisma.$queryRaw`
        SELECT 
            TO_CHAR(m.data_movimentacao, 'YYYY-MM-DD') as dia,
            m.tipo,
            SUM(mi.quantidade)::int as total_quantidade
        FROM movimentacoes m
        JOIN movimentacao_itens mi ON m.id = mi.movimentacao_id
        WHERE m.data_movimentacao >= NOW() - INTERVAL '30 days'
        GROUP BY dia, m.tipo
        ORDER BY dia ASC
    `;
}

async function getTopProductsData() {
    return prisma.$queryRaw`
        SELECT 
            p.nome, 
            SUM(mi.quantidade)::int as total_movimentado
        FROM movimentacao_itens mi
        JOIN produtos p ON mi.produto_id = p.id
        JOIN movimentacoes m ON mi.movimentacao_id = m.id
        WHERE m.status IN ('RECEBIDO', 'ENTREGUE')
        GROUP BY p.id, p.nome
        ORDER BY total_movimentado DESC
        LIMIT 5
    `;
}

module.exports = {
    getProductsCount,
    getSuppliersCount,
    getCategoriesCount,
    getOutOfStockProductsCount,
    getStockStatusCounts,
    getItemsToReceiveCount,
    getFinancialSummary,
    getMovementsChartData,
    getTopProductsData
};
