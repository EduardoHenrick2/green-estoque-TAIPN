const calculateAvailability = require('../utils/calculateAvailability');

function toNumber(value, defaultValue = 0) {
    if (value === undefined || value === null || value === '') {
        return defaultValue;
    }

    return Number(value);
}

function toNullableNumber(value) {
    if (value === undefined || value === null || value === '') {
        return null;
    }

    return Number(value);
}

function buildProductPayload(data) {
    return {
        nome: data.nome,
        sku: data.sku,
        categoriaId: Number(data.categoria_id),
        descricao: data.descricao || null,
        marca: data.marca || null,
        potenciaW: toNullableNumber(data.potencia_w),
        dimensoes: data.dimensoes || null,
        precoCompra: toNumber(data.preco_compra, 0),
        precoVenda: toNumber(data.preco_venda, 0),
        quantidadeAtual: toNumber(data.quantidade_atual, 0),
        quantidadeMinima: toNumber(data.quantidade_minima, 5),
        validade: data.validade ? new Date(data.validade) : null,
        imagemUrl: data.imagem_url || null
    };
}

function formatProductResponse(product) {
    const availabilityStatus = calculateAvailability(
        product.quantidadeAtual,
        product.quantidadeMinima
    );

    return {
        id: product.id,
        categoria_id: product.categoriaId,
        categoria_nome: product.categoria?.nome || null,
        sku: product.sku,
        nome: product.nome,
        descricao: product.descricao,
        marca: product.marca,
        potencia_w: product.potenciaW,
        dimensoes: product.dimensoes,
        preco_compra: product.precoCompra ? Number(product.precoCompra) : 0,
        preco_venda: product.precoVenda ? Number(product.precoVenda) : 0,
        quantidade_atual: product.quantidadeAtual,
        quantidade_minima: product.quantidadeMinima,
        validade: product.validade,
        imagem_url: product.imagemUrl,
        ativo: product.ativo,
        criado_em: product.criadoEm,
        atualizado_em: product.atualizadoEm,
        disponibilidade_status: availabilityStatus,
        status_disponibilidade: availabilityStatus
    };
}

module.exports = {
    buildProductPayload,
    formatProductResponse
};
